import { PrismaClient } from '@prisma/client';
import { formatDateTime } from '../utils/formatDate.js';

const prisma = new PrismaClient();

export async function getAllUsers(req, res) {
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
      return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
    }

    const formattedUsers = users.map((user) => ({
      ...user,
      created_at: formatDateTime(user.created_at),
    }));

    res.status(200).json(formattedUsers);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
}
