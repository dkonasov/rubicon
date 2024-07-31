import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const config = defineConfig({
  root: "./src/client",
  build: {
    outDir: '../../dist/client',
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    },
  }
});

export default config;
