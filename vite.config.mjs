import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    open: true, // optional: opens browser on dev start
    host: true,
  },
  optimizeDeps: {
    exclude: []
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});