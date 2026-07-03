import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

export default defineConfig({
  // Tailwind only emits utilities into CSS that does `@import "tailwindcss"` (just the Pravah
  // entry), so the other case studies keep their hand-written CSS untouched.
  plugins: [react(), tailwindcss()],
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        halcyon: resolve(__dirname, 'case-studies/halcyon/index.html'),
        forestLoom: resolve(__dirname, 'case-studies/forest-loom/index.html'),
        saintOrson: resolve(__dirname, 'case-studies/saint-orson/index.html'),
        karya: resolve(__dirname, 'case-studies/karya/index.html'),
        atlasAangan: resolve(__dirname, 'case-studies/atlas-aangan/index.html'),
        atlasAanganDestinations: resolve(__dirname, 'case-studies/atlas-aangan/destinations/index.html'),
        atlasAanganJapanUnplugged: resolve(__dirname, 'case-studies/atlas-aangan/japan-unplugged/index.html'),
        atlasAanganAbout: resolve(__dirname, 'case-studies/atlas-aangan/about/index.html'),
        atlasAanganPlan: resolve(__dirname, 'case-studies/atlas-aangan/plan/index.html'),
        aerium: resolve(__dirname, 'case-studies/aerium/index.html'),
        aeriumProduct: resolve(__dirname, 'case-studies/aerium/product/index.html'),
        aeriumShop: resolve(__dirname, 'case-studies/aerium/shop/index.html'),
        aeriumCheckout: resolve(__dirname, 'case-studies/aerium/checkout/index.html'),
        aeriumAbout: resolve(__dirname, 'case-studies/aerium/about/index.html'),
        pravah: resolve(__dirname, 'case-studies/pravah/index.html'),
        pravahAuth: resolve(__dirname, 'case-studies/pravah/auth/index.html'),
        pravahContact: resolve(__dirname, 'case-studies/pravah/contact/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
      },
    },
  },
});
