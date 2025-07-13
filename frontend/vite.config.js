import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const backendIP = env.VITE_BACKEND_IP || "localhost"; // fallback localhost

  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: 3000,
      proxy: {
        // Auth API proxy
        "/api/auth": {
          target: `http://${backendIP}:5000`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/auth/, "/api/auth"),
        },
        // Medical API proxy
        "/api/medical": {
          target: `http://${backendIP}:5000`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/medical/, "/api/medical"),
        },
      },
    },
  };
});
