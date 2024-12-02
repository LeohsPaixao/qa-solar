import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';
import { generateValidCPF } from '../../shared/commands/generateValidCPF';

test.describe('Tela de Cadastro de Usuários', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/signup')
  });

  test('Deveria ser possivel visualizar os elementos da tela de cadastro', async ({ page }) => {
    await expect(page.locator('[data-testid="form-register"]')).toBeVisible();
    await expect(page.locator('.form-group').first()).toBeVisible();
    await expect(page.locator('[data-testid="btn-register"]')).toBeVisible();
    await expect(page.locator('[data-testid="link-go-to-login"]')).toBeVisible();
  });

  test('Deveria ser possivel visualizar o toast ao clicar no botão sem adicionar algum valor nos campos', async ({ page }) => {
    await page.locator('[data-testid="btn-register"]').click();
    await expect(page.locator('[data-testid="toast-content"]')).toHaveText('Por favor, corrija os erros no formulário.');

    const inputName = ['fullname', 'cpfcnpj', 'email', 'password'];
    const inputError = ['O Nome Completo é obrigatório.', 'O CPF/CNPJ é obrigatório.', 'O Email é obrigatório.', 'A Senha é obrigatória.'];

    inputName.forEach((name, index) => {
      expect(page.locator(`[data-testid="input-error-${name}"]`)).toHaveText(inputError[index]);
    })
  });

  test('Não deveria ser possivel criar o usuário com o Nome Completo errado', async ({ page }) => {
    await page.locator('[data-testid="input-fullname"]').fill('Teste');
    await page.locator('[data-testid="btn-register"]').click();
    await expect(page.locator('[data-testid="toast-content"]')).toHaveText('Por favor, corrija os erros no formulário.');
    await expect(page.locator('[data-testid="input-error-fullname"]')).toHaveText('O Nome Completo deve conter pelo menos Nome e Sobrenome.');
  });

  test('Não deveria ser possivel criar o usuário com o CPF inválido', async ({ page }) => {
    await page.locator('[data-testid="input-document"]').fill('123.456.789-10');
    await page.locator('[data-testid="btn-register"]').click();
    await expect(page.locator('[data-testid="toast-content"]')).toHaveText('Por favor, corrija os erros no formulário.');
    await expect(page.locator('[data-testid="input-error-cpfcnpj"]')).toHaveText('CPF inválido.');
  })

  test('Não deveria ser possivel criar o usuário com o CNPJ inválido', async ({ page }) => {
    await page.locator('[data-testid="select-document-type"]').selectOption('cnpj')
    await page.locator('[data-testid="input-document"]').fill('12.456.789/1110-60');
    await page.locator('[data-testid="btn-register"]').click();
    await expect(page.locator('[data-testid="toast-content"]')).toHaveText('Por favor, corrija os erros no formulário.');
    await expect(page.locator('[data-testid="input-error-cpfcnpj"]')).toHaveText('CNPJ inválido.');
  });

  test('Não deveria ser possivel colocar letras no campo de telefone', async ({ page }) => {
    await page.locator('[data-testid="input-phone"]').fill('dfdfsff');

    await page.locator('[data-testid="btn-register"]').click();
    await expect(page.locator('[data-testid="toast-content"]')).toHaveText('Por favor, corrija os erros no formulário.');
    await expect(page.locator('[data-testid="input-error-phone"]')).toHaveText('O telefone deve conter apenas números.');
  });

  test('Não deveria ser possivel colocar mais do que 11 dígitos no campo de telefone', async ({ page }) => {
    await page.locator('[data-testid="input-phone"]').fill('546521854651854');
    await page.locator('[data-testid="btn-register"]').click();
    await expect(page.locator('[data-testid="toast-content"]')).toHaveText('Por favor, corrija os erros no formulário.');
    await expect(page.locator('[data-testid="input-error-phone"]')).toHaveText('O telefone deve ter no máximo 11 dígitos.');
  });

  test('Não deveria ser possivel colocar menos do que 10 dígitos no campo de telefone', async ({ page }) => {
    await page.locator('[data-testid="input-phone"]').fill('1452');
    await page.locator('[data-testid="btn-register"]').click();
    await expect(page.locator('[data-testid="toast-content"]')).toHaveText('Por favor, corrija os erros no formulário.');
    await expect(page.locator('[data-testid="input-error-phone"]')).toHaveText('O telefone deve ter no mínimo 10 dígitos.');
  });

  test('Não deveria ser possivel criar o usuário com o email inválido', async ({ page }) => {
    await page.locator('[data-testid="input-email"]').fill('email@exassd');
    await page.locator('[data-testid="btn-register"]').click();
    await expect(page.locator('[data-testid="toast-content"]')).toHaveText('Por favor, corrija os erros no formulário.');
    await expect(page.locator('[data-testid="input-error-email"]')).toHaveText('Email inválido.');
  });

  test('Não deveria ser possivel criar o usuário com uma senha com menos de 6 caracteres', async ({ page }) => {
    await page.locator('[data-testid="input-password"]').fill('14521');
    await page.locator('[data-testid="btn-register"]').click();
    await expect(page.locator('[data-testid="toast-content"]')).toHaveText('Por favor, corrija os erros no formulário.');
    await expect(page.locator('[data-testid="input-error-password"]')).toHaveText('A Senha deve ter no mínimo 6 caracteres.');
  });

  test('Não deveria ser possivel criar o usuário com uma senha com mais de 20 caracteres', async ({ page }) => {
    await page.locator('[data-testid="input-password"]').fill('Teste54544dfdf545454d');
    await page.locator('[data-testid="btn-register"]').click();
    await expect(page.locator('[data-testid="toast-content"]')).toHaveText('Por favor, corrija os erros no formulário.');
    await expect(page.locator('[data-testid="input-error-password"]')).toHaveText('A Senha deve ter no máximo 20 caracteres.');
  });

  test('Deveria ser possivel cadastrar um usuário', async ({ page }) => {
    const cpf = generateValidCPF()

    await page.locator('[data-testid="input-fullname"]').fill(faker.person.fullName());
    await page.locator('[data-testid="input-socialname"]').fill(faker.person.middleName());
    await page.locator('[data-testid="input-document"]').fill(cpf);
    await page.locator('[data-testid="input-phone"]').fill(faker.phone.number({ style: 'national' }));
    await page.locator('[data-testid="input-email"]').fill(faker.internet.email({ provider: 'example.qa.solar' }));
    await page.locator('[data-testid="input-password"]').fill('123456')
    await page.locator('[data-testid="btn-register"]').click();

    const toast = page.locator('[data-testid="toast-content"]')
    await toast.waitFor({ state: 'visible' })
    await expect(toast).toHaveText('Usuário cadastrado com sucesso!');
  });

  test('Deveria ser possivel ir para a tela de login ao clicar no link', async ({ page }) => {
    await page.locator('[data-testid="link-go-to-login"]').click();
    await expect(page.locator('[data-testid="form-login"]')).toBeVisible();
    await expect(page.locator('[data-testid="btn-login"]')).toBeVisible();
  });
})
