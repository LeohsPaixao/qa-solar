import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId || typeof decoded.userId !== 'number') {
      return res.status(400).json({ message: 'Token inválido: ID do usuário ausente ou inválido.' });
    }

    req.userId = decoded.userId;

    prisma.user
      .findUnique({ where: { id: req.userId } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        next();
      })
      .catch(() => {
        res.status(500).json({ message: 'Erro interno no servidor.' });
      });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado.' });
    }
    return res.status(403).json({ message: 'Token inválido.' });
  }
}
