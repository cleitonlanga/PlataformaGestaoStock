import { app, BrowserWindow } from "electron";
import { fork } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile(path.join(__dirname, "frontend", "dist", "index.html"));

  // Retire o comentario para verificar bugs
  //win.webContents.openDevTools();
}

app.whenReady().then(() => {
  // Iniciar o backend
  const backendPath = path.join(__dirname, "backend", "server.js");
  const backend = fork(backendPath, {
    env: {
      MONGO_URI:
        "mongodb+srv://cleytonlanga:8wB4saI4FNiQTrfH@db.uhsy4dz.mongodb.net/?retryWrites=true&w=majority&appName=db", // ou use config.js
      PORT: "5000",
    },
  });

  backend.on('error', (err) => {
    console.error('Backend process error:', err);
  });
  backend.on('exit', (code) => console.log(`Backend process exited with code ${code}`));

  createWindow();
});
