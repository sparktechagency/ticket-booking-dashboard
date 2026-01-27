import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // host: "0.0.0.0",
    // host: "72.62.190.141",
    host: "http://api.adrienticket.com",
    port: 5173,
  },
});
