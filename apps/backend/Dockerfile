FROM node:22.1.0-alpine AS base

FROM base AS builder
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune backend --docker

FROM base AS setter-permissions
RUN addgroup --system --gid 1001 qa-solar
RUN adduser --system --uid 1001 backend
USER backend

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/full/ .
RUN yarn install

FROM base AS runner
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=installer /app/apps/backend/package.json ./apps/backend/package.json

# Generate Prisma Client
WORKDIR /app/apps/backend
RUN yarn prisma generate

# Expose port
EXPOSE 3001
