import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Atualiza os dados do usuário autenticado
 *     description: Atualiza os dados do usuário com base nos dados fornecidos
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
 *               fullName:
 *                 type: string
 *                 description: Nome completo do usuário
 *                 example: "João da Silva"
 *               socialName:
 *                 type: string
 *                 description: Nome social do usuário
 *                 example: "João"
 *               phone:
 *                 type: string
 *                 description: Telefone do usuário
 *                 example: "(11) 99999-9999"
 *             required:
 *               - fullName
 *               - socialName
 *               - phone
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                   example: "Usuário atualizado com sucesso!"
 *       400:
 *         description: Erro ao atualizar o usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Erro ao atualizar o usuário."
 */
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
