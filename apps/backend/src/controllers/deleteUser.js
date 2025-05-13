import prisma from '../services/prismaClient.js';

export async function deleteUser(req, res) {
  const { ids } = req.body;

  if (ids.includes(req.userId)) {
    res.status(400).json({ message: 'Você não pode excluir o usuário logado.' });
    return;
  }

  try {
    const deletedUsers = await prisma.user.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    if (deletedUsers.count === 0 || deletedUsers.count === undefined || deletedUsers.count === null) {
      return res.status(404).json({ message: 'Nenhum usuário encontrado para excluir.' });
    }

    return res.status(200).json({ message: `${deletedUsers.count} usuário(s) excluído(s) com sucesso!` });
  } catch (error) {
    if (error.response?.status === 500) {
      return res.status(500).json({ message: 'Erro ao excluir o usuário.' });
    }
  }
}
