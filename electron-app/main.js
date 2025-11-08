const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // In development, load from dev server
  // In production, load from built files
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    mainWindow.loadURL('http://localhost:7200');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, files are in extraResources/web directory
    const htmlPath = process.resourcesPath
      ? path.join(process.resourcesPath, 'web/index.html')
      : path.join(__dirname, '../dist/apps/web/index.html');

    console.log('Loading file from:', htmlPath);

    // Use loadURL with file:// protocol to ensure correct base path
    mainWindow.loadURL(`file://${htmlPath}`);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
