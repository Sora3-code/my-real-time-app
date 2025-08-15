//---------------------------------------------------------------------------

let {app, BrowserWindow, Menu} = require('electron');
let path = require('path');
//---------------------------------------------------------------------------

let createWindow = () => {
    let mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });
    mainWindow.loadFile(path.join(__dirname, 'public/index.html'));
    Menu.setApplicationMenu(null);
    mainWindow.webContents.openDevTools();
};
//-----------------------------------------------------------------------------

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
//-----------------------------------------------------------------------------

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});
//-----------------------------------------------------------------------------