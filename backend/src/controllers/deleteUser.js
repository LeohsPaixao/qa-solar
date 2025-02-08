import prisma from '../prismaClient.js';

/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Exclui um ou mais usuários
 *     description: Exclui um ou mais usuários pelos IDs fornecidos.
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: IDs dos usuários a serem excluídos
 *                 example: [550, 551]
 *             required:
 *               - ids
 *     responses:
 *       200:
 *         description: Usuários excluídos com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                   example: "2 usuário(s) excluído(s) com sucesso!"
 *       400:
 *         description: Erro ao excluir o usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Erro ao excluir o usuário."
 */
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
    console.clear(error);
    return res.status(500).json({ message: 'Erro ao excluir o usuário.' });
  }
}
