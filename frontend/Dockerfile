FROM node:22.1.0-alpine

WORKDIR /app

COPY package.json yarn.lock

RUN yarn install

WORKDIR /app/frontend

COPY ./frontend/. .
