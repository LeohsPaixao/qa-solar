# Cypress UI Tests

![Cypress Version](https://img.shields.io/badge/cypress-v14.0.2-green)
[![QA-Solar](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/count/en7s34/main&style=flat&logo=cypress)](https://cloud.cypress.io/projects/en7s34/runs)

## 📝 Descrição

Projeto de testes automatizados utilizando Cypress para validação de interface de usuário (UI). Este projeto faz parte de um Monorepo e é focado em garantir a qualidade do frontend.

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
     yarn cy:open
     ```
   - **Modo headless**:
     ```bash
     yarn cy:run
     ```

## 📂 Estrutura do Projeto

```plaintext
.
├── tests/
│   ├── e2e/
│   │   ├── specs/           # Testes
│   │   ├── misc/            # Artefatos (capturas de tela, downloads, etc.)
│   │   └── support/         # Mocks e utilitários
├── .env                      # Variáveis de ambiente
├── cypress.config.ts         # Configuração do Cypress
├── README.md                 # Documentação
```

## 📊 Tester Reporter

*Esta seção está em desenvolvimento.*

