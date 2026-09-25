import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  assetsInclude: ["**/*.JPG", "**/*.JPEG", "**/*.PNG"],
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8787",
        changeOrigin: false,
        credentials: "include",
      },
    },
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()].filter(Boolean),
  build: {
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
