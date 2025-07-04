import playwright from 'eslint-plugin-playwright'

export default [
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-conditional-in-test': 'off',
      'playwright/no-focused-test': 'off',
      'playwright/no-only-test': 'off',
      'playwright/no-skipped-test': 'off',
    },
  },
]