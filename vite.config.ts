import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  // plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "./",
  preview: {
    port: 3000,
  },
  json: {
    stringify: true
  },
  server: {
    hmr: {},
  },
  assetsInclude: ["**/*.JPG", "**/*.jpg"],
  optimizeDeps: {
    include: [
      "@fullcalendar/core",
      "@fullcalendar/react",
      "@fullcalendar/daygrid",
      "@fullcalendar/interaction",
    ],
  },
});
