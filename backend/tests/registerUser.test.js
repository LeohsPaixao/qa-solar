import { faker } from '@faker-js/faker';
import request from 'supertest';
import app from '../src/app.js';
import prisma from '../src/prismaClient.js';
import { generateValidCPF } from '../src/utils/generatedValidCPF.js';

describe('Teste de API - registerUser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Deve registrar um novo usuário', async () => {
    const novoUsuario = {
      fullName: faker.person.fullName(),
      socialName: faker.person.middleName(),
      document: generateValidCPF(),
      docType: 'CPF',
      phone: faker.phone.number({ style: 'national' }),
      email: faker.internet.email({ provider: 'qa.solar.com' }),
      password: '123456'
    };

    const response = await request(app)
      .post('/register')
      .send(novoUsuario);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Usuário cadastrado com sucesso!');
  });

  test('Deve retornar 404 para e-mail em uso', async () => {
    const novoUsuario = {
      fullName: faker.person.fullName(),
      socialName: faker.person.middleName(),
      document: generateValidCPF(),
      docType: 'CPF',
      phone: faker.phone.number({ style: 'national' }),
      email: 'generic@example.com',
      password: '123456'
    };

    const response = await request(app)
      .post('/register')
      .send(novoUsuario);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('E-mail já está em uso.');
  });

  test('Deve retornar 405 para CPF ou CNPJ em uso', async () => {
    const novoUsuario = {
      fullName: faker.person.fullName(),
      socialName: faker.person.middleName(),
      document: '591.013.230-08',
      docType: 'CPF',
      phone: faker.phone.number({ style: 'national' }),
      email: faker.internet.email({ provider: 'qa.solar.com' }),
      password: '123456'
    };

    const response = await request(app)
      .post('/register')
      .send(novoUsuario);

    expect(response.statusCode).toBe(405);
    expect(response.body.message).toBe('CPF ou CNPJ já está em uso.');
  });

  test('Deve retornar 500 quando ocorrer um erro genérico na criação do usuário', async () => {
    jest.spyOn(prisma.user, 'create').mockRejectedValue(new Error('Erro ao tentar cadastrar o usuário.'));

    const novoUsuario = {
      fullName: 'Teste',
      socialName: 'Teste Social',
      document: '12345678901',
      docType: 'CPF',
      phone: '(11) 99999-9999',
      email: 'teste500@example.com',
      password: '123456'
    };

    const response = await request(app)
      .post('/register')
      .send(novoUsuario);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Erro ao tentar cadastrar o usuário.');
  });
});