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
    await expect(page.locator('[data-testid="btn-login"]')).toBeVisible();
    await expect(page.locator('[data-testid="btn-login"]')).toBeDisabled();
  });

  test('Não deveria ser possível fazer login com credenciais inválidas', async ({ page }) => {
    await expect(page.locator('[data-testid="btn-login"]')).toBeDisabled();
    await page.locator('[data-testid="input-email"]').fill('email@example.com');
    await page.locator('[data-testid="input-password"]').fill('password@example.com');
    await expect(page.locator('[data-testid="btn-login"]')).toBeEnabled();
    await page.locator('[data-testid="btn-login"]').click();
    const toastContent = page.locator('[data-testid="toast-content"]');
    await expect(toastContent).toBeVisible();
    await expect(toastContent).toHaveText('Usuário não encontrado.');
  });

  test('Não deveria ser possível fazer login com a senha inválida', async ({ page }) => {
    await expect(page.locator('[data-testid="btn-login"]')).toBeDisabled();
    await page.locator('[data-testid="input-email"]').fill('generic@example.com');
    await page.locator('[data-testid="input-password"]').fill('password@example.com');
    await expect(page.locator('[data-testid="btn-login"]')).toBeEnabled();
    await page.locator('[data-testid="btn-login"]').click();
    const toastContent = page.locator('[data-testid="toast-content"]');
    await expect(toastContent).toBeVisible();
    await expect(toastContent).toHaveText('A senha não confere.');
  });

  test('Deveria ser possível fazer login com credenciais válidas', async ({ page }) => {
    await expect(page.locator('[data-testid="btn-login"]')).toBeDisabled();
    await page.locator('[data-testid="input-email"]').fill('generic@example.com');
    await page.locator('[data-testid="input-password"]').fill('123456');
    await expect(page.locator('[data-testid="btn-login"]')).toBeEnabled();
    await page.locator('[data-testid="btn-login"]').click();
  });

  test('Deveria ser possível ir para a tela de cadastro', async ({ page, baseURL }) => {
    await page.locator('[data-testid="link-singup"]').click();
    await expect(page).toHaveURL(`${baseURL}/signup`);
    const url = new URL(page.url());
    expect(url.origin).toBe(baseURL);
    expect(url.pathname).toBe('/signup');
    expect(url.protocol).toBe('http:');
  });

  test('Deveria ser possível ir para a tela de esqueci a senha', async ({ page, baseURL }) => {
    await page.locator('[data-testid="link-recover-password"]').click();
    await expect(page).toHaveURL(`${baseURL}/recover-password`);
    const url = new URL(page.url());
    expect(url.origin).toBe(baseURL);
    expect(url.pathname).toBe('/recover-password');
    expect(url.protocol).toBe('http:');
  });
});
