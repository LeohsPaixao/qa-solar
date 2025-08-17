---
sidebar_position: 5
---

# Playwright

![Playwright Version](https://img.shields.io/badge/playwright-v1.49.0-orange)

Projeto de testes automatizados utilizando Playwright para validação de interface de usuário (UI) e testes end-to-end (E2E). Este projeto faz parte de um Monorepo, focado em garantir a robustez das funcionalidades do frontend.

## 📋 Índice

- [🔧 Como executar](#-como-executar)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [Exemplos de Testes](#exemplos-de-testes)
- [📊 Relatórios e Cobertura](#-relatórios-e-cobertura)

## 🔧 Como executar

  - Executar os testes:
     - **Modo interativo**:
         ```bash
         yarn play:open
         ```
     - **Modo headless**:
         ```bash
         yarn play:run
         ```
  - Visualizar relatórios:
      ```bash
      yarn play:report
      ```

  - Executar todos os testes:
      ```bash
      yarn test
      ```

## 📂 Estrutura do Projeto

```plaintext
.
├── tests/
│   ├── specs/               # Testes
│   ├── shared/commands      # Comandos personalizados para os testes
│   ├── shared/mocks         # Mocks
│   ├── shared/utils         # Utils
├── .env                      # Variáveis de ambiente
├── playwright.config.ts      # Configuração do Playwright
├── README.md                 # Documentação
```

## Exemplos de Testes

### Exemplo de Teste E2E - Formulário de Registro

```typescript
test.describe('Tela de listagem de Usuários', {
  annotation: { type: 'Test', description: 'Teste de listagem de usuários' },
}, () => {
  test.beforeAll(async () => {
    await generateUsers();
  });

  test.beforeEach(async ({ page }) => {
    login(page, 'generic@example.com', '123456');
    await page.goto('/listusers')
    await page.waitForURL('/listusers');
  });

  test('Deveria ser possível visualizar os elementos da tela de listagem de Usuários', async ({ page }) => {
    await expect(page.locator('[data-testid="table-users"]')).toBeVisible();
    await expect(page.locator('[data-testid="checkbox-select-all"]')).toBeVisible();
    await page.locator('[data-testid="btn-delete-user"]').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-testid="btn-delete-user"]')).toBeVisible();
  });
});
```

## 📊 Relatórios e Cobertura

- **Relatórios de Cobertura**: Os testes de componentes geram relatórios de cobertura de código
- **Capturas de Tela**: Testes E2E geram capturas de tela automaticamente em caso de falha
- **Vídeos**: Gravações dos testes são geradas para análise posterior
