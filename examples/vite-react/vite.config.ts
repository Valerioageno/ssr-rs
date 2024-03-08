import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodeResolve } from "@rollup/plugin-node-resolve";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      //input: "./src/server-entry.tsx",
      output: {
        format: "iife",
        dir: "dist/",
      },
    },
  },
  ssr: {
    target: "webworker",
    noExternal: true,
  },
  plugins: [react()],
});
