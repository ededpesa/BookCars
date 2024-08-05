import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return defineConfig({
    plugins: [react()],

    resolve: {
      alias: {
        ":bookcars-types": path.resolve(__dirname, "../packages/bookcars-types"),
        ":bookcars-helper": path.resolve(__dirname, "../packages/bookcars-helper"),
        ":disable-react-devtools": path.resolve(__dirname, "../packages/disable-react-devtools"),
      },
    },

    server: {
      host: "0.0.0.0",
      port: Number.parseInt(process.env.VITE_PORT || "3003", 10),
      // watch: {
      //   usePolling: true, // Usa esta opción si los cambios no se detectan automáticamente
      //   //ignored: ["!**/packages/**"], // Asegúrate de que Vite observe cambios en los paquetes locales
      // },
    },

    build: {
      outDir: "build",
      target: "esnext",
    },
  });
};
