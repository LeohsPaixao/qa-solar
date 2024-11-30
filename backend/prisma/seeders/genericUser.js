import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const plainPassword = '123456';

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await prisma.user.upsert({
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

  const user = await prisma.user.findUnique({
    where: { email: 'generic@example.com' },
  });
  if (!user) {
    throw new Error('Usuário genérico não foi criado no banco de dados');
  }
}

main()
  .catch((error) => {
    throw new Error('Não foi possivel criar o usuário genérico', + error.message)
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
