const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    movable: true,
    icon: path.join(__dirname, 'assets', 'water.png'),
    title: 'H2O Companion',
    width: 500,
    height: 800,
    resizable: false,
    alwaysOnTop: true,
    frame: false, // assicurati che sia false
    transparent: true,
    titleBarStyle: 'hiddenInset', // usa hiddenInset per evitare glitch
    hasShadow: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
  win.setMenuBarVisibility(false);

  ipcMain.on('minimize-window', () => {
    if (win) win.minimize();
  });
  ipcMain.on('close-window', () => {
    if (win) win.close();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
