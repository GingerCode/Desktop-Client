'use strict';
const electron = require('electron'),
      path = require('path');

const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
    mainWindow = null;
}

function createMainWindow() {
    /* --- MENU?? ---*/
    require('./main_menu')
    const win = new electron.BrowserWindow({
        width: 1000,
        height: 800,
        icon: path.join(__dirname, "app/img/app_logo.png")
    });

    win.loadURL(`file://${__dirname}/app/new-tabs.html`);
    win.on('closed', onClosed);

    return win;
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!mainWindow) {
        mainWindow = createMainWindow();
    }
});

app.on('ready', () => {
    mainWindow = createMainWindow();
});
