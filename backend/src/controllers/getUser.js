import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /user/{email}:
 *   get:
 *     summary: Retorna um usuário pelo email
 *     description: >
 *       Este endpoint recupera um usuário específico com base no email fornecido via path parameter.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Email do usuário a ser recuperado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário recuperado com sucesso
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
 *                   example: 'João Silva'
 *                 social_name:
 *                   type: string
 *                   example: 'Joãozinho'
 *                 document:
 *                   type: string
 *                   example: '123.456.789-00'
 *                 email:
 *                   type: string
 *                   example: 'joao.silva@example.com'
 *                 phone:
 *                   type: string
 *                   example: '(11) 99999-9999'
 *       404:
 *         description: Email não encontrado
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
