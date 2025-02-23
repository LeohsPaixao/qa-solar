#!/bin/bash

echo "🚀 Atualizando containers locais..."

docker rmi qa-solar-backend
docker rmi qa-solar-frontend
docker-compose build
docker-compose up -d --force-recreate

echo "✅ Containers atualizados!"
