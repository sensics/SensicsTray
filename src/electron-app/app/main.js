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
        height: 800,
        width: 1280
    });

    mainWindow.loadURL(url.format({
    	pathname: path.join(__dirname, 'index.html'),
    	protocol: 'file:',
    	slashes: true
    }));

    startBackend(function() {

        mainWindow.loadURL("http://localhost:5000");

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
        	label: 'Devices',
        	click: goToStateFunc('devices')
        },
        {
            label: 'Create System Report'
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
            submenu: [
            { label: 'Open Support Ticket' },
            { label: 'OSVR Documentation' },
            { label: 'About OSVR'}
            ]
        },
        {   label: 'Quit',
            accelerator : 'Command+Q',
            selector: 'terminate:'
        }
        ]);
        appIcon.setToolTip('OSVR Tray App');
        appIcon.setContextMenu(contextMenu);
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
