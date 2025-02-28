const { app, BrowserWindow, Menu, globalShortcut, shell } = require("electron");
const greenworks = require("./greenworks");

if (greenworks.init()) {
  console.log("Steam API has been initialized.");
} else {
  console.log("Steam API has failed to initialize.");
}

const debug = false;

function createWindow() {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      devTools: debug,
    },
  });

  win.removeMenu();
  win.maximize();
  win.loadFile("index.html");
  win.show();
  if (debug) win.webContents.openDevTools();
  globalShortcut.register("f5", function () {
    win.loadFile("index.html");
  });
  globalShortcut.register("f8", function () {
    win.loadFile("index.html", { query: { noScripts: "true" } });
  });

  win.webContents.on("new-window", function (e, url) {
    // make sure local urls stay in electron perimeter
    if (url.substr(0, "file://".length) === "file://") {
      return;
    }

    // and open every other protocols on the browser
    e.preventDefault();
    shell.openExternal(url);
  });

  // Create the Application's main menu
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: "Edit",
        submenu: [
          { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
          { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
          { type: "separator" },
          { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
          { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
          { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
          { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" },
        ],
      },
    ]),
  );

  // This is backward but the game fills in an array called `document.achievements` and we retrieve it from
  // here. Hey if it works it works.
  const achievements = greenworks.getAchievementNames();
  // for (const ach of achievements) {
  //   greenworks.clearAchievement(ach, () => undefined);
  // }
  setInterval(async () => {
    const achs = await win.webContents.executeJavaScript("document.achievements");
    for (const ach of achs) {
      if (!achievements.includes(ach)) continue;
      greenworks.activateAchievement(ach, () => undefined);
    }
  }, 1000);
}

app.whenReady().then(() => {
  createWindow();
});
