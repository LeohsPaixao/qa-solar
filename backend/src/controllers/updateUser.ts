import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function updateUser(req: Request, res: Response) {
  const userId = req.userId;
  const { fullName, socialName, phone } = req.body;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        full_name: fullName,
        social_name: socialName || null,
        phone: phone || null,
      },
    });

    res.status(200).json({ message: 'Usuário alterado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o perfil do usuário.' });
  }
}
