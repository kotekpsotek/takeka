import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  server: {
    port: 3000,
    host: true,
  },
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
