'use strict';
const { contextBridge, ipcRenderer } = require('electron');

// Única ponte entre a interface e o sistema. A interface roda isolada (sandbox,
// contextIsolation) e só enxerga estas funções.
const on = (channel, cb) => ipcRenderer.on(channel, (_event, payload) => cb(payload));

contextBridge.exposeInMainWorld('studio', {
  platform: process.platform,
  getVersion: () => ipcRenderer.invoke('app:version'),
  saveFile: opts => ipcRenderer.invoke('file:save', opts),
  readFile: p => ipcRenderer.invoke('file:read', p),
  convertToJpeg: (name, bytes) => ipcRenderer.invoke('image:convert', name, bytes),
  setWorkState: count => ipcRenderer.send('work:state', count),
  updateNow: () => ipcRenderer.invoke('update:run'),
  onUpdateAvailable: cb => on('update:available', cb),
  onUpdateProgress: cb => on('update:progress', cb),
  onMenu: cb => on('menu:action', cb),
  onOpenFiles: cb => on('files:open', cb),
  onFullscreen: cb => on('window:fullscreen', cb)
});
