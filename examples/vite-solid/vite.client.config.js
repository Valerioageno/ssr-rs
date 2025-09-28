import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  base: "/client/",
  plugins: [
    solid({
      solid: { hydratable: true },
    }),
  ],
  build: {
    outDir: "dist/client",
    emptyOutDir: true,
    rollupOptions: {
      input: "./src/main.tsx",
      output: {
        format: "esm",
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
