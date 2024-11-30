import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeder...');

  const plainPassword = '123456';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  console.log('Senha criptografada:', hashedPassword);

  const upsertedUser = await prisma.user.upsert({
    where: { email: 'generic@example.com' },
    update: {},
    create: {
      full_name: 'Generic User',
      social_name: null,
      document: '591.013.230-08',
      doc_type: 'cpf',
      phone: '00000000000',
      email: 'generic@example.com',
      password: hashedPassword,
    },
  });

  console.log('Usuário criado ou atualizado:', upsertedUser);

  const user = await prisma.user.findUnique({
    where: { email: 'generic@example.com' },
  });

  if (!user) {
    console.error('Usuário genérico não foi criado no banco de dados.');
    throw new Error('Usuário genérico não foi criado no banco de dados');
  } else {
    console.log(`Usuário gerado com o email: ${user.email}`);
  }
}

main()
  .catch((error) => {
    console.error('Erro ao executar o seeder:', error.message);
  })
  .finally(async () => {
    console.log('Desconectando o Prisma...');
    await prisma.$disconnect();
  });
