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

function goToStateFunc(state) {
	return (item, focusedWindow) => {
		if(typeof mainWindow !== 'undefined' && mainWindow !== null) {
			mainWindow.loadURL("http://localhost:5000/#/" + state);
		}
	};
}

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 900,
        width: 1500,
        minWidth: 1500,
        minHeight: 900,
        show: false,
        backgroundColor: '#000000'
    });

    globalShortcut.register('CmdOrCtrl+Shift+D', ()=> {
        mainWindow.webContents.toggleDevTools();
    });

    mainWindow.on("closed", () => {
        mainWindow = null;
        console.log("Killing process from mainWindow.on('closed')");
        if(backendProcess !== null) {
            backendProcess.kill();
            backendProcess = null;
        }
    });
    
    appIcon = new Tray(iconPath);
    var contextMenu = Menu.buildFromTemplate([
    {
        label: 'Play',
        click: goToStateFunc('play')
    },
    {   
         label: 'Devices',
         click: goToStateFunc('devices')
    },
    // {
    //     label: 'Create System Report'
    // },
    {
        label: 'Store',
        click: goToStateFunc('store')
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
    {   label: 'Quit',
        accelerator : 'Command+Q',
        selector: 'terminate:'
    }
    ]);
    appIcon.setToolTip('OSVR Tray App');
    appIcon.setContextMenu(contextMenu);

    startBackend(function() {

        mainWindow.loadURL("http://localhost:5000");

        mainWindow.once('ready-to-show', () => {
            setTimeout(() => { mainWindow.show(); }, 2000);
            //mainWindow.show();
        });


    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    // leave menu-bar open on MacOS per convention
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // mac convention: clicking on the dock opens the window
    // if not already open.
    if(mainWindow === null) {
        createWindow();
    }
});
