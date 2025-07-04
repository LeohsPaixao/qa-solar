# Cypress UI Tests

![Cypress Version](https://img.shields.io/badge/cypress-v14.0.3-green)
[![QA-Solar](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/count/en7s34/main&style=flat&logo=cypress)](https://cloud.cypress.io/projects/en7s34/runs)

## 📝 Descrição

Projeto de testes automatizados utilizando Cypress para validação de interface de usuário (UI). Este projeto faz parte de um Monorepo e é focado em garantir a qualidade do frontend, incluindo tanto testes end-to-end (E2E) quanto testes de componentes.

## ✅ Pré-requisitos

- **Node.js** v22.1.0
- **Yarn** v1.22.22
- Variáveis de ambiente configuradas no arquivo `.env`

## ⚙️ Configuração

### 🔧 Como executar

- Abrir o Cypress:
   - **Modo interativo**:
     ```bash
     yarn cy:open
     ```

- Executar os testes de componentes e/ou E2E:
   - **Modo headless**:
     ```bash
     yarn cy:e2e:run
     ```

   - **Modo headless**:
     ```bash
     yarn cy:component:run
     ```

## 📂 Estrutura do Projeto

```plaintext
.
├── tests/
│   ├── e2e/                               # Testes end-to-end
│   │   ├── specs/                          # Testes E2E
│   │   ├── fixtures/                       # Dados de teste
│   │   ├── shared/                         # Utilitários compartilhados
│   │   └── support/                        # Mocks e comandos customizados
│   ├── component/                   # Testes de componentes
│   │   ├── specs/                            # Testes dos componentes
│   │   ├── support/                         # Arquivos de suporte e comandos customizados
│   │   └── fixtures/                         # Dados de teste
├── .env                            # Variáveis de ambiente
├── cypress.config.ts        # Configuração do Cypress
└── README.md            # Documentação
```

## 🧪 Tipos de Testes

### Testes End-to-End (E2E)

Os testes E2E simulam o comportamento real do usuário, testando fluxos completos da aplicação.

### Testes de Componentes

Os testes de componentes verificam o comportamento isolado de componentes Vue individuais.

## 📝 Exemplos de Testes

### Exemplo de Teste E2E - Formulário de Registro

```typescript
describe('User Registration', () => {
  it('should register a new user successfully', () => {
    cy.visit('/register')
    
    // Preenche o formulário
    cy.get('[data-testid="name"]').type('João Silva')
    cy.get('[data-testid="email"]').type('joao@example.com')
    cy.get('[data-testid="cpf"]').type('12345678901')
    cy.get('[data-testid="password"]').type('senha123')
    
    // Submete o formulário
    cy.get('[data-testid="submit"]').click()
    
    // Verifica o sucesso
    cy.url().should('include', '/login')
    cy.get('[data-testid="success-message"]').should('be.visible')
  })
})
```

### Exemplo de Teste de Componente - Formulário

```typescript
describe('UserForm Component', () => {
  it('should validate required fields', () => {
    cy.mount(UserForm)
    
    // Tenta submeter sem preencher campos obrigatórios
    cy.get('[data-testid="submit-button"]').click()
    
    // Verifica se as mensagens de erro aparecem
    cy.get('[data-testid="name-error"]').should('be.visible')
    cy.get('[data-testid="email-error"]').should('be.visible')
  })
})
```

## 📊 Relatórios e Cobertura

- **Relatórios de Cobertura**: Os testes de componentes geram relatórios de cobertura de código
- **Capturas de Tela**: Testes E2E geram capturas de tela automaticamente em caso de falha
- **Vídeos**: Gravações dos testes são geradas para análise posterior
