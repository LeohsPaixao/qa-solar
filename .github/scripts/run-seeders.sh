#!/bin/bash

echo "Navegando para o diretório backend..."
cd backend || { echo "Falha ao acessar o diretório backend"; exit 1; }

echo "Executando migrações do Prisma..."
yarn prisma migrate dev

echo "Executando seeder: genericUser..."
yarn ts-node prisma/seeders/genericUser.js

echo "Executando seeder: generateUserFake..."
yarn ts-node prisma/seeders/generateUserFake.js

# Caso adicione mais seeders, inclua os comandos aqui
echo "Seeders executados com sucesso!"
