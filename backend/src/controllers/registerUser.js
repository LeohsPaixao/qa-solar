import axios from 'axios';
import bcrypt from 'bcryptjs';
import prisma from '../services/prismaClient.js';
import { findSubscriptionsByEvent } from '../services/subscriptionService.js';

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

    const user = await prisma.user.create({
      data: {
        full_name,
        social_name,
        document,
        doc_type,
        phone,
        email,
        password: hashedPassword,
      },
    });

    const subscriptions = await findSubscriptionsByEvent('user.created');

    if (process.env.ZAPIER_WEBHOOK_HABILITADO === 'true') {
      for (const subscription of subscriptions) {
        try {
          await axios.post(subscription.targetUrl, {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          created_at: user.created_at,
          event: 'user.created',
        });
      } catch (error) {
          throw new Error(`Erro ao enviar evento para ${subscription.targetUrl}: ${error.message}`);
        }
      }
    }

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    if (error.response?.status === 500) {
      return res.status(500).json({ message: 'Erro interno no servidor.' });
    }
  }
}
