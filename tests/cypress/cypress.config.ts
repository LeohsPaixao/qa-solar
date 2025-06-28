import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import codeCoverage from '@cypress/code-coverage/task';
import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  projectId: 'en7s34',
  video: false,
  chromeWebSecurity: false,
  modifyObstructiveCode: false,
  defaultCommandTimeout: 4000,
  pageLoadTimeout: 120 * 1000,
  trashAssetsBeforeRuns: true,
  experimentalMemoryManagement: true,
  watchForFileChanges: false,
  numTestsKeptInMemory: 0,
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:8181',
    viewportHeight: 768,
    viewportWidth: 1366,
    specPattern: './tests/e2e/**/*.cy.{js,ts}',
    supportFile: './tests/e2e/support/e2e.ts',
    screenshotsFolder: './tests/e2e/misc/screenshots',
    downloadsFolder: './tests/e2e/misc/downloads',
    fixturesFolder: './tests/e2e/fixtures',
    retries: {
      experimentalStrategy: 'detect-flake-and-pass-on-threshold',
      experimentalOptions: {
        maxRetries: 1,
        passesRequired: 1,
      },
      openMode: false,
      runMode: true,
    },
    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      on('file:preprocessor', createBundler())

      codeCoverage(on, config);

      on('before:browser:launch', (browser: Cypress.Browser, launchOptions: Cypress.BeforeBrowserLaunchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--incognito');
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--disable-dev-shm-usage');
          launchOptions.args.push('--disable-renderer-backgrounding');
          launchOptions.args.push('--disable-background-timer-throttling');
        }
        return launchOptions;
      });

      config.env.CYPRESS_API_URL = process.env.CYPRESS_API_URL || 'http://localhost:3001';

      return config;
    },
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig: {
        configFile: '../../apps/frontend/vite.config.ts',
      },
    },
    viewportHeight: 768,
    viewportWidth: 1366,
    specPattern: './tests/component/specs/**/*.cy.{js,ts}',
    supportFile: './tests/component/support/component.ts',
    indexHtmlFile: './tests/component/support/component-index.html',
    screenshotsFolder: './tests/component/misc/screenshots',
    downloadsFolder: './tests/component/misc/downloads',
    fixturesFolder: './tests/component/fixtures',
    retries: {
      experimentalStrategy: 'detect-flake-and-pass-on-threshold',
      experimentalOptions: {
        maxRetries: 1,
        passesRequired: 1,
      },
      openMode: false,
      runMode: true,
    },
    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      on('file:preprocessor', createBundler())

      codeCoverage(on, config);

      on('before:browser:launch', (browser: Cypress.Browser, launchOptions: Cypress.BeforeBrowserLaunchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--incognito');
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--disable-dev-shm-usage');
          launchOptions.args.push('--disable-renderer-backgrounding');
          launchOptions.args.push('--disable-background-timer-throttling');
        }
        return launchOptions;
      });

      return config;
    },
  },
});
