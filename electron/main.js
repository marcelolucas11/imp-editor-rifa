'use strict';
const { app, BrowserWindow, Menu, dialog, ipcMain, shell, session } = require('electron');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFile } = require('child_process');
const updater = require('./updater');

const isMac = process.platform === 'darwin';
const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'avif', 'heic', 'heif', 'tif', 'tiff'];
const SAVE_EXTS = new Set(['png', 'jpg', 'zip', 'json']);

app.setName('Editor Rifa');
app.setAboutPanelOptions({
  applicationName: 'Editor Rifa',
  applicationVersion: app.getVersion(),
  version: '',
  copyright: '© 2026 Impera Services',
  website: `https://github.com/${updater.REPO}`
});

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

let mainWindow = null;
let workCount = 0;          // fotos carregadas (para confirmar antes de fechar)
let forceClose = false;     // true durante atualização / saída confirmada
let updating = false;
const allowedReadPaths = new Set(); // só lê arquivos que o usuário escolheu no diálogo

// ---------------------------------------------------------------- janela

const stateFile = () => path.join(app.getPath('userData'), 'window-state.json');

function loadWindowState() {
  try {
    const s = JSON.parse(fs.readFileSync(stateFile(), 'utf8'));
    if (Number.isFinite(s.width) && Number.isFinite(s.height)) return s;
  } catch { /* primeira execução */ }
  return { width: 1520, height: 940 };
}

function saveWindowState(win) {
  if (win.isDestroyed() || win.isFullScreen() || win.isMinimized()) return;
  try {
    fs.writeFileSync(stateFile(), JSON.stringify(win.getNormalBounds()));
  } catch { /* não crítico */ }
}

function createWindow() {
  const st = loadWindowState();
  const win = new BrowserWindow({
    ...st,
    minWidth: 1200,
    minHeight: 720,
    show: false,
    title: 'Editor Rifa',
    backgroundColor: '#08090d',
    titleBarStyle: isMac ? 'hiddenInset' : 'default',
    trafficLightPosition: { x: 18, y: 26 },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false
    }
  });
  mainWindow = win;

  win.loadFile(path.join(__dirname, '..', 'src', 'index.html'));
  win.once('ready-to-show', () => win.show());

  // bloqueia navegação e janelas externas; links https do GitHub abrem no navegador
  win.webContents.on('will-navigate', e => e.preventDefault());
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (updater.isAllowedHost(url)) shell.openExternal(url);
    return { action: 'deny' };
  });

  win.on('enter-full-screen', () => win.webContents.send('window:fullscreen', true));
  win.on('leave-full-screen', () => win.webContents.send('window:fullscreen', false));

  let t = null;
  const debounced = () => { clearTimeout(t); t = setTimeout(() => saveWindowState(win), 400); };
  win.on('resize', debounced);
  win.on('move', debounced);

  // Confirma antes de perder fotos carregadas (as edições dos padrões ficam salvas)
  win.on('close', e => {
    saveWindowState(win);
    if (forceClose || workCount === 0) return;
    const choice = dialog.showMessageBoxSync(win, {
      type: 'warning',
      buttons: ['Cancelar', 'Fechar mesmo assim'],
      defaultId: 0,
      cancelId: 0,
      message: 'Fechar o Editor Rifa?',
      detail: `Há ${workCount} foto(s) carregada(s). Artes não exportadas serão perdidas.`
    });
    if (choice === 0) e.preventDefault();
  });

  win.on('closed', () => { mainWindow = null; workCount = 0; });
  return win;
}

// ---------------------------------------------------------------- menu

function openPhotosDialog() {
  const win = BrowserWindow.getFocusedWindow() || mainWindow;
  if (!win) return;
  const paths = dialog.showOpenDialogSync(win, {
    title: 'Adicionar fotos',
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Imagens', extensions: IMAGE_EXTS }]
  });
  if (!paths || !paths.length) return;
  paths.forEach(p => allowedReadPaths.add(p));
  win.webContents.send('files:open', paths.map(p => ({ path: p, name: path.basename(p) })));
}

const send = action => () => mainWindow && mainWindow.webContents.send('menu:action', action);

