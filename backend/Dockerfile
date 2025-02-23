FROM node:22.1.0-alpine

WORKDIR /app

COPY package.json yarn.lock ./  
COPY backend/package.json ./backend/  

RUN yarn install && yarn global add prisma

COPY . .

WORKDIR /app/backend

RUN yarn prisma generate
