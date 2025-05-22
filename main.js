import { app, BrowserWindow } from "electron";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Suporte a __dirname em ES Module
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

  // Caminho correto do index.html para build local ou empacotado
  const indexPath = path.join(__dirname, "frontend", "dist", "index.html");

  win.loadFile(indexPath).catch((err) =>
    console.error("Erro ao carregar index.html:", err)
  );

  // Descomente para debug
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  // Inicia o backend
  exec("node backend/server.js", (err, stdout, stderr) => {
    if (err) {
      console.error("Erro ao iniciar backend:", err);
    } else {
      console.log("Backend iniciado.");
    }
  });

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
