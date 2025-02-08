import request from 'supertest';
import app from '../src/app.js';
import prisma from '../src/prismaClient.js';

describe('Teste de API - getEmailUser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Deve retornar 200 para obter o email do usuário', async () => {
    const response = await request(app).post('/user/email/generic@example.com');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Um e-mail foi enviado com instruções para recuperar a senha.');
  });

  test('Deve retornar 404 para email não encontrado', async () => {
    const response = await request(app).post('/user/email/usuario.inexistente@example.com');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Este email não esta cadastrado no banco de dados.');
  });

  test('Deve retornar 550 para erro interno no servidor', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(new Error('Falha ao enviar e-mail para recuperação de senha.'));

    const response = await request(app).post('/user/email/generic@example.com');
    expect(response.statusCode).toBe(550);
    expect(response.body.message).toBe('Falha ao enviar e-mail para recuperação de senha.');
  });
});
