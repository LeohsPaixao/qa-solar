import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function updateUser(req, res) {
  const userId = req.userId;
  const { fullName, socialName, phone } = req.body;

  await prisma.user.update({
    where: { id: userId },
    data: {
      full_name: fullName,
      social_name: socialName || null,
      phone: phone || null,
    },
  });

  res.status(200).json({ message: 'Usuário alterado com sucesso.' });
}
