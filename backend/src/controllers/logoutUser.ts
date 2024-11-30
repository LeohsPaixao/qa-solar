import { Request, Response } from 'express';

export async function logoutUser(req: Request, res: Response): Promise<void> {
  const userId = req.userId;

  res.status(200).json({ message: `Logout realizado com sucesso do usuário com o ID: ${userId}` });
}
