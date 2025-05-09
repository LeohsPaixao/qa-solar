FROM node:22.1.0-alpine

WORKDIR /app

# Copiar arquivos de configuração do monorepo
COPY package.json yarn.lock turbo.json ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/ ./packages/

# Instalar dependências
RUN yarn install

# Copiar código fonte
COPY apps/backend ./apps/backend

# Gerar Prisma Client
WORKDIR /app/apps/backend
RUN yarn prisma generate

# Expor porta
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["yarn", "dev"]
