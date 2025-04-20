import prisma from '../services/prismaClient.js';

export async function getMeUser(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      full_name: true,
      email: true,
      created_at: true,
      updated_at: true,
    },
  });

  return res.status(200).json(user);
} 