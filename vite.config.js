import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/static/",
  server: {
    host: "localhost",
    port: 3000,
  },
  plugins: [vue()],
  // Make vite use our index.js entry and output to static/dist
  build: {
    rollupOptions: {
      input: {
        index: resolve("present_ideas/present_ideas/static/index.js"),
      },
      output: {
        chunkFileNames: undefined,
      },
    },
    outDir: resolve("./present_ideas/dist"),
    assetsDir: "",
    manifest: true,
  },
  resolve: { alias: { vue: "vue/dist/vue.esm-bundler.js" } },
});
