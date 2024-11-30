import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getEmailUser(req, res) {
  const email = req.validatedEmail;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json({ message: 'Um e-mail foi enviado com instruções para recuperar a senha.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}
