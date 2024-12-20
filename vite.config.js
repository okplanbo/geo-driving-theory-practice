import { name } from "./package.json";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${name}/`,
  plugins: [react()],
  server: { port: 5174 },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          staticDataRu: ["./src/static_data_ru.json"],
          staticDataEn: ["./src/static_data_en.json"],
        },
      },
    },
  },
});
