import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // gunakan "/" karena kamu pakai custom domain
  build: {
    outDir: "dist",
  },
});
