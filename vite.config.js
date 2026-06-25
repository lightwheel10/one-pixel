import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        halcyon: resolve(__dirname, 'case-studies/halcyon/index.html'),
        forestLoom: resolve(__dirname, 'case-studies/forest-loom/index.html'),
        saintOrson: resolve(__dirname, 'case-studies/saint-orson/index.html'),
        karya: resolve(__dirname, 'case-studies/karya/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
      },
    },
  },
});
