import bcrypt from 'bcryptjs';
import prisma from '../services/prismaClient.js';
import { generateApiKey } from '../utils/generateApiKey.js';

export async function registerUser(req, res) {
  try {
    const { full_name, social_name, document, doc_type, phone, email, password } = req.body;

    const existingDocument = await prisma.user.findUnique({
      where: { document },
    });

    if (existingDocument) {
      return res.status(405).json({ message: 'CPF ou CNPJ já está em uso.' });
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return res.status(404).json({ message: 'E-mail já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const apiKey = generateApiKey();

    await prisma.user.create({
      data: {
        full_name,
        social_name,
        document,
        doc_type,
        phone,
        email,
        password: hashedPassword,
        api_key: apiKey,
      },
    });

    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
    });
  } catch (error) {
    if (error.response?.status === 500) {
      return res.status(500).json({ message: 'Erro interno no servidor.' });
    }
  }
}
