import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

const polyfillPlugin = () => ({
  name: "v8-polyfill",
  generateBundle(options, bundle) {
    // 1. setTimeout - does not exist in V8 and solid-js on ssr.
    for (const fileName in bundle) {
      const chunk = bundle[fileName];
      if (chunk.type === "chunk" && chunk.isEntry) {
        chunk.code = `
if (typeof setTimeout === 'undefined') {
    globalThis.setTimeout = function(callback, delay) {
        if (typeof callback === 'function') {
            callback();
        }
        return 1;
    };
    globalThis.clearTimeout = function(id) {};
}

${chunk.code}`;
      }
    }
  },
});

export default defineConfig({
  base: "/client/",
  plugins: [
    solid({
      ssr: true,
      typescript: {
        onlyRemoveTypeImports: true,
      },
      solid: {
        hydratable: true,
      },
    }),
    polyfillPlugin(),
  ],
  build: {
    ssr: true,
    outDir: "dist/server",
    emptyOutDir: true,
    rollupOptions: {
      input: "./src/server-entry.tsx",
      output: {
        format: "iife",
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
      },
    },
  },
  ssr: {
    noExternal: true,
  },
});
