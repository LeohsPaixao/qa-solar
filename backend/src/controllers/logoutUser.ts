import { Request, Response } from 'express';

export async function logoutUser(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.userId;

    res.status(200).json({ message: `Logout realizado com sucesso do usuário com o ID: ${userId}` });
  } catch (error) {
    res.status(500).json({ message: `Erro ao processar o logout do usuário` });
  }
}
