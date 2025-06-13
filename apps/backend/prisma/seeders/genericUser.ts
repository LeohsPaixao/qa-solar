import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../src/modules/prisma/prisma.service';

async function main() {
  const config = new ConfigService();
  const prisma = new PrismaService(config);
  const plainPassword = '123456';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  try {
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
  } catch (error) {
    throw new Error('Não foi possível criar o usuário genérico: ' + error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 