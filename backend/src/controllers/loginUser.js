import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js';

dotenv.config();

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
 *                 message:
 *                   type: string
 *                   example: "Login realizado com sucesso!"
 *                 token:
 *                   type: string
 *                   example: "Bearer <seu_token_jwt>"
 *       400:
 *         description: Não foi possível realizar login com este usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Não foi possivel realizar login com este usuário."
 *       402:
 *         description: A senha não confere.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "A senha não confere."
 */
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: 'Não foi possivel realizar login com este usuário.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(402).json({ message: 'A senha não confere.' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '4h',
    });

    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
    });
  } catch (error) {
    console.clear(error);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}
