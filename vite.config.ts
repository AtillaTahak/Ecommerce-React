import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
      include: '**/*.svg',
    }),
  ],
  test: {
	globals: true,
    environment: 'jsdom',
    setupFiles: ['vitest-localstorage-mock'],
    mockReset: false,
  }
});
