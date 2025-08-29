const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  runWorkflow: (data) => ipcRenderer.send('run-workflow', data)
});
