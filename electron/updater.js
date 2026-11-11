'use strict';
/**
 * Atualizador via GitHub Releases (sem servidor próprio).
 *
 * Fluxo: consulta /releases/latest -> compara versões -> baixa o .zip do app
 * -> confere SHA-256 (SHA256SUMS.txt do release) -> extrai -> valida bundle id,
 * versão e assinatura -> troca o .app por um script auxiliar e reabre o app.
 *
 * Por que não electron-updater? Ele exige app assinado com Apple Developer ID
 * (Squirrel.Mac). Como o app é assinado ad-hoc, a troca do bundle é feita aqui.
 * O download é feito pelo próprio app (sem quarentena), então o Gatekeeper não
 * volta a perguntar a cada atualização.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { execFile, spawn } = require('child_process');

const REPO = 'marcelolucas11/imp-editor-rifa';
const API_LATEST = `https://api.github.com/repos/${REPO}/releases/latest`;
const RELEASES_PAGE = `https://github.com/${REPO}/releases/latest`;
const ZIP_ASSET = 'Editor-Rifa-mac.zip';
const SUMS_ASSET = 'SHA256SUMS.txt';
const BUNDLE_ID = 'br.com.impera.editorrifa';

// ---------- utilidades puras (testáveis sem Electron) ----------

function parseVersion(v) {
  const m = /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+.*)?$/.exec(String(v).trim());
  if (!m) return null;
  return { major: +m[1], minor: +m[2], patch: +m[3], pre: m[4] || '' };
}

/** -1 se a<b, 0 se iguais, 1 se a>b. Pré-lançamento (1.0.0-beta) < release (1.0.0). */
function compareVersions(a, b) {
  const pa = parseVersion(a);
  const pb = parseVersion(b);
  if (!pa || !pb) throw new Error(`Versão inválida: ${!pa ? a : b}`);
  for (const k of ['major', 'minor', 'patch']) {
    if (pa[k] !== pb[k]) return pa[k] < pb[k] ? -1 : 1;
  }
  if (pa.pre === pb.pre) return 0;
  if (!pa.pre) return 1;
  if (!pb.pre) return -1;
  return pa.pre < pb.pre ? -1 : 1;
}

function isNewer(latest, current) {
  return compareVersions(latest, current) > 0;
}

function parseChecksums(text) {
  const map = {};
  for (const line of String(text).split(/\r?\n/)) {
    const m = /^([0-9a-fA-F]{64})\s+\*?(.+?)\s*$/.exec(line);
    if (m) map[m[2]] = m[1].toLowerCase();
  }
  return map;
}

function isAllowedHost(urlStr) {
  let u;
  try { u = new URL(urlStr); } catch { return false; }
  if (u.protocol !== 'https:') return false;
  return u.hostname === 'github.com' || u.hostname === 'api.github.com' || u.hostname.endsWith('.githubusercontent.com');
}

function summarizeRelease(json) {
  const version = String(json.tag_name || '').replace(/^v/, '');
  if (!parseVersion(version)) throw new Error(`Tag de release inválida: ${json.tag_name}`);
  const assets = Array.isArray(json.assets) ? json.assets : [];
  return {
    version,
    notes: String(json.body || '').trim(),
    url: json.html_url || RELEASES_PAGE,
    zip: assets.find(a => a.name === ZIP_ASSET) || null,
    sums: assets.find(a => a.name === SUMS_ASSET) || null
  };
}

// ---------- rede / instalação (precisam do Electron) ----------

function headers(currentVersion) {
  return {
    Accept: 'application/vnd.github+json',
    'User-Agent': `EditorRifa/${currentVersion}`,
    'X-GitHub-Api-Version': '2022-11-28'
  };
}

async function fetchLatest(currentVersion) {
  const { net } = require('electron');
  const res = await net.fetch(API_LATEST, { headers: headers(currentVersion) });
  if (res.status === 404) return null; // ainda não há release publicado
  if (!res.ok) throw new Error(`O GitHub respondeu ${res.status}.`);
  return summarizeRelease(await res.json());
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, { maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) reject(new Error(`${path.basename(cmd)} falhou: ${(stderr || err.message).trim()}`));
      else resolve(stdout.trim());
    });
  });
}

