import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { fullName, socialName, document, docType, phone, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        full_name: fullName,
        social_name: socialName,
        document,
        doc_type: docType,
        phone,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error: any) {
    if (error.code === 'P2002') {
      if (error.meta?.target?.includes('email')) {
        res.status(400).json({ message: 'E-mail já está em uso.' });
        return
      }
      if (error.meta?.target?.includes('document')) {
        res.status(400).json({ message: 'CPF ou CNPJ já está em uso.' });
        return
      }
    }

    res.status(500).json({ message: error.message || 'Erro ao tentar cadastrar o usuário.' });
  }
};
