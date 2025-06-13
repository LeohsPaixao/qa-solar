import { faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../src/modules/prisma/prisma.service';

async function main() {
  const config = new ConfigService();
  const prisma = new PrismaService(config);
  const plainPassword = '123456';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  try {
    const users = Array.from({ length: 10 }).map(() => ({
      full_name: faker.person.fullName(),
      social_name: faker.person.middleName(),
      document: faker.helpers.replaceSymbols('###.###.###-##'),
      doc_type: 'cpf',
      phone: faker.phone.number({ style: 'national' }),
      email: faker.internet.email({ provider: 'example.qa.solar' }),
      password: hashedPassword,
    }));

    for (const user of users) {
      await prisma.user.create({
        data: user,
      });
    }
  } catch (error) {
    throw new Error('Não foi possível criar os usuários: ' + error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 