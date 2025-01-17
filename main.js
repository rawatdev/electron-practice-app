const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("node:path")
const dotenv = require("dotenv")

dotenv.config()

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  })

  win.loadFile("index.html")

  console.log("Create Window Functon")
}

app.whenReady().then(() => {
  ipcMain.handle("ping", () => {
    return "pong"
  })

  createWindow()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

if (require("electron-squirrel-startup") === true) app.quit()
