FROM node:22.1.0-alpine

WORKDIR /app

COPY package.json yarn.lock
COPY frontend/package.json ./frontend/

RUN yarn install

WORKDIR /app/frontend