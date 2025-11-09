import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js", // ✅ Garante que o Vite use o PostCSS correto
  },
  server: {
    port: 5173,
    open: true, // ✅ Abre o navegador automaticamente ao rodar npm run dev
  },
});
