const { contextBridge, ipcRenderer } = require('electron');

// Espone solo ipcRenderer per compatibilità con contextIsolation: false
window.ipcRenderer = ipcRenderer;

contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => {
        console.log('preload: sending minimize-window');
        ipcRenderer.send('minimize-window');
    },
    close: () => {
        console.log('preload: sending close-window');
        ipcRenderer.send('close-window');
    },
    minimizeToTray: () => {
        console.log('preload: sending minimize-to-tray');
        ipcRenderer.send('minimize-to-tray');
    },
    closeToTray: () => {
        console.log('preload: sending close-to-tray');
        ipcRenderer.send('close-to-tray');
    }
});