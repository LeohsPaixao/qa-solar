import { Page } from '@playwright/test';

/**
 * Realiza a operação de login simulando uma requisição POST para o endpoint de login da API.
 * Armazena o token recebido e o e-mail no local storage do navegador.
 *
 * @param {Page} page - A página do Playwright onde o localStorage será definido.
 * @param {string} email - O email do usuário para login.
 * @param {string} password - A senha do usuário para login.
 * @returns {Promise<void>} - Uma promise que é resolvida quando a operação de login é concluída.
 */
export async function login(page: Page, email: string, password: string): Promise<void> {

  const response = await page.request.fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      email,
      password
    }
  })

  const { token } = JSON.parse(await response.text())

  await page.evaluate(({ email, token }) => {
    localStorage.setItem('user-token', token);
    localStorage.setItem('user-email', email);
  }, { email, token });
}
