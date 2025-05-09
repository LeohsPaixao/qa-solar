FROM node:22.1.0-alpine

WORKDIR /app

# Copiar arquivos de configuração do monorepo
COPY package.json yarn.lock turbo.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/ ./packages/

# Instalar dependências
RUN yarn install

# Copiar código fonte
COPY apps/frontend ./apps/frontend

# Construir a aplicação
WORKDIR /app/apps/frontend
RUN yarn build

# Expor porta
EXPOSE 8181

# Comando para iniciar a aplicação
CMD ["yarn", "dev"]
