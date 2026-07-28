import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development"

  return {
    base: "./",
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    plugins: [react()],
    build: {
      outDir: "build",
      emptyOutDir: true,
      watch: isDevelopment
        ? {
            exclude: ["build/**"],
          }
        : null,
      cssCodeSplit: false,
      lib: {
        entry: resolve(__dirname, "src/index.tsx"),
        formats: ["es"],
        fileName: isDevelopment ? "index-dev" : "index-[hash]",
      },
      rollupOptions: {
        output: {
          assetFileNames: assetInfo =>
            assetInfo.name?.endsWith(".css")
              ? isDevelopment
                ? "styles-dev[extname]"
                : "styles-[hash][extname]"
              : "assets/[name]-[hash][extname]",
        },
      },
    },
  }
})
