const { contextBridge } = require('electron');

// Expose APIs to the renderer process
contextBridge.exposeInMainWorld('electron', {
  doSomething: () => {
    console.log('Hello from the preload script!');
  },
});