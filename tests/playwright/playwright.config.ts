import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config()

export default defineConfig({
  testDir: './tests/specs',
  outputDir: './tests/misc/reports',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    acceptDownloads: false,
    ignoreHTTPSErrors: true,
    baseURL: process.env.PLAY_BASE_URL,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
  },
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      animations: 'disabled',
      maxDiffPixels: 10,
    },
    toMatchSnapshot: {
      threshold: 0.1,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]
});