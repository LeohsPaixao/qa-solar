import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const plainPassword = '123456';

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const genericUser = await prisma.user.upsert({
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

  console.log(genericUser.created_at ? genericUser : 'Usuário já existe');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
