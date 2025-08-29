const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// ===== Réception des fichiers et du nom du post depuis le Renderer =====
ipcMain.on('run-workflow', (event, { files, postName }) => {
  console.log('Fichiers reçus :', files);
  console.log('Nom du post :', postName);

  // Ici tu peux appeler ton script Node.js en mode prod
  // Ex: node workflow.js <postName> <file1> <file2> ...
  const cmd = `node workflow.js "${postName}" ${files.map(f => `"${f}"`).join(' ')}`;
  exec(cmd, (error, stdout, stderr) => {
    if (error) console.error(error);
    console.log(stdout);
    console.error(stderr);
  });
});
