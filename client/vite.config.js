import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Replace with your desired port number
    host: 'localhost', // You can also use '0.0.0.0' to allow external access
  },
});