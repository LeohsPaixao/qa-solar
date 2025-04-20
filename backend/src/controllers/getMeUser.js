import prisma from '../services/prismaClient.js';

export async function getMeUser(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        full_name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: `Usuário com o ID: ${req.userId} não encontrado.` });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
} 