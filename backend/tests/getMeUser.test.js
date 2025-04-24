import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../src/app.js';
import prisma from '../src/services/prismaClient.js';
import { generateValidCPF } from '../src/utils/generatedValidCPF.js';

describe('Teste de API - getMeUser', () => {
  let createdUser;
  let token;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeAll(async () => {
    const senha = 'senha123';
    const hashedPassword = await bcrypt.hash(senha, 10);
    createdUser = await prisma.user.create({
      data: {
        full_name: 'Nome de Teste',
        social_name: 'Social de Teste',
        email: 'teste-dados-usuario@example.com',
        password: hashedPassword,
        document: generateValidCPF(),
        doc_type: 'CPF',
        phone: '(11) 99999-9999'
      }
    });

    token = jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    if (createdUser && createdUser.id) {
      await prisma.user.delete({
        where: { id: createdUser.id }
      });
    }
  });

  test('Deve retornar 200 para obter o usuário', async () => {
    const response = await request(app).get('/users/me').set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe('teste-dados-usuario@example.com');
  });

  test('Deve retornar 404 para usuário não encontrado', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

    const response = await request(app).get('/users/me').set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe(`Usuário com o ID: ${createdUser.id} não encontrado.`);
  });

  test('Deve retornar 500 para erro interno no servidor', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(new Error('Erro ao autenticar o usuário.'));

    const response = await request(app).get('/users/me').set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Erro ao autenticar o usuário.');
  });
});