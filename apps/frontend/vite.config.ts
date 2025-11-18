import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';
import vueDevTools from 'vite-plugin-vue-devtools';

dotenv.config();

export default defineConfig({
  plugins: [
    vue({
      include: ['**/*.vue'],
      exclude: ['node_modules', 'dist', 'test/**/*'],
      features: {
        propsDestructure: true,
      },
    }),
    istanbul({
      include: 'src/**/*',
      exclude: ['node_modules', 'test/**/*', 'src/router/index.ts'],
      extension: ['.js', '.ts', '.vue'],
      cypress: true,
    }),
    vueDevTools(),
  ],
  optimizeDeps: {
    exclude: ['@tanstack/vue-query']
  },
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 8181,
  },
});
