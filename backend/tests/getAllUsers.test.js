import request from 'supertest';
import app from '../src/app.js';
import prisma from '../src/prismaClient.js';

describe('Teste de API - getAllUsers', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Deve retornar 200 para obter todos os usuários', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
  });

  test('Deve retornar 404 para nenhum usuário encontrado', async () => {
    jest.spyOn(prisma.user, 'findMany').mockResolvedValue([]);

    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Nenhum usuário encontrado.');
  });
});
