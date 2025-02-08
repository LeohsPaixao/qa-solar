import prisma from '../prismaClient.js';

/**
 * @swagger
 * /user/{email}:
 *   get:
 *     summary: Retorna um usuário pelo email
 *     description: >
 *       Este endpoint recupera um usuário específico baseado no email fornecido como parâmetro na URL.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Email do usuário a ser recuperado. Certifique-se de que o email está correto.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário recuperado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 full_name:
 *                   type: string
 *                   example: "João Silva"
 *                 social_name:
 *                   type: string
 *                   example: "Joãozinho"
 *                 document:
 *                   type: string
 *                   example: "123.456.789-00"
 *                 email:
 *                   type: string
 *                   example: "joao.silva@example.com"
 *                 phone:
 *                   type: string
 *                   example: "(11) 99999-9999"
 *       404:
 *         description: Email não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: >
 *                     Este erro ocorre quando o email informado não corresponde a nenhum usuário cadastrado no sistema.
 *                     Isso pode acontecer se o email estiver digitado incorretamente ou se o usuário ainda não tiver sido registrado.
 *                   example: "Este email não está cadastrado no banco de dados."
 */
export async function getUser(req, res) {
  const email = req.validatedEmail;

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
}
