import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const prisma = new PrismaClient();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login do usuário
 *     description: >
 *       Efetua o login do usuário e retorna um token JWT que deverá ser utilizado para autenticar as requisições em endpoints protegidos.
 *       O token deve ser enviado no header Authorization com o prefixo "Bearer".
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       description: Credenciais do usuário para login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário.
 *                 example: "generic@example.com"
 *               password:
 *                 type: string
 *                 description: Senha do usuário.
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login efetuado com sucesso e token JWT gerado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "Bearer <seu_token_jwt>"
 *       401:
 *         description: Credenciais inválidas.
 */
export async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({ message: 'Não foi possivel realizar login com este usuário.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'A senha não confere.' });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '4h',
  });

  res.status(200).json({
    message: 'Login realizado com sucesso!',
    token,
  });
}
