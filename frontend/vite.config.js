import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path"; // ✅ Importação correta para ES Modules

export default defineConfig({
  base: "./", // necessário para funcionar com Electron (carregamento via file://)
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // porta do backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "src"), // ✅ resolve erro "path is not defined"
    },
  },
  build: {
    outDir: "dist",
  },
});
