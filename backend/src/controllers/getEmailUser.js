import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /user/email:
 *   post:
 *     summary: Envia um e-mail para o usuário com instruções para recuperar a senha
 *     description: Envia um e-mail para o usuário com instruções para recuperar a senha
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Endereço de e-mail do usuário
 *                 example: "generic@example.com"
 *     responses:
 *       200:
 *         description: E-mail enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                   example: "Um e-mail foi enviado com instruções para recuperar a senha."
 *       404:
 *         description: E-mail não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Este email não esta cadastrado no banco de dados."
 */
export async function getEmailUser(req, res) {
  const email = req.validatedEmail;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'Este email não esta cadastrado no banco de dados.' });
    }

    res.status(200).json({ message: 'Um e-mail foi enviado com instruções para recuperar a senha.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}
