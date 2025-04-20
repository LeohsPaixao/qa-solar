import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import prisma from '../services/prismaClient.js';

dotenv.config();

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
    console.error(error.message);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}
