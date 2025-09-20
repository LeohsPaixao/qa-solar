---
sidebar_position: 3
---

# 📂 Projeto

Aqui você encontrará informações sobre o projeto backend do monorepo **QA Solar**.

## Como Executar o Projeto

  #### **1. Configuração do Banco de Dados**
    * Crie um banco de dados no PostgreSQL, acesse a documentação [Configuração do PostgreSQL](./database)
    * Configure as variáveis de ambiente conforme exemplo abaixo

  #### **2. Copie o arquivo `.env.example` para `.env` e preencha as informações:**
      ```plaintext
      DATABASE_URL=postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public
      JWT_SECRET=<sua-chave-secreta>
      ```

  #### **3. Migrações e Seeders**

    * Obs.: A seed `genericUser.ts` pode não funcionar executando pela raiz do projeto, execute pelo workspace `backend`.

    1. Gerar cliente Prisma:
        ```bash
        yarn workspace backend prisma generate
        ```

    2. Executar migrações do banco de dados:
        ```bash
        yarn workspace backend prisma migrate dev
        ```

    3. Popular banco de dados com dados de teste:
        ```bash
        yarn workspace backend prisma:seed
        ```

  #### **4. Iniciar o Servidor**
    * Desenvolvimento:
        ```bash
        yarn dev
        ```

    * Desenvolvimento com debug:
        ```bash
        yarn dev:debug
        ```

    * Produção:
        ```bash
        yarn build
        ```

## Estrutura do Projeto

```plaintext
backend/
├── prisma/
│   ├── schema.prisma             # Definição do banco de dados e modelos
│   ├── migrations/               # Histórico de migrações do banco de dados
│   └── seeders/                  # Dados para popular o banco de dados
│       ├── generateUserFake.ts   # Gera usuários fakes
│       └── genericUser.ts        # Gera o usuário padrão
├── src/
│   ├── modules/                  # Módulos da aplicação
│   │   ├── auth/                 # Autenticação e autorização
│   │   ├── users/                # Gerenciamento de usuários
│   │   ├── password-recovery/    # Recuperação de senha
│   │   └── prisma/               # Configuração do Prisma
│   ├── utils/                    # Utilitários e helpers
│   ├── app.module.ts             # Módulo principal da aplicação
│   └── main.ts                   # Ponto de entrada da aplicação
├── .env.example                  # Exemplo de variáveis de ambiente
├── package.json                  # Configuração do projeto e dependências
└── README.md                     # Documentação do backend
```

## Scripts Disponíveis

  #### **Desenvolvimento**
    - **`yarn dev`**: Inicia o servidor em modo desenvolvimento
    - **`yarn dev:debug`**: Inicia o servidor com debug habilitado
    - **`yarn build`**: Compila o projeto para produção

  #### **Banco de Dados**
    - **`yarn prisma migrate dev`**: Executa migrações no banco de dados
    - **`yarn prisma generate`**: Gera os clientes do Prisma
    - **`yarn prisma:seed`**: Popula o banco de dados com dados de teste

  #### **Qualidade de Código**
    - **`yarn lint`**: Executa o linter e corrige problemas automaticamente