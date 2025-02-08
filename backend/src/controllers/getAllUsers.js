import { PrismaClient } from '@prisma/client';
import { formatDateTime } from '../utils/formatDate.js';

const prisma = new PrismaClient();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna a lista de usuários
 *     description: >
 *       Este endpoint recupera todos os usuários cadastrados no sistema.
 *       Caso não haja nenhum usuário, retorna uma mensagem informando que nenhum usuário foi encontrado.
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Lista de usuários obtida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   full_name:
 *                     type: string
 *                     example: 'João Silva'
 *                   social_name:
 *                     type: string
 *                     example: 'Joãozinho'
 *                   email:
 *                     type: string
 *                     example: 'joao.silva@example.com'
 *                   phone:
 *                     type: string
 *                     example: '+5511999999999'
 *                   document:
 *                     type: string
 *                     example: '12345678900'
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: '2023-10-25T14:48:00.000Z'
 *       404:
 *         description: Nenhum usuário encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Nenhum usuário encontrado.
 */
export async function getAllUsers(req, res) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      full_name: true,
      social_name: true,
      email: true,
      phone: true,
      document: true,
      created_at: true,
    },
  });

  if (users.length === 0) {
    return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
  }

  const formattedUsers = users.map((user) => ({
    ...user,
    created_at: formatDateTime(user.created_at),
  }));

  res.status(200).json(formattedUsers);
}
