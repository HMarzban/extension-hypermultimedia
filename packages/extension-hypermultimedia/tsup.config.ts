import { defineConfig } from "tsup";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs", "esm", "iife"],
  dts: true,
  splitting: false,
  sourcemap: !isProduction,
  clean: isProduction,
  minify: isProduction,
  external: ["@tiptap/core", "@tiptap/pm"],
  tsconfig: "tsconfig.json",
  esbuildOptions(options) {
    // Only preserve console logs in development
    options.drop = isProduction ? ["console"] : [];
  },
});
