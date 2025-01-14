import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs", "esm", "iife"],
  // Ensures type definitions are generated
  dts: true,
  splitting: false, // Usually false for libraries
  sourcemap: true,
  clean: true, // Removes old dist before building
  // Uncomment if you want the output minified
  minify: true,
  // Externalize certain dependencies if needed
  external: ["@tiptap/core", "@tiptap/pm"],
  tsconfig: "tsconfig.json",
});
