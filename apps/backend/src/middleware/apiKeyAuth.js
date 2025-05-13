import jwt from 'jsonwebtoken';
import prisma from '../services/prismaClient.js';

export async function apiKeyAuth(req, res, next) {
  try {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;

    if (!apiKey) {
      return res.status(401).json({ message: 'API Key não fornecida' });
    }

    const user = await prisma.user.findUnique({
      where: { api_key: apiKey },
      select: {
        id: true,
        full_name: true,
        email: true,
        api_key: true
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'API Key inválida' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        full_name: user.full_name
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.setHeader('Authorization', `Bearer ${token}`);

    req.user = user;
    next();

  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
} 