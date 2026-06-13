import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: {
          // Keep the heavy 3D stack out of the initial bundle path.
          three: ["three"],
          r3f: ["@react-three/fiber", "@react-three/drei", "@react-three/postprocessing"],
          motion: ["gsap", "@gsap/react", "framer-motion", "lenis"],
        },
      },
    },
  },
});
