import { defineConfig, UserConfig } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import checker from "vite-plugin-checker";
import path from "path";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();
const config: UserConfig = defineConfig({
  define: {
    "process.env.VITE_KEY": JSON.stringify(process.env.VITE_KEY),
    "process.env.VITE_IV": JSON.stringify(process.env.VITE_IV),
    "process.env.VITE_ENVIRONMENT": JSON.stringify(
      process.env.VITE_ENVIRONMENT
    ),
  },
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
