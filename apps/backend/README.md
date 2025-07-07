# Backend - QA Solar

Este é o projeto backend do monorepo **QA Solar**, construído com **NestJS** e **TypeScript**. Ele fornece uma API robusta que interage com um banco de dados **PostgreSQL** utilizando **Prisma** como ORM. O foco principal é suportar o frontend e possibilitar a realização de testes E2E e integrações.

---

## 📋 Índice

- [🛠 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔧 Scripts Disponíveis](#-scripts-disponíveis)
- [🧪 Testes](#-testes)
- [📚 Documentação da API](#-documentação-da-api)

---

## 🛠 Tecnologias Utilizadas

### **Framework e Runtime**
- **NestJS**: Framework Node.js para construção de aplicações escaláveis e eficientes
- **TypeScript**: Linguagem de programação tipada
- **Node.js**: Runtime JavaScript

### **Banco de Dados e ORM**
- **PostgreSQL**: Banco de dados relacional
- **Prisma**: ORM moderno para TypeScript e Node.js

### **Autenticação e Segurança**
- **JWT (jsonwebtoken)**: Para autenticação baseada em tokens
- **Passport**: Middleware de autenticação
- **bcryptjs**: Para hash de senhas

### **Validação e Documentação**
- **class-validator**: Validação de dados
- **class-transformer**: Transformação de objetos
- **Swagger/OpenAPI**: Documentação automática da API

### **Desenvolvimento e Testes**
- **Jest**: Framework de testes
- **ESLint**: Linting de código
- **Prettier**: Formatação de código

---

## 🚀 Como Executar o Projeto

### **1. Configuração do Banco de Dados**
- Crie um banco de dados no PostgreSQL
- Para mais detalhes sobre configuração, acesse [configurar PostgreSQL](postgreSQL.md)

### **2. Copie o arquivo `.env.example` para `.env` e preencha as informações:**
  ```plaintext
  DATABASE_URL=postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public
  JWT_SECRET=<sua-chave-secreta>
  ```

### **3. Migrações e Seeders**
```bash
# Gerar cliente Prisma
yarn workspace backend prisma generate

# Executar migrações do banco de dados
yarn workspace backend prisma migrate dev


# Popular banco de dados com dados de teste
yarn workspace backend prisma:seed
```

### **4. Iniciar o Servidor**
```bash
# Desenvolvimento
yarn dev

# Desenvolvimento com debug
yarn dev:debug

# Produção
yarn build
```

---

## 📂 Estrutura do Projeto

```plaintext
backend/
├── prisma/
│   ├── schema.prisma          # Definição do banco de dados e modelos
│   ├── migrations/            # Histórico de migrações do banco de dados
│   └── seeders/              # Dados para popular o banco de dados
│       ├── generateUserFake.ts
│       └── genericUser.ts
├── src/
│   ├── modules/              # Módulos da aplicação
│   │   ├── auth/            # Autenticação e autorização
│   │   ├── users/           # Gerenciamento de usuários
│   │   ├── password-recovery/ # Recuperação de senha
│   │   └── prisma/          # Configuração do Prisma
│   ├── utils/               # Utilitários e helpers
│   ├── app.module.ts        # Módulo principal da aplicação
│   └── main.ts              # Ponto de entrada da aplicação
├── .env.example             # Exemplo de variáveis de ambiente
├── package.json             # Configuração do projeto e dependências
└── README.md                # Documentação do backend
```

---

## 🔧 Scripts Disponíveis

### **Desenvolvimento**
- **`yarn dev`**: Inicia o servidor em modo desenvolvimento
- **`yarn dev:debug`**: Inicia o servidor com debug habilitado
- **`yarn build`**: Compila o projeto para produção

### **Banco de Dados**
- **`yarn prisma migrate dev`**: Executa migrações no banco de dados
- **`yarn prisma generate`**: Gera os clientes do Prisma
- **`yarn prisma:seed`**: Popula o banco de dados com dados de teste

### **Qualidade de Código**
- **`yarn lint`**: Executa o linter e corrige problemas automaticamente

---

## 🧪 Testes

### **Executar Testes**
- **`yarn test`**: Executa todos os testes
- **`yarn test:watch`**: Executa testes em modo watch
- **`yarn test:e2e`**: Executa testes end-to-end
- **`yarn test:cov`**: Executa testes com cobertura
- **`yarn test:debug`**: Executa testes em modo debug

### **Cobertura de Testes**
Os testes cobrem os módulos principais da aplicação:
- Módulo de Autenticação
- Módulo de Usuários
- Módulo de Recuperação de Senha

---

## 📚 Documentação da API

A documentação da API está disponível através do Swagger UI quando o servidor estiver rodando:

- **URL**: `http://localhost:3001/api`
- **Autenticação**: Bearer Token (JWT)

### **Endpoints Principais**
- **Autenticação**: `/auth/*`
- **Usuários**: `/users/*`
- **Recuperação de Senha**: `/password-recovery/*`