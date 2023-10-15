import { defineConfig, UserConfig } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import checker from "vite-plugin-checker";
import path from "path";
import react from "@vitejs/plugin-react";

const config: UserConfig = defineConfig({
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: {
      "~": new URL("./src", import.meta.url).pathname,
    },
  },
});

export default config;
