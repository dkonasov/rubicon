import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const config = defineConfig({
  root: "./src/client",
  build: {
    outDir: '../../dist/client',
  },
  plugins: [react()],
});

export default config;
