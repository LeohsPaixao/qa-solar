import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();


export async function getUser(req: Request, res: Response): Promise<void> {
  const email = req.validatedEmail;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        full_name: true,
        social_name: true,
        document: true,
        email: true,
        phone: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: 'Este email não esta cadastrado no banco de dados.' });
      return
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
}
