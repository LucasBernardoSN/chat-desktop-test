const isDev = require('electron-is-dev');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const AutoLaunch = require('auto-launch');
const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItem,
  Tray,
} = require('electron');
const Store = require('electron-store');
const chokidar = require('chokidar');
const Badge = require('electron-windows-badge');

const userPreferences = new Store({
  schema: {
    opcoes: {
      type: 'object',
      properties: {
        atualizacaoAutomatica: { type: 'boolean' },
      },
    },
    url: {
      type: 'string',
    },
  },
  watch: true,
  defaults: {
    opcoes: {
      atualizacaoAutomatica: true,
    },
  },
});

chokidar.watch(userPreferences.path).on('change', () => {
  app.relaunch();
  app.exit();
});

const store = userPreferences.store;

const autoLauncher = new AutoLaunch({
  name: 'EroChat',
});

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 500,
    minHeight: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      spellcheck: true,
    },
  });

  const badgeOptions = {};
  new Badge(mainWindow, badgeOptions);

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  Menu.setApplicationMenu(null);

  // <--------- Tray --------->
  app.whenReady().then(() => {
    const tray = new Tray(path.join(__dirname, 'tray-icon.ico'));
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Abrir EroChat',
        click: function () {
          mainWindow.show();
        },
      },
      {
        label: 'Opções de EroChat',
        click() {
          return userPreferences.openInEditor();
        },
      },
      {
        label: 'Fechar',
        click: function () {
          mainWindow.destroy();
          app.quit();
        },
      },
    ]);

    tray.setToolTip('EroChat');
    tray.setContextMenu(contextMenu);
    tray.on('click', () => {
      mainWindow.show();
    });
  });

  mainWindow.on('close', function (event) {
    event.preventDefault();
    mainWindow.hide();
  });
  // <--------- Tray --------->

  // <--------- SpellCheck --------->
  mainWindow.webContents.on('context-menu', (event, params) => {
    const menu = new Menu();

    for (const suggestion of params.dictionarySuggestions) {
      menu.append(
        new MenuItem({
          label: suggestion,
          click: () => mainWindow.webContents.replaceMisspelling(suggestion),
        })
      );
    }

    if (params.misspelledWord) {
      menu.append(
        new MenuItem({
          label: 'Adicionar ao dicionário',
          click: () =>
            mainWindow.webContents.session.addWordToSpellCheckerDictionary(
              params.misspelledWord
            ),
        })
      );
    }

    menu.popup();
  });
  // <--------- SpellCheck --------->

  // <--------- Update --------->

  if (store.opcoes.atualizacaoAutomatica) {
    if (!isDev) {
      autoUpdater
        .checkForUpdates()
        .then(() => {
          BrowserWindow.getAllWindows()[0].webContents.send(
            'update-available',
            {
              message: 'Checa o update quando a aplicativo inicia ✅',
            }
          );
        })
        .catch(() => {
          BrowserWindow.getAllWindows()[0].webContents.send(
            'update-available-error',
            { message: 'Checa o update quando a aplicativo inicia ❌' }
          );
        });
    }
  }

  autoUpdater.on('update-downloaded', (event) => {
    BrowserWindow.getAllWindows()[0].webContents.send('update-available', {
      message: 'A atualização está pronta para ser instalada 🎉',
      updateDownloaded: event,
    });
    clearInterval(checkupdates);
    autoUpdater.quitAndInstall();
  });
  // <--------- Update --------->

  app.quit();
}

if (app.requestSingleInstanceLock() === false) {
  app.quit();
} else {
  autoLauncher
    .isEnabled()
    .then(function (isEnabled) {
      if (isEnabled) return;
      autoLauncher.enable();
    })
    .catch(function (err) {
      throw err;
    });

  app.on('second-instance', () => {
    if (BrowserWindow.getAllWindows().length > 0) {
      if (BrowserWindow.getAllWindows()[0].isMinimized()) {
        BrowserWindow.getAllWindows()[0].restore();
      }
      BrowserWindow.getAllWindows()[0].show();
      BrowserWindow.getAllWindows()[0].focus();
    }
  });

  app.on('ready', createWindow);

  app.on('before-quit', () => {
    BrowserWindow.getAllWindows()[0].webContents.send('before-quit');
  });

  app.on('second-instance', () => {});

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows()[0] === null) {
      createWindow();
    }
  });

  ipcMain.on('check-updates', () => {
    autoUpdater
      .checkForUpdatesAndNotify()
      .then(() => {
        BrowserWindow.getAllWindows()[0].webContents.send('update-available', {
          message: 'Tenta forçar o update ✅',
        });
      })
      .catch(() => {
        BrowserWindow.getAllWindows()[0].webContents.send(
          'update-available-error',
          {
            message: 'Tenta forçar o update ❌',
          }
        );
      });
  });

  ipcMain.on('newMessage', () => {
    BrowserWindow.getAllWindows()[0].once('focus', () =>
      BrowserWindow.getAllWindows()[0].flashFrame(false)
    );
    BrowserWindow.getAllWindows()[0].flashFrame(true);
    let windowIsVisible = BrowserWindow.getAllWindows()[0].isVisible();

    if (windowIsVisible === false) {
      BrowserWindow.getAllWindows()[0].minimize();
    }
  });

  if (!isDev) {
    autoUpdater.on('error', (error) => {
      BrowserWindow.getAllWindows()[0].webContents.send('update-error', {
        message: 'Update error ❌',
        error,
      });
    });
  }

  if (!isDev && store.opcoes.atualizacaoAutomatica) {
    var checkupdates = setInterval(async () => {
      autoUpdater
        .checkForUpdates()
        .then(() => {
          BrowserWindow.getAllWindows()[0].webContents.send(
            'update-available',
            { message: 'Checa nova atualização de tempos em tempos ✅' }
          );
        })
        .catch(() => {
          BrowserWindow.getAllWindows()[0].webContents.send(
            'update-available-error',
            {
              message: 'Checa nova atualização de tempos em tempos ❌',
            }
          );
        });
    }, 1800000); // 30 minutos
  }
}
