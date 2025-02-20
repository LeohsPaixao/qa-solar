FROM node:22.1.0-alpine

WORKDIR /app

RUN npm install -g yarn

COPY . .

RUN yarn install

RUN ["yarn", "api"]

EXPOSE 3001

CMD ["yarn", "api"]