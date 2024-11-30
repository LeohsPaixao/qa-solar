import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function getEmailUser(req: Request, res: Response): Promise<void> {
  const email = req.validatedEmail;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    res.status(404).json({ message: 'Este email não esta cadastrado no banco de dados.' });
    return
  }

  res.status(200).json({ message: 'Um e-mail foi enviado com instruções para recuperar a senha.' });
}
