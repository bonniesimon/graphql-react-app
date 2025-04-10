import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Allows using Jest's globals (describe, test, expect) without importing them
    environment: "jsdom",
    setupFiles: "./src/setupTests.js", // Point to your setup file
  },
});
