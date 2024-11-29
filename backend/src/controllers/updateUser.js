import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function updateUser(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { fullName, socialName, phone } = req.body;

    await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        full_name: fullName,
        social_name: socialName || null,
        phone: phone || null,
      },
    });

    res.status(200).json({ message: 'Usuário alterado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o perfil do usuário.' });
  }
}
