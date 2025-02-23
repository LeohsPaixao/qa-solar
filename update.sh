#!/bin/bash

echo "🚀 Atualizando containers locais..."

docker rmi qa-solar-backend:latest
docker rmi qa-solar-frontend:latest
docker-compose build
docker-compose up -d --force-recreate

echo "✅ Containers atualizados!"
