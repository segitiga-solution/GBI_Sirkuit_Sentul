import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/GBI_Sirkuit_Sentul/", // ⚠️ sesuai nama repo kamu di GitHub
});
