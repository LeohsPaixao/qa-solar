import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.ts';

const prisma = new PrismaClient();

export async function loginUser(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    res.status(400).json({ message: 'Não foi possivel realizar login com este usuário.' });
    return
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(400).json({ message: 'A senha não confere.' });
    return
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '4h',
  });

  res.status(200).json({ message: 'Login realizado com sucesso!', token });
}
