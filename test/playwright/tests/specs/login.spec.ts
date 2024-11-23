import { expect, test } from '@playwright/test';

test.describe('Tela de Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('Deveria ser possível visualizar os elementos da tela', async ({ page }) => {
    await expect(page.locator('[data-testid="form"]')).toBeVisible();
    await expect(page.locator('[data-testid="logo"]')).toBeVisible();
    await expect(page.locator('[data-testid="input-email"]')).toBeVisible();
    await expect(page.locator('[data-testid="input-password"]')).toBeVisible();
    const loginButton = page.locator('[data-testid="btn-login"]');
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeDisabled();
  });
});
