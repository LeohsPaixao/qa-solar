#!/bin/bash

echo "🚀 Atualizando containers locais..."

docker rmi backend
docker rmi frontend
docker-compose build
docker-compose up -d --force-recreate

echo "✅ Containers atualizados!"
