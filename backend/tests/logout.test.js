import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../src/app.js';
import prisma from '../src/prismaClient.js';

describe('Teste de API - logoutUser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Deve retornar 200 para deslogar o usuário', async () => {
    const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET);

    const response = await request(app).post('/logout').send({ token });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('O usuário foi deslogado com sucesso!');
  });

  test('Deve retornar 400 para token não fornecido', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

    const response = await request(app).post('/logout');
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Token não fornecido.');
  });

  test('Deve retornar 500 para erro ao deslogar o usuário', async () => {
    const response = await request(app).post('/logout').send({ token: 'forçar-erro' });
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Erro ao deslogar o usuário.');
  });
});
