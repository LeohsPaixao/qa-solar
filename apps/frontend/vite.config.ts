import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { config } from 'dotenv';
import istanbul from 'vite-plugin-istanbul';
import vueDevTools from 'vite-plugin-vue-devtools';
import { defineConfig } from 'vitest/config';

config();

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
  build: {
    sourcemap: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    reporters: 'verbose',
    outputFile: 'coverage/index.html',
    testTimeout: 5000,
    retry: process.env.CI ? 2 : 0,
    include: ['src/**/*.spec.ts'],
    exclude: ['node_modules', 'dist', 'test/**/*', 'src/router/index.ts'],
    setupFiles: ['./test/vitest-setup.ts'],
    poolOptions: {
      threads: {
        maxThreads: 1,
      },
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*'],
      exclude: ['node_modules', 'test/**/*', 'src/main.ts', 'src/types', 'src/router/index.ts', 'src/plugins', 'src/**/*.d.ts', 'src/**/*.types.ts'],
      extension: ['.js', '.ts', '.vue'],
      reporter: ['html', 'text-summary', 'lcov'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
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
