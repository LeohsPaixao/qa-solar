# Configuração do PostgreSQL

Este guia descreve o processo de instalação e configuração do PostgreSQL para garantir que o backend do projeto **Vue Tests** funcione corretamente. Ele inclui passos para usuários de **Windows** e **Linux**, além das permissões necessárias e a criação da tabela `users`.

---

## 🖥 Instalação no Windows

1. **Baixar o PostgreSQL**:
   - Acesse [https://www.postgresql.org/download/](https://www.postgresql.org/download/).
   - Escolha a versão adequada para o seu sistema operacional e faça o download do instalador.

2. **Instalar o PostgreSQL**:
   - Execute o instalador e siga os passos:
     1. Escolha o diretório de instalação.
     2. Configure a senha para o usuário **postgres** (guarde essa senha, pois será usada para acessar o banco de dados).
     3. Deixe as demais configurações padrão e finalize a instalação.

3. **Acessar o PostgreSQL**:
   - Abra o **pgAdmin** ou use o terminal **psql** para acessar o banco de dados:
     ```bash
     psql -U postgres
     ```

4. **Criar Banco de Dados e Usuário**:
   Execute os comandos no terminal `psql`:
   ```sql
   CREATE DATABASE nome_do_banco;
   CREATE USER nome_do_usuario WITH PASSWORD 'sua_senha';
   GRANT ALL PRIVILEGES ON DATABASE nome_do_banco TO nome_do_usuario;
   ALTER USER nome_do_usuario CREATEDB;
   ```

---

## 🐧 Instalação no Linux

### 1. Atualizar Pacotes
Execute os comandos abaixo para garantir que os pacotes do sistema estão atualizados:
```bash
sudo apt update
sudo apt upgrade
```

### 2. Instalar o PostgreSQL
Instale o PostgreSQL e os pacotes adicionais:
```bash
sudo apt install postgresql postgresql-contrib
```

### 3. Iniciar o Serviço do PostgreSQL
Após a instalação, inicie o serviço e verifique o status:
```bash
sudo service postgresql start
sudo service postgresql status
```

### 4. Configurar Permissões de Acesso
Permita o acesso ao diretório do usuário (se necessário):
```bash
sudo chmod o+x /home/user
```

### 5. Acessar o PostgreSQL
Acesse o PostgreSQL como o usuário `postgres`:
```bash
sudo -u postgres psql
```

### 6. Criar Banco de Dados e Usuário
Dentro do terminal `psql`, execute os comandos:
```sql
CREATE DATABASE nome_do_banco;
CREATE USER nome_do_usuario WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE nome_do_banco TO nome_do_usuario;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nome_do_usuario;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO nome_do_usuario;
ALTER USER nome_do_usuario CREATEDB;
```

---

## 🛠️ Criar a Tabela `users`

No terminal `psql`, conecte-se ao banco de dados:
```bash
\c nome_do_banco
```

Crie a tabela `users`:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  social_name VARCHAR(255),
  document VARCHAR(20) NOT NULL,
  doc_type VARCHAR(10) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

---

## 🔧 Configurar Variáveis de Ambiente

No arquivo `.env` do backend, configure as variáveis relacionadas ao banco de dados:
```plaintext
DATABASE_USER=nome_do_usuario
DATABASE_PASSWORD=sua_senha
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_SCHEMA=nome_do_banco

DATABASE_URL="postgresql://nome_do_usuario:sua_senha@localhost:5432/nome_do_banco?schema=public"
```

---

## 🧪 Testar a Conexão com o Banco de Dados

1. No diretório do backend, execute as migrações:
   ```bash
   yarn prisma migrate dev
   ```

2. Inicie o servidor backend:
   ```bash
   yarn api
   ```

Se tudo estiver configurado corretamente, o backend estará funcionando e conectado ao PostgreSQL.

---

Se precisar de ajuda ou encontrar algum problema, entre em contato com o autor do projeto.