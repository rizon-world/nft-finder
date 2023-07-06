import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), nodePolyfills()],
});
