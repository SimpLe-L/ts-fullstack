import { defineConfig } from "tsdown";
export default defineConfig({
  entry: [
    './src/index.ts',
  ],
  dts: true,
  shims: true,
  format: "esm",
  target: "es2020",
  outDir: "dist",
  platform: "browser",
  external: ["node:*"],
});
