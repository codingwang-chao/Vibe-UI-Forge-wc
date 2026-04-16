import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react/jsx-runtime": path.resolve(
        __dirname,
        "./node_modules/react/jsx-runtime.js"
      ),
      "react/jsx-dev-runtime": path.resolve(
        __dirname,
        "./node_modules/react/jsx-dev-runtime.js"
      ),
      "react-dom/client": path.resolve(
        __dirname,
        "./node_modules/react-dom/client.js"
      ),
      react: path.resolve(__dirname, "./node_modules/react/index.js"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom/index.js"),
    },
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname, "..")],
    },
  },
})
