const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile('index.html');
  Menu.setApplicationMenu(null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


ipcMain.on('open-auth-window', () => {
  createWindow();
})

// Создание нового окна при получении сообщения от рендерера
ipcMain.on('open-register-window', () => {
  const registerWindow = new BrowserWindow({
    width: 400,
    height: 300,
    modal: true, // Делаем новое окно модальным
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  registerWindow.loadFile(path.join(__dirname, 'interface', 'register.html'));
});

ipcMain.on('open-account-window', () => {
  const accountWindow = new BrowserWindow({
    width: 900,
    height: 600,
    modal: false, // Делаем новое окно модальным
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  accountWindow.loadFile(path.join(__dirname, 'interface', 'account.html'));
});

ipcMain.on('open-edit-window', () => {
  const editWindow = new BrowserWindow({
    width: 600,
    height: 500,
    modal: true, // Делаем новое окно модальным
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  editWindow.loadFile(path.join(__dirname, 'interface', 'changeApplication.html'));
});



