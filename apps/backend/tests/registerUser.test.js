import { faker } from '@faker-js/faker';
import request from 'supertest';
import app from '../src/app.js';
import prisma from '../src/services/prismaClient.js';
import { generateValidCPF } from '../src/utils/generatedValidCPF.js';

describe('Teste de API - registerUser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Deve registrar um novo usuário', async () => {
    const novoUsuario = {
      full_name: faker.person.fullName(),
      social_name: faker.person.middleName(),
      document: generateValidCPF(),
      doc_type: 'CPF',
      phone: faker.phone.number({ style: 'national' }),
      email: faker.internet.email({ provider: 'qa.solar.com' }),
      password: '123456'
    };

    const response = await request(app)
      .post('/users/register')
      .send(novoUsuario);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Usuário cadastrado com sucesso!');
  });

  test('Deve retornar 404 para e-mail em uso', async () => {
    const novoUsuario = {
      full_name: faker.person.fullName(),
      social_name: faker.person.middleName(),
      document: generateValidCPF(),
      doc_type: 'CPF',
      phone: faker.phone.number({ style: 'national' }),
      email: 'generic@example.com',
      password: '123456'
    };

    const response = await request(app)
      .post('/users/register')
      .send(novoUsuario);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('E-mail já está em uso.');
  });

  test('Deve retornar 405 para CPF ou CNPJ em uso', async () => {
    const novoUsuario = {
      full_name: faker.person.fullName(),
      social_name: faker.person.middleName(),
      document: '591.013.230-08',
      doc_type: 'CPF',
      phone: faker.phone.number({ style: 'national' }),
      email: faker.internet.email({ provider: 'qa.solar.com' }),
      password: '123456'
    };

    const response = await request(app)
      .post('/users/register')
      .send(novoUsuario);

    expect(response.statusCode).toBe(405);
    expect(response.body.message).toBe('CPF ou CNPJ já está em uso.');
  });

  test('Deve retornar 500 quando ocorrer um erro genérico na criação do usuário', async () => {
    jest.spyOn(prisma.user, 'create').mockRejectedValue(new Error('Erro interno no servidor.'));

    const cpf = faker.number.int({ min: 10000000000, max: 99999999999 });
    const email = faker.internet.email({ provider: 'qa.solar.com' });

    const novoUsuario = {
      full_name: 'Teste',
      social_name: 'Teste Social',
      document: cpf.toString(),
      doc_type: 'CPF',
      phone: '(11) 99999-9999',
      email,
      password: '123456'
    };

    const response = await request(app)
      .post('/users/register')
      .send(novoUsuario);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Erro interno no servidor.');
  });
});