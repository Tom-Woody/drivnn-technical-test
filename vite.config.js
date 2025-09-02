import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: resolve(__dirname, "src/setupTests.js"), // ✅ absolute path
    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],   // ensures tests are picked up
  },
});