async function download(url, dest, expectedSize, currentVersion, onProgress) {
  const { net } = require('electron');
  if (!isAllowedHost(url)) throw new Error('URL de download não permitida.');
  const res = await net.fetch(url, { headers: { ...headers(currentVersion), Accept: 'application/octet-stream' } });
  if (!res.ok || !res.body) throw new Error(`Download falhou (${res.status}).`);
  if (res.url && !isAllowedHost(res.url)) throw new Error('Download redirecionado para um host não permitido.');

  const total = Number(res.headers.get('content-length')) || expectedSize || 0;
  const hash = crypto.createHash('sha256');
  const out = fs.createWriteStream(dest);
  const reader = res.body.getReader();
  let got = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      hash.update(value);
      got += value.length;
      if (!out.write(value)) await new Promise(r => out.once('drain', r));
      if (total) onProgress(Math.min(1, got / total));
    }
  } finally {
    await new Promise(r => out.end(r));
  }
  return hash.digest('hex');
}

async function readPlistValue(plist, key) {
  return run('/usr/libexec/PlistBuddy', ['-c', `Print :${key}`, plist]);
}

/** Baixa, valida e instala. `onProgress({phase, percent})`; `quit()` fecha o app. */
async function installUpdate({ info, currentVersion, appPath, onProgress, quit }) {
  if (!info.zip) throw new Error(`O release v${info.version} não tem o arquivo ${ZIP_ASSET}.`);

  const appDir = path.dirname(appPath);
  try {
    fs.accessSync(appDir, fs.constants.W_OK);
  } catch {
    const err = new Error(`Sem permissão para gravar em "${appDir}". Baixe a versão nova manualmente.`);
    err.manual = true;
    throw err;
  }

  const work = fs.mkdtempSync(path.join(os.tmpdir(), 'editor-rifa-update-'));
  const zipPath = path.join(work, ZIP_ASSET);
  const stage = path.join(appDir, '.editor-rifa-update'); // mesmo volume do app => troca atômica
  fs.rmSync(stage, { recursive: true, force: true });
  fs.mkdirSync(stage, { recursive: true });

  try {
    onProgress({ phase: 'download', percent: 0 });
    const sha = await download(info.zip.browser_download_url, zipPath, info.zip.size, currentVersion, p =>
      onProgress({ phase: 'download', percent: p })
    );

    if (info.sums) {
      const res = await require('electron').net.fetch(info.sums.browser_download_url, { headers: headers(currentVersion) });
      const expected = parseChecksums(await res.text())[ZIP_ASSET];
      if (!expected) throw new Error('SHA256SUMS.txt não lista o arquivo do app.');
      if (expected !== sha) throw new Error('Verificação de integridade falhou (SHA-256 diferente). Download descartado.');
    }

    onProgress({ phase: 'install', percent: 1 });
    await run('/usr/bin/ditto', ['-x', '-k', zipPath, stage]);
    const appName = fs.readdirSync(stage).find(n => n.endsWith('.app'));
    if (!appName) throw new Error('O pacote baixado não contém um .app.');
    const newApp = path.join(stage, appName);

    const plist = path.join(newApp, 'Contents', 'Info.plist');
    if ((await readPlistValue(plist, 'CFBundleIdentifier')) !== BUNDLE_ID) throw new Error('Pacote com identificador inesperado.');
    if ((await readPlistValue(plist, 'CFBundleShortVersionString')) !== info.version) throw new Error('Versão do pacote não confere com o release.');
    await run('/usr/bin/codesign', ['--verify', '--deep', '--strict', newApp]);

    // script auxiliar: espera o app fechar, troca o bundle (com rollback) e reabre
    const script = path.join(work, 'swap.sh');
    fs.writeFileSync(
      script,
      [
        '#!/bin/bash',
        'PID="$1"; NEW="$2"; OLD="$3"; STAGE="$4"; WORK="$5"',
        'for i in $(seq 1 100); do kill -0 "$PID" 2>/dev/null || break; sleep 0.3; done',
        'BACKUP="${OLD}.previous"',
        'rm -rf "$BACKUP"',
        'if mv "$OLD" "$BACKUP"; then',
        '  if mv "$NEW" "$OLD"; then',
        '    xattr -cr "$OLD" 2>/dev/null',
        '    rm -rf "$BACKUP"',
        '  else',
        '    mv "$BACKUP" "$OLD"',
        '  fi',
        'fi',
        'rm -rf "$STAGE" "$WORK"',
        'open "$OLD"',
        ''
      ].join('\n'),
      { mode: 0o755 }
    );
    spawn('/bin/bash', [script, String(process.pid), newApp, appPath, stage, work], { detached: true, stdio: 'ignore' }).unref();
    quit();
  } catch (err) {
    fs.rmSync(stage, { recursive: true, force: true });
    fs.rmSync(work, { recursive: true, force: true });
    throw err;
  }
}

module.exports = {
  REPO, RELEASES_PAGE, ZIP_ASSET, SUMS_ASSET, BUNDLE_ID,
  parseVersion, compareVersions, isNewer, parseChecksums, isAllowedHost, summarizeRelease,
  fetchLatest, installUpdate
};
