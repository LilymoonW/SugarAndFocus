const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('minimize-window'),
  quitApp: () => ipcRenderer.send('quit-app'),
});
