import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../src/app.js';
import prisma from '../src/services/prismaClient.js';
import { generateValidCPF } from '../src/utils/generatedValidCPF.js';

describe('Teste de API - deleteUser', () => {
  let createdUser;
  let token;
  let idUserLogged;
  beforeAll(async () => {
    const senha = 'senha123';
    const hashedPassword = await bcrypt.hash(senha, 10);
    createdUser = await prisma.user.create({
      data: {
        full_name: faker.person.fullName(),
        social_name: faker.person.middleName(),
        email: faker.internet.email(),
        password: hashedPassword,
        document: generateValidCPF(),
        doc_type: 'CPF',
        phone: faker.phone.number({ style: 'national' })
      }
    });
  });

  beforeEach(async () => {
    const credenciais = {
      email: 'generic@example.com',
      password: '123456'
    };

    const userLogged = await request(app)
      .post('/auth/login')
      .send(credenciais);

    token = userLogged.body.token;
    idUserLogged = jwt.verify(token, process.env.JWT_SECRET).userId;
  });

  test('Deve excluir o usuário com sucesso', async () => {
    const response = await request(app)
      .delete('/users/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ ids: [createdUser.id] });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(`1 usuário(s) excluído(s) com sucesso!`);
  });

  test('Deve retornar 500 para erro ao deletar usuário', async () => {
    jest.spyOn(prisma.user, 'deleteMany').mockRejectedValue(new Error('Erro ao excluir o usuário.'));

    const response = await request(app)
      .delete('/users/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ ids: [createdUser.id] });

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Erro ao excluir o usuário.');
  });

  test('Deve retornar 404 para usuário não encontrado', async () => {
    jest.spyOn(prisma.user, 'deleteMany').mockResolvedValue({ count: 0 });

    const response = await request(app)
      .delete('/users/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ ids: [createdUser.id] });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Nenhum usuário encontrado para excluir.');
  });

  test('Deve retornar 400 para exclusão de usuário logado', async () => {
    const response = await request(app)
      .delete('/users/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ ids: [idUserLogged] });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Você não pode excluir o usuário logado.');
  });
});
