import { faker } from '@faker-js/faker';
import { request } from '@playwright/test';
import { generateValidCPF } from '../commands/generateValidCPF';

/**
 * Realiza o mock de criação de um usuário através de requisições HTTP.
 */
async function mockGenerateUsers(): Promise<void> {
  const apiContext = await request.newContext({
    baseURL: `${process.env.PLAY_API_URL}/register`,
  });

  const response = await apiContext.post('/register', {
    data: {
      fullName: faker.person.fullName(),
      socialName: faker.person.lastName(),
      document: generateValidCPF(),
      docType: 'cpf',
      phone: faker.phone.number({ style: 'national' }),
      email: faker.internet.email({ provider: 'example.qa.solar' }),
      password: '123456',
    },
  });

  if (!response.ok()) {
    throw new Error(`Erro ao criar usuário: ${response.status()}`);
  }
}

/**
 * Gera múltiplos usuários simulados.
 */
export async function generateUsers(): Promise<void> {
  for (let i = 0; i < 10; i++) {
    await mockGenerateUsers();
  }
}
