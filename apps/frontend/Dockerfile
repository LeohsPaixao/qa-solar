FROM node:22.1.0-alpine AS base

WORKDIR /app

FROM base AS builder

RUN yarn global add turbo
COPY . .
RUN turbo prune frontend --docker

FROM base AS setter-permissions
RUN addgroup --system --gid 1001 qa-solar
RUN adduser --system --uid 1001 frontend
USER frontend

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/full/ .
RUN yarn install

FROM base AS runner
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=installer /app/apps/frontend/package.json ./apps/frontend/package.json

WORKDIR /app/apps/frontend
RUN yarn build

EXPOSE 8181

