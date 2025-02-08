import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Cadastra um novo usuário
 *     description: Cadastra um novo usuário com base nos dados fornecidos
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Nome completo do usuário
 *                 example: "João da Silva"
 *               socialName:
 *                 type: string
 *                 description: Nome social do usuário
 *                 example: "João"
 *               document:
 *                 type: string
 *                 description: Documento do usuário (CPF ou CNPJ)
 *                 example: "1234567890"
 *               docType:
 *                 type: string
 *                 description: Tipo de documento do usuário (CPF ou CNPJ)
 *                 example: "CPF"
 *               phone:
 *                 type: string
 *                 description: Telefone do usuário
 *                 example: "(11) 99999-9999"
 *               email:
 *                 type: string
 *                 description: Endereço de e-mail do usuário
 *                 example: "generic@example.com"
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: "123456"
 *             required:
 *               - fullName
 *               - socialName
 *               - document
 *               - docType
 *               - phone
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                   example: "Usuário cadastrado com sucesso!"
 *       400:
 *         description: Erro ao cadastrar o usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Erro ao cadastrar o usuário."
 */
export const registerUser = async (req, res) => {
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
  } catch (error) {
    if (error.code === 'P2002') {
      if (error.meta?.target?.includes('email')) {
        return res.status(400).json({ message: 'E-mail já está em uso.' });
      }
      if (error.meta?.target?.includes('document')) {
        return res.status(400).json({ message: 'CPF ou CNPJ já está em uso.' });
      }
    }

    res.status(500).json({ message: error.message || 'Erro ao tentar cadastrar o usuário.' });
  }
};
