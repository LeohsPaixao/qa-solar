FROM node:22.1.0-alpine

WORKDIR /app

# Primeiro, copie os arquivos necessários para instalar dependências
COPY package.json yarn.lock ./
COPY frontend/package.json ./frontend/

# Instale as dependências
RUN yarn install

# Depois copie o resto dos arquivos
COPY . .

# Configure o diretório de trabalho para a pasta frontend
WORKDIR /app/frontend
