import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.ts';

const prisma = new PrismaClient();

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    if (!decoded.userId || typeof decoded.userId !== 'number') {
      res.status(400).json({ message: 'Token inválido: ID do usuário ausente ou inválido.' });
      return;
    }

    req.userId = decoded.userId;

    const user = await prisma.user.findUnique({ where: { id: req.userId } });

    if (!user) {
      res.status(404).json({ message: `Usuário com o ID: ${req.userId} não encontrado.` });
      return;
    }

    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Token expirado.' });
    } else {
      res.status(403).json({ message: 'Token inválido.' });
    }
  }
}
