// electron/main.js
const { app, BrowserWindow } = require("electron");

const apiUrl = "http://host.docker.internal:3000";

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
    },
  });

  // Pour le dev, charge le serveur React Vite :
  win.loadURL("http://localhost:5173");

  // Pour la version build :
  // win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
