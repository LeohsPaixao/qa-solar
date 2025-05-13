import jwt from 'jsonwebtoken';
import prisma from '../services/prismaClient.js';

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(402).json({ message: 'Token mal formatado.' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(402).json({ message: 'Token mal formatado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId || typeof decoded.userId !== 'number') {
      return res.status(403).json({ message: 'Token inválido: ID do usuário ausente ou inválido.' });
    }

    req.userId = decoded.userId;

    prisma.user
      .findUnique({ where: { id: req.userId } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: `Usuário com o ID: ${req.userId} não encontrado.` });
        }
        next();
      })
      .catch(() => {
        res.status(500).json({ message: 'Erro ao autenticar o usuário.' });
      });
  } catch (error) {
    console.error(error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(405).json({ message: 'Token expirado.' });
    }
    return res.status(403).json({ message: 'Token inválido.' });
  }
}
