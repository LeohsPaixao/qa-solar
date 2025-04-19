import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../src/app.js';
import prisma from '../src/services/prismaClient.js';
import { generateValidCPF } from '../src/utils/generatedValidCPF.js';

describe('Teste de API - updateUser', () => {
  let createdUser;
  let token;

  beforeAll(async () => {
    const senha = 'senha123';
    const hashedPassword = await bcrypt.hash(senha, 10);
    createdUser = await prisma.user.create({
      data: {
        full_name: 'Nome de Teste',
        social_name: 'Social de Teste',
        email: 'teste-atualizacao@example.com',
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

  test('Deve atualizar os dados do usuário', async () => {
    const novoDado = {
      fullName: 'Nome Atualizado',
      socialName: 'Social Atualizado',
      phone: '(11) 88888-8888'
    };

    const response = await request(app)
      .put('/user/update')
      .set('Authorization', `Bearer ${token}`)
      .send(novoDado);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Usuário alterado com sucesso.');
  });

  test('Deve atualizar os dados do usuário sem socialName', async () => {
    const novoDado = {
      fullName: 'Nome Atualizado',
      phone: '(11) 88888-8888'
    };

    const response = await request(app)
      .put('/user/update')
      .set('Authorization', `Bearer ${token}`)
      .send(novoDado);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Usuário alterado com sucesso.');
  });

  test('Deve atualizar os dados do usuário sem phone', async () => {
    const novoDado = {
      fullName: 'Nome Atualizado',
      socialName: 'Social Atualizado'
    };

    const response = await request(app)
      .put('/user/update')
      .set('Authorization', `Bearer ${token}`)
      .send(novoDado);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Usuário alterado com sucesso.');
  });

  test('Deve retornar 500 para erro ao atualizar usuário', async () => {
    jest.spyOn(prisma.user, 'update').mockRejectedValue(new Error('Erro interno ao atualizar usuário.'));
    const novoDado = {
      fullName: 'Nome Atualizado',
      socialName: 'Social Atualizado',
      phone: '(11) 88888-8888'
    };

    const response = await request(app)
      .put('/user/update')
      .set('Authorization', `Bearer ${token}`)
      .send(novoDado);

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Erro interno ao atualizar usuário.');
  });
});