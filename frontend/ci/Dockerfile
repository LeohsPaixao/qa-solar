FROM node:22.1.0-alpine

WORKDIR /app

RUN npm install -g yarn

COPY . .

RUN yarn install

RUN ["yarn", "serve"]

EXPOSE 8181

CMD ["yarn", "serve"]
