FROM node:22.1.0-alpine

WORKDIR /app

# Copiar apenas os arquivos necessários para instalar dependências
COPY frontend/package.json frontend/yarn.lock ./frontend/

# Instalar dependências
WORKDIR /app/frontend
RUN yarn install

# Copiar o restante do código
COPY frontend/. ./frontend/
