import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import path, { resolve } from "path";
import { defineConfig } from "vite";
import envCompatible from "vite-plugin-env-compatible";
import { createHtmlPlugin } from "vite-plugin-html";
import { createVuePlugin } from "vite-plugin-vue2";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: "",
      },
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  plugins: [
    createVuePlugin({ jsx: true }),
    viteCommonjs(),
    envCompatible(),
    createHtmlPlugin({
      inject: {
        data: {
          title: "my-webpack-project",
        },
      },
    }),
  ],
  // Make vite use our index.js entry and output to static/dist
  build: {
    rollupOptions: {
      input: resolve(__dirname, "present_ideas/present_ideas/static/index"),
      output: {
        entryFileNames: "index.dev.js",
      },
    },
    outDir: resolve(__dirname, "present_ideas/present_ideas/static/dist"),
    assetsDir: "",
  },
});
