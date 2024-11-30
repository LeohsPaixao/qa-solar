#!/bin/bash

echo "Executando migrações do Prisma..."
yarn prisma migrate dev

echo "Executando seeder: genericUser..."
yarn ts-node prisma/seeders/genericUser.js

echo "Executando seeder: generateUserFake..."
yarn ts-node prisma/seeders/generateUserFake.js

# Caso tenha outros seeders, adicione-os aqui
echo "Seeders executados com sucesso!"
