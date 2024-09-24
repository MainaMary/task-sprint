import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

//VitePWA - include the PWA plugin and configure it

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Kanban App",
        short_name: "Kanban",
        description: "A Kanaban App  bootstrapped using Vite",
        theme_color: "#1A76D2",
        icons: [
          {
            src: "/favicon-16x16.png", //icon paths
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
