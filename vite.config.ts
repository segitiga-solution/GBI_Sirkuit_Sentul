import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // <---- ini wajib agar asset relative, bukan absolut
  build: {
    outDir: "dist",
  },
});
