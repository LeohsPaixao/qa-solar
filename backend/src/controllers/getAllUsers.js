import prisma from '../services/prismaClient.js';

export async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        full_name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (users.length === 0) {
      return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
    }

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}
