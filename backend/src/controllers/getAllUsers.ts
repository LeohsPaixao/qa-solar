import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { formatDateTime } from '../utils/formatDate.js';

const prisma = new PrismaClient();

export async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        full_name: true,
        social_name: true,
        email: true,
        phone: true,
        document: true,
        created_at: true,
      },
    });

    if (users.length === 0) {
      res.status(404).json({ message: 'Nenhum usuário encontrado.' });
      return
    }

    const formattedUsers = users.map((user) => ({
      ...user,
      created_at: formatDateTime(user.created_at),
    }));

    res.status(200).json(formattedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
}
