"use strict";

const {app, globalShortcut, Tray, Menu, BrowserWindow} = require("electron");
const {spawn} = require("child_process");
const path = require('path');
const url = require('url');

const iconPath = path.join(__dirname, 'icon.ico');
let appIcon = null;

var mainWindow = null;
var backendProcess = null;

function startBackend(next) {
	var nextCalled = false;
    if(backendProcess == null) {
        backendProcess = spawn('SensicsTray.exe', {
            "cwd": "resources/app/bin",
        });
        backendProcess.stdout.on('data', function(data) {
        	console.log("stdout: " + data);
        	if(!nextCalled) {
        		nextCalled = true;
        		next();
        	}
        });
        backendProcess.stderr.on("data", function(data) {
            console.log("stdout: " + data);
        });
        backendProcess.on("close", function(code) {
            console.log("Closing code: " + code);
        })
        //setTimeout(next, 5000);
    } else {
        next();
    }
}

function mainWindowIsOpen() {
    return typeof mainWindow !== 'undefined' && mainWindow !== null;
}

function loadURLAndShow(url) {
    if (mainWindowIsOpen()) {
        mainWindow.loadURL(url);

        mainWindow.once('ready-to-show', () => {
            setTimeout(() => { mainWindow.show(); }, 2000);
            //mainWindow.show();
        });
    }
}

function goToStateFunc(state) {
    return (item, focusedWindow) => {
        var windowAlreadyOpen = mainWindowIsOpen();
        var url = "http://localhost:5000/#/" + state;
        // if the window isn't already open, create the window, load the url,
        // and wait for it to be ready before showing it.
        if (!windowAlreadyOpen) {
            createWindow();
            loadURLAndShow(url);
        } else {
            // the window was already open, so just load the url.
            mainWindow.loadURL(url);
        }
	};
}

function createWindow() {
    if (!mainWindowIsOpen()) {
        mainWindow = new BrowserWindow({
            height: 900,
            width: 1500,
            minWidth: 1500,
            minHeight: 900,
            show: false,
            backgroundColor: '#000000'
        });

        mainWindow.on("closed", () => {
            mainWindow = null;
            //console.log("Killing process from mainWindow.on('closed')");
            //if (backendProcess !== null) {
            //    backendProcess.kill();
            //    backendProcess = null;
            //}
        });
    }
}

function initializeApplication() {
    createWindow();

    globalShortcut.register('CmdOrCtrl+Shift+D', () => {
        if (mainWIndowIsOpen()) {
            mainWindow.webContents.toggleDevTools();        
        }
    });

    appIcon = new Tray(iconPath);
    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Play',
            click: goToStateFunc('play')
        },
        {
            label: 'Store',
            click: goToStateFunc('store')
        },
        {
            label: 'Devices',
            click: goToStateFunc('devices')
        },
        {
            label: 'Plugins',
            click: goToStateFunc('plugins')
        },
        {
            label: 'Settings',
            click: goToStateFunc('settings')
        },
        {
            label: 'Help',
            click: goToStateFunc('help')
            //submenu: [
            //{ label: 'Open Support Ticket' },
            //{ label: 'OSVR Documentation' },
            //{ label: 'About OSVR'}
            //]
        },
        // {
        //     label: 'Create System Report'
        // },
        {
            label: 'Quit',
            accelerator: 'Command+Q',
            selector: 'terminate:',
            click: () => {
                if (backendProcess !== null) {
                    backendProcess.kill();
                    backendProcess = null;
                }
                app.quit();
            }
        }
    ]);
    appIcon.setToolTip('OSVR Tray App');
    appIcon.setContextMenu(contextMenu);

    startBackend(function () {
        loadURLAndShow("http://localhost:5000");
    });
}

app.on("ready", initializeApplication);

//app.on("window-all-closed", () => {
//    // leave menu-bar open on MacOS per convention
//    if (process.platform !== "darwin") {
//        app.quit();
//    }
//});

app.on("activate", () => {
    // mac convention: clicking on the dock opens the window
    // if not already open.
    if (!mainWindowIsOpen()) {
        createWindow();
    }
});
