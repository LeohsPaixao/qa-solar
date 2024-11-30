import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUser(req, res) {
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
      return res.status(404).json({ message: 'Este email não esta cadastrado no banco de dados.' });
    }

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
}
