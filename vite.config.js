import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Update this if your app is in a subdirectory
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Make the server accessible outside the container
    port: 5173,       // Make sure the port matches the one in your docker-compose.yml
  },
});

