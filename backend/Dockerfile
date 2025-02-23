FROM node:22.1.0-alpine

WORKDIR /app

# Copiar apenas os arquivos necessários para instalar dependências
COPY backend/package.json backend/yarn.lock ./backend/

# Instalar dependências
WORKDIR /app/backend
RUN yarn install

# Copiar o restante do código
COPY backend/. ./backend/

# Gerar o Prisma Client
RUN yarn prisma generate
