FROM node:22.19.0-alpine AS base

FROM base AS builder
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune backend --docker

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/full/ .
RUN yarn install --frozen-lockfile

FROM base AS runner
WORKDIR /app
COPY --from=installer /app/ .

# Generate Prisma Client
WORKDIR /app/apps/backend
RUN yarn prisma generate

# Expose port
EXPOSE 3001
