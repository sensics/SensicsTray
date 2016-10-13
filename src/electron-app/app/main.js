"use strict";

const {app, BrowserWindow} = require("electron");
const {spawn} = require("child_process");

var mainWindow = null;
var backendProcess = null;

function startBackend(next) {
    if(backendProcess == null) {
        backendProcess = spawn('ConfigUtil.exe', {
            "cwd": "resources/app/bin",
        });
        backendProcess.stdout.on('data', function(data) {
            console.log("stdout: " + data);
        });
        backendProcess.stderr.on("data", function(data) {
            console.log("stdout: " + data);
        });
        backendProcess.on("close", function(code) {
            console.log("Closing code: " + code);
        })
        setTimeout(next, 2000);
    } else {
        next();
    }
}

function createWindow() {

    startBackend(function() {
        mainWindow = new BrowserWindow({
            height: 600,
            width: 800
        });

        mainWindow.loadURL("http://localhost:5000");

        // this opens the dev tools when the window opens.
        // @todo: can we figure something out where we can open them after
        // the app starts, if we need to?
        //mainWindow.webContents.openDevTools();

        mainWindow.on("closed", () => {
            mainWindow = null;
            console.log("Killing process from mainWindow.on('closed')");
            if(backendProcess !== null) {
                backendProcess.kill();
                backendProcess = null;
            }
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
