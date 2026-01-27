import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // ✅ correct
    port: 5173,
  },
  preview: {
    host: true, // ✅ safe for preview as well
    port: 4173,
  },
});