function buildMenu() {
  const template = [
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about', label: 'Sobre o Editor Rifa' },
        { type: 'separator' },
        { label: 'Verificar Atualizações…', click: () => runUpdateFlow() },
        { type: 'separator' },
        { role: 'services', label: 'Serviços' },
        { type: 'separator' },
        { role: 'hide', label: 'Ocultar Editor Rifa' },
        { role: 'hideOthers', label: 'Ocultar Outros' },
        { role: 'unhide', label: 'Mostrar Tudo' },
        { type: 'separator' },
        { role: 'quit', label: 'Encerrar Editor Rifa' }
      ]
    }] : []),
    {
      label: 'Arquivo',
      submenu: [
        { label: 'Adicionar Fotos…', accelerator: 'CmdOrCtrl+O', click: openPhotosDialog },
        { type: 'separator' },
        { label: 'Salvar Padrão do Cliente…', accelerator: 'CmdOrCtrl+S', click: send('save-setup') },
        { label: 'Backup de Padrões…', click: send('backup') },
        { type: 'separator' },
        { label: 'Baixar Foto Atual', accelerator: 'CmdOrCtrl+E', click: send('download-current') },
        { label: 'Exportar Tudo (ZIP)…', accelerator: 'Shift+CmdOrCtrl+E', click: send('export-all') },
        { type: 'separator' },
        { role: 'close', label: 'Fechar Janela' }
      ]
    },
    {
      label: 'Editar',
      submenu: [
        { role: 'undo', label: 'Desfazer' },
        { role: 'redo', label: 'Refazer' },
        { type: 'separator' },
        { role: 'cut', label: 'Recortar' },
        { role: 'copy', label: 'Copiar' },
        { role: 'paste', label: 'Colar' },
        { role: 'selectAll', label: 'Selecionar Tudo' }
      ]
    },
    {
      label: 'Visualizar',
      submenu: [
        { role: 'resetZoom', label: 'Tamanho Real' },
        { role: 'zoomIn', label: 'Aumentar' },
        { role: 'zoomOut', label: 'Diminuir' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Tela Cheia' }
      ]
    },
    {
      label: 'Janela',
      role: 'windowMenu',
      submenu: [
        { role: 'minimize', label: 'Minimizar' },
        { role: 'zoom', label: 'Ampliar' },
        ...(isMac ? [{ type: 'separator' }, { role: 'front', label: 'Trazer Tudo para a Frente' }] : [])
      ]
    },
    {
      label: 'Ajuda',
      role: 'help',
      submenu: [
        ...(!isMac ? [{ label: 'Verificar Atualizações…', click: () => runUpdateFlow() }, { type: 'separator' }] : []),
        { label: 'Repositório no GitHub', click: () => shell.openExternal(`https://github.com/${updater.REPO}`) },
        { label: 'Baixar Última Versão', click: () => shell.openExternal(updater.RELEASES_PAGE) },
        { label: 'Relatar um Problema', click: () => shell.openExternal(`https://github.com/${updater.REPO}/issues/new`) }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// ---------------------------------------------------------------- atualização

function notifyProgress(payload) {
  if (mainWindow) mainWindow.webContents.send('update:progress', payload);
}

async function silentUpdateCheck() {
  try {
    const info = await updater.fetchLatest(app.getVersion());
    if (info && updater.isNewer(info.version, app.getVersion()) && mainWindow) {
      mainWindow.webContents.send('update:available', { version: info.version });
    }
  } catch { /* sem internet: ignora em silêncio */ }
}

async function runUpdateFlow() {
  if (updating) return;
  updating = true;
  const win = mainWindow || undefined;
  const current = app.getVersion();
  try {
    const info = await updater.fetchLatest(current);
    if (!info || !updater.isNewer(info.version, current)) {
      await dialog.showMessageBox(win, {
        type: 'info',
        message: 'Você já está na versão mais recente.',
        detail: `Editor Rifa v${current}`,
        buttons: ['OK']
      });
      return;
    }

    const notes = info.notes ? `\n\n${info.notes.slice(0, 700)}` : '';
    const { response } = await dialog.showMessageBox(win, {
      type: 'question',
      message: `Nova versão disponível: v${info.version}`,
      detail: `Você está na v${current}.${notes}`,
      buttons: ['Atualizar agora', 'Depois'],
      defaultId: 0,
      cancelId: 1
    });
    if (response !== 0) return;

    if (!app.isPackaged) {
      await dialog.showMessageBox(win, {
        type: 'info',
        message: 'Modo de desenvolvimento',
        detail: 'A atualização automática só funciona no app instalado (.app).'
      });
      return;
    }

    const appPath = path.resolve(process.execPath, '..', '..', '..');
    await updater.installUpdate({
      info,
      currentVersion: current,
      appPath,
      onProgress: notifyProgress,
      quit: () => { forceClose = true; app.quit(); }
    });
  } catch (err) {
    notifyProgress({ phase: 'error' });
    const { response } = await dialog.showMessageBox(win, {
      type: 'error',
      message: 'Não foi possível atualizar',
      detail: String(err.message || err),
      buttons: ['Abrir página de download', 'Fechar'],
      defaultId: 0,
      cancelId: 1
    });
    if (response === 0) shell.openExternal(updater.RELEASES_PAGE);
  } finally {
    updating = false;
  }
}

// ---------------------------------------------------------------- IPC

function registerIpc() {
  ipcMain.handle('app:version', () => app.getVersion());
  ipcMain.handle('update:run', () => runUpdateFlow());
  ipcMain.on('work:state', (_e, count) => { workCount = Number.isFinite(count) ? Math.max(0, count | 0) : 0; });

  ipcMain.handle('file:save', async (e, opts) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    const name = path.basename(String(opts && opts.defaultName || 'arquivo'));
    const ext = path.extname(name).slice(1).toLowerCase();
    if (!SAVE_EXTS.has(ext)) throw new Error('Tipo de arquivo não permitido.');
    if (!(opts.data instanceof Uint8Array)) throw new Error('Dados inválidos.');

    const { canceled, filePath } = await dialog.showSaveDialog(win, {
      defaultPath: path.join(app.getPath('downloads'), name),
      filters: [{ name: ext.toUpperCase(), extensions: [ext] }],
      properties: ['createDirectory', 'showOverwriteConfirmation']
    });
    if (canceled || !filePath) return { saved: false };
    await fs.promises.writeFile(filePath, Buffer.from(opts.data));
    return { saved: true, path: filePath };
  });

  ipcMain.handle('file:read', async (_e, p) => {
    if (typeof p !== 'string' || !allowedReadPaths.has(p)) throw new Error('Arquivo não autorizado.');
    const stat = await fs.promises.stat(p);
    if (stat.size > 300 * 1024 * 1024) throw new Error('Arquivo grande demais.');
    return fs.promises.readFile(p);
  });

  // HEIC/HEIF/TIFF -> JPEG usando o 'sips' nativo do macOS
  ipcMain.handle('image:convert', async (_e, name, bytes) => {
    if (!isMac) throw new Error('Conversão disponível apenas no macOS.');
    if (!(bytes instanceof Uint8Array) || bytes.length > 300 * 1024 * 1024) throw new Error('Dados inválidos.');
    const ext = path.extname(String(name)).slice(1).toLowerCase();
    if (!['heic', 'heif', 'tif', 'tiff'].includes(ext)) throw new Error('Formato não suportado.');
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'editor-rifa-img-'));
    const input = path.join(dir, `in.${ext}`);
    const output = path.join(dir, 'out.jpg');
    try {
      fs.writeFileSync(input, Buffer.from(bytes));
      await new Promise((resolve, reject) =>
        execFile('/usr/bin/sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '95', input, '--out', output], err => (err ? reject(err) : resolve()))
      );
      return fs.readFileSync(output);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
}

// ---------------------------------------------------------------- ciclo de vida

app.on('second-instance', () => {
  if (!mainWindow) return;
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.focus();
});

app.whenReady().then(() => {
  // sem permissões de câmera/mic/geolocalização etc.
  session.defaultSession.setPermissionRequestHandler((_wc, _perm, cb) => cb(false));

  registerIpc();
  buildMenu();
  createWindow();

  setTimeout(silentUpdateCheck, 4000);
  setInterval(silentUpdateCheck, 6 * 60 * 60 * 1000);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// No macOS o app continua no Dock após fechar a janela (padrão da plataforma)
app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});

app.on('before-quit', () => {
  // Cmd+Q: a confirmação de fotos não exportadas acontece no evento 'close' da janela
});
