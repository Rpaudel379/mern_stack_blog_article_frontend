import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@states": path.resolve(__dirname, './src/states'),
      "@hooks": path.resolve(__dirname, './src/hooks'),
      "@api": path.resolve(__dirname, './src/api'),
      "@utilities": path.resolve(__dirname, './src/utilities'),
    },
  },
});
