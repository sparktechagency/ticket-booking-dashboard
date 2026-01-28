import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // ✅ allows access from local network
    port: 5173,
  },
  preview: {
    host: true, // ✅ safe for preview
    port: 4173,
    allowedHosts: ['dashboard.adrienticket.com', 'localhost'], // ✅ add trusted hosts
  },
});