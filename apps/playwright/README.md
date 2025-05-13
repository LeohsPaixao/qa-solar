# Playwright UI Tests

![Yarn Version](https://img.shields.io/badge/yarn-v1.22.22-blue)  
![Node Version](https://img.shields.io/badge/node-v22.1.0-green)  
![Playwright Version](https://img.shields.io/badge/playwright-v1.49.0-orange)

## 📝 Descrição

Projeto de testes automatizados utilizando Playwright para validação de interface de usuário (UI) e testes end-to-end (E2E). Este projeto faz parte de um Monorepo, focado em garantir a robustez das funcionalidades do frontend.

## ✅ Pré-requisitos

- **Node.js** v22.1.0
- **Yarn** v1.22.22
- Variáveis de ambiente configuradas no arquivo `.env`

## ⚙️ Configuração

### 🔧 Como executar

1. Instalar dependências:
   ```bash
   yarn install
   ```
2. Executar os testes:
   - **Modo interativo**:
     ```bash
     yarn play:open
     ```
   - **Modo headless**:
     ```bash
     yarn play:run
     ```
3. Visualizar relatórios:
   ```bash
   yarn play:report
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