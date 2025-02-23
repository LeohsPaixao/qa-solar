FROM node:22.1.0-alpine

WORKDIR /app

COPY package.json yarn.lock ./

COPY backend ./backend

RUN yarn install && yarn global add prisma

WORKDIR /app/backend

RUN yarn prisma generate
