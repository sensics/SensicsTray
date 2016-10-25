const { app, BrowserWindow, globalShortcut } = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 800,
        fullscreenable: true,
    });

    win.loadURL(`file://${__dirname}/index.html`);

    globalShortcut.register('CmdOrCtrl+Shift+D', ()=> {
        win.webContents.toggleDevTools();
    });

    win.on('closed', () => {
        win = null;
    });
}
app.on('ready', createWindow);

app.on('window-all-closed', () => {
    globalShortcut.unregisterAll();
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
