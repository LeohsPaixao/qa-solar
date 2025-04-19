import axios from 'axios';
import bcrypt from 'bcryptjs';
import prisma from '../services/prismaClient.js';
import { findSubscriptionsByEvent } from '../services/subscriptionService.js';

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Cadastra um novo usuário
 *     description: >
 *       Cadastra um novo usuário com base nos dados fornecidos.
 *       Em caso de conflito, serão retornados status específicos:
 *       404 para e-mail em uso e 405 para CPF ou CNPJ em uso.
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
 *         description: Usuário cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário cadastrado com sucesso!"
 *       500:
 *         description: Erro genérico ao cadastrar o usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao tentar cadastrar o usuário."
 *       404:
 *         description: E-mail já está em uso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "E-mail já está em uso."
 *       405:
 *         description: CPF ou CNPJ já está em uso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "CPF ou CNPJ já está em uso."
 */
export const registerUser = async (req, res) => {
  const { fullName, socialName, document, docType, phone, email, password } = req.body;
  let user;

  try {
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

    user = await prisma.user.create({
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

    const subscriptions = await findSubscriptionsByEvent('user.created');

    for (const subscription of subscriptions) {
      await axios.post(subscription.targetUrl, {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        createdAt: user.created_at,
        event: 'user.created',
      });
    }

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Erro ao tentar cadastrar o usuário.' });
  }
};
