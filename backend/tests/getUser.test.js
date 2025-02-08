import request from 'supertest';
import app from '../src/app.js';

describe('Teste de API - getUser', () => {
  test('Deve retornar 200 para obter o usuário', async () => {
    const response = await request(app).get('/user/generic@example.com');
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe('generic@example.com');
  });

  test('Deve retornar 404 para email não encontrado', async () => {
    const response = await request(app).get('/user/usuario.inexistente@example.com');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Este email não esta cadastrado no banco de dados.');
  });
});
