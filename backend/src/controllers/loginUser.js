import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const prisma = new PrismaClient();

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
