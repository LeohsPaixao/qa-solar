FROM node:22.1.0-alpine

WORKDIR /app

COPY package.json yarn.lock

RUN yarn install

WORKDIR /app/backend

COPY backend/. .

RUN yarn prisma generate
