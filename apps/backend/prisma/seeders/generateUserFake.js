import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const plainPassword = '123456';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

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

}

main()
  .catch((error) => {
    throw new Error('Não foi possível criar os usuários: ' + error.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
