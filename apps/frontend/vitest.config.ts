import { mergeConfig } from 'vite'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, {
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
      exclude: ['node_modules', 'test/**/*', 'src/main.ts', 'src/types', 'src/router/index.ts', 'src/plugins', 'src/**/*.d.ts', 'src/**/*.types.ts', 'src/modules/**/**/utils/mocks/**/*.ts'],
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
})