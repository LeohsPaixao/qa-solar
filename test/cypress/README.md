# Cypress UI Tests

![Yarn Version](https://img.shields.io/badge/yarn-v1.22.22-blue)  
![Node Version](https://img.shields.io/badge/node-v22.1.0-green)  
![Cypress Version](https://img.shields.io/badge/cypress-v13.16.0-orange)

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

