import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc'
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // ❗ Para Vercel, NUNCA use base com nome de repositório
  // base: "/projetointegrador_2m/",

  css: {
    postcss: "./postcss.config.js",
  },

  server: {
    port: 5173,
    open: true,
  }
});
