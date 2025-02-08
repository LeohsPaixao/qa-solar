import request from 'supertest';
import app from '../src/app.js';

describe('Teste de API - loginUser', () => {
  test('Deve autenticar o usuário e retornar o token JWT', async () => {
    const credenciais = {
      email: 'generic@example.com',
      password: '123456'
    };

    const response = await request(app)
      .post('/login')
      .send(credenciais);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.message).toBe('Login realizado com sucesso!');
  });

  test('Deve retornar 400 para credenciais inválidas', async () => {
    const credenciais = {
      email: 'usuario.inexistente@example.com',
      senha: 'senha_invalida'
    };

    const response = await request(app)
      .post('/login')
      .send(credenciais);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Não foi possivel realizar login com este usuário.');
  });

  test('Deve retornar 402 para senha inválida', async () => {
    const credenciais = {
      email: 'generic@example.com',
      password: '1234567'
    };

    const response = await request(app)
      .post('/login')
      .send(credenciais);

    expect(response.statusCode).toBe(402);
    expect(response.body.message).toBe('A senha não confere.');
  });
});