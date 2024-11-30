import { NextFunction, Request, Response } from 'express';

export async function validateEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    res.status(400).json({ message: 'E-mail inválido ou não fornecido.' });
    return;
  }

  req.validatedEmail = email.trim().toLowerCase();

  next();
}
