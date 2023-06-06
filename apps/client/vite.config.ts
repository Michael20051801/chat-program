/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/client',

  server: {
    port: 4200,
    // host: 'localhost',
    host: '192.168.16.17',
    // host: '84.110.113.175',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    svgr(),
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../',
  //    }),
  //  ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
