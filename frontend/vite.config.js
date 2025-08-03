import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:3000`,
        // target: `${process.env.VITE_API_URL}`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define : {
    'process.env.VITE_API_URL':JSON.stringify(process.env.VITE_API_URL)
  }
});
