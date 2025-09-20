---
sidebar_position: 4
---

# 📊 Configuração do PostgreSQL

Este guia descreve o processo de instalação e configuração do PostgreSQL para garantir que o backend do projeto **QA Solar** funcione corretamente. Ele inclui passos para usuários de **Windows** e **Linux**, além das permissões necessárias e a criação da tabela `users`.

## Configuração do PostgreSQL

    1. **Baixar o PostgreSQL**:
        - Acesse [https://www.postgresql.org/download/](https://www.postgresql.org/download/).
        - Escolha a versão adequada para o seu sistema operacional e faça o download do instalador.
        - Se instalar para o Windows, ignore o passo 2.

    2. Configurar Permissões de Acesso
        * Permita o acesso ao diretório do usuário (se necessário):
        ```bash
        sudo chmod o+x /home/<user_name>
        ```

    3. Acessar o PostgreSQL
        * Acesse o PostgreSQL como o usuário `postgres`:
        
          - Linux
          ```bash
          sudo -u postgres psql
          ```

          - Windows
          ```bash
          psql -U postgres
          ```

    4. Criar Banco de Dados e Usuário
        * Dentro do terminal `psql`, execute os comandos:
        ```sql
        CREATE DATABASE nome_do_banco;
        CREATE USER nome_do_usuario WITH PASSWORD 'sua_senha';
        GRANT ALL PRIVILEGES ON DATABASE nome_do_banco TO nome_do_usuario;
        GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nome_do_usuario;
        GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO nome_do_usuario;
        ALTER USER nome_do_usuario CREATEDB;
        ```

Caso não queira criar um usuário, pode usar o usuário `postgres` e a senha `postgres`.
> Obs.: As vezes é necessário criar uma senha para o usuário `postgres`, entre no terminal `psql` e execute o comando `ALTER USER postgres WITH PASSWORD 'sua_senha';`.

Após fazer estes passos, volte para [Projeto](./project#2-copie-o-arquivo-envexample-para-env-e-preencha-as-informações) e continue com o passo 2.