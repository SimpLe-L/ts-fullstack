import { defineConfig } from "tsdown";
export default defineConfig({
  entry: [
    './src/client/index.ts',
    './src/server/index.ts',
    './src/contracts/index.ts',
  ],
  dts: true,
  shims: true,
  format: "esm",
  target: "es2020",
  outDir: "dist",
  platform: "browser",
  external: ["node:*"],
});
