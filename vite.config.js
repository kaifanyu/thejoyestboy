import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [
    react(),
  ],
  base: '/',
  server: {
    port: 8001, // Specify the port
    host: true, // Optional: Expose the server to your network
  },
});



