import { defineConfig } from 'cypress';

export default defineConfig({
  experimentalMemoryManagement: true,
  trashAssetsBeforeRuns: false,
  chromeWebSecurity: false,
  modifyObstructiveCode: false,
  watchForFileChanges: false,
  defaultCommandTimeout: 4000,
  pageLoadTimeout: 120 * 1000,
  numTestsKeptInMemory: 0,
  video: false,
  e2e: {
    baseUrl: 'http://localhost:8181',
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
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--incognito');
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--disable-dev-shm-usage');
          launchOptions.args.push('--disable-renderer-backgrounding');
          launchOptions.args.push('--disable-background-timer-throttling');
        }

        if (browser.name === 'electron') {
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-renderer-backgrounding');
        }

        return launchOptions;
      });

      return config;
    },
  },
});
