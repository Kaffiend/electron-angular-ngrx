import { app, BrowserWindow, ipcMain } from 'electron';
import './dev-extensions';
import * as path from 'path';
import rxIpc from 'rx-ipc-electron/lib/main';
import { SEEDS } from './data';
import { Observable } from 'rxjs/Observable';

let applicationRef: Electron.BrowserWindow = null;

const debugMode = true;
const isDev = process.env.NODE_ENV !== 'production';

const mainWindowSettings: Electron.BrowserWindowConstructorOptions = {
  width: 800,
  height: 650,
  frame: true
};

function createWindow() {
  // TODO: account for packaging builds or reuse 'build'.
  const url =
    isDev && process.env.LAUNCH_MODE !== 'build' ? 'http://localhost:4200' : `file:///${__dirname}/../index.html`;
  console.log(`Main Window Proxy: ${url}`);
  applicationRef = new BrowserWindow(mainWindowSettings);
  applicationRef.loadURL(url);
  if (debugMode) {
    // Open the DevTools.
    applicationRef.webContents.openDevTools();
  }
  applicationRef.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    applicationRef = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (applicationRef === null) {
    createWindow();
  }
});

function sendSeeds() {
  return Observable.of(SEEDS);
}

rxIpc.registerListener('send-seeds', sendSeeds);
