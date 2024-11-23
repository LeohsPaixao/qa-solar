# Backend - QA Solar

Este é o projeto backend do monorepo **QA Solar**, construído com **Node.js** e **Express**. Ele fornece uma API simples que interage com um banco de dados **PostgreSQL** utilizando **Prisma** como ORM. O foco principal é suportar o frontend e possibilitar a realização de testes E2E e integrações.

---

## 🛠 Tecnologias Utilizadas

- **Express**: Framework minimalista para criar APIs.  
- **Prisma**: ORM moderno para interagir com o banco de dados PostgreSQL.  
- **PostgreSQL**: Banco de dados relacional.  
- **bcryptjs**: Para hash de senhas e segurança.  
- **jsonwebtoken**: Para autenticação baseada em tokens JWT.  
- **dotenv**: Para gerenciar variáveis de ambiente.  
- **CORS**: Middleware para configurar permissões de acesso entre origens.

---

## 🚀 Como Rodar o Projeto

1. **Pré-requisitos**:
   - [![Node.js Version](https://img.shields.io/badge/Node.js-%3E=22.1.0-brightgreen.svg)](https://nodejs.org/)
   - [![Yarn Version](https://img.shields.io/badge/Yarn-1.22.22-blue.svg)](https://classic.yarnpkg.com/en/docs/install/)
   - Banco de dados **PostgreSQL**, para mais detalhes, acesse [configurar PostgreSQL](postgreSQL.md)

2. **Instalação**:
   Clone o repositório e navegue até o diretório `backend`:
   ```bash
   git clone https://github.com/LeohsPaixao/vue-tests.git
   cd vue-tests/backend
   yarn install
   ```

3. **Configuração do Banco de Dados**:
   - Crie um banco de dados no PostgreSQL.
   - Copie o arquivo `.env.example` para `.env` e preencha as informações:
     ```plaintext
     DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
     JWT_SECRET=<sua-chave-secreta>
     ```

4. **Gerar as Migrações**:
   ```bash
   yarn prisma migrate dev
   ```

5. **Iniciar o Servidor**:
   ```bash
   yarn api
   ```

---

## 📂 Estrutura do Projeto

```plaintext
backend/
├── prisma/
│   ├── schema.prisma  # Definição do banco de dados e modelos
│   └── migrations/    # Histórico de migrações do banco de dados
├── src/
│   ├── config/        # Middlewares para validação e autenticação
│   ├── constants/     # Mensagens e variaveis reutilizadas
│   ├── controllers/   # Lógica das rotas
│   ├── routes/        # Definição de rotas da API
│   └── app.js         # Configuração principal do Express
│   ├── server.js      # Configuração e inicialização do servidor
├── .env.example       # Exemplo de variáveis de ambiente
├── package.json       # Configuração do projeto e dependências
└── README.md          # Documentação do backend
```

---

## 🔧 Scripts Disponíveis

- **`yarn api`**: Inicia o servidor backend.  
- **`yarn prisma migrate dev`**: Executa migrações no banco de dados.  
- **`yarn prisma generate`**: Gera os clientes do Prisma com base no schema.

---

## 🌱 Instalação de Dependências Adicionais

Caso precise instalar novas dependências, utilize:
```bash
yarn add <package>           # Para dependências de produção
yarn add -D <package>        # Para dependências de desenvolvimento
```

---

## 🛡 Segurança e Boas Práticas

- **Senhas**: São armazenadas com hash utilizando `bcryptjs`.  
- **Tokens JWT**: São gerados e validados com `jsonwebtoken` para autenticação segura.  
- **Variáveis de ambiente**: Todas as informações sensíveis estão no arquivo `.env`. Certifique-se de que ele não seja compartilhado.

---

## 📜 Licença

Este projeto está licenciado sob a [MIT License](../LICENSE).