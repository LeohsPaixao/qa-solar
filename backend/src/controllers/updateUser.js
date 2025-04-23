import prisma from '../services/prismaClient.js';

export async function updateUser(req, res) {
  const userId = req.userId;
  const { fullName, socialName, phone } = req.body;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        full_name: fullName,
        social_name: socialName || null,
        phone: phone || null,
        updated_at: new Date(),
      },
    });

    res.status(200).json({ message: 'Usuário alterado com sucesso.' });
  } catch (error) {
    if (error.response && error.response.status === 500) {
      return res.status(500).json({ message: 'Erro interno ao atualizar usuário.' });
    }
  }
}
