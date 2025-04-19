import prisma from '../../services/prismaClient.js';

/**
 * @swagger
 * /webhooks/subscribe:
 *   post:
 *     summary: Inscreve um webhook para um evento específico
 *     description: Registra uma URL para receber notificações quando um evento específico ocorrer
 *     tags:
 *       - Webhooks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetUrl:
 *                 type: string
 *                 description: URL que receberá as notificações
 *               event:
 *                 type: string
 *                 description: Nome do evento para se inscrever
 *             required:
 *               - targetUrl
 *               - event
 *     responses:
 *       201:
 *         description: Inscrição criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: URL inválida
 *       402:
 *         description: Inscrição já existe
 *       500:
 *         description: Erro ao criar inscrição
 */
export const subscribe = async (req, res) => {
  const { targetUrl, event } = req.body;

  if (!targetUrl || !event) {
    return res.status(400).json({ error: 'Target URL e evento são obrigatórios' });
  }

  try {
    new URL(targetUrl);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }

  try {
    const existingSubscription = await prisma.webhookSubscription.findFirst({
      where: {
        targetUrl,
        event,
      },
    });

    if (existingSubscription) {
      return res.status(402).json({ success: false, message: 'Inscrição já existe' });
    }

    const newSubscription = await prisma.webhookSubscription.create({
      data: {
        targetUrl,
        event,
        userId: req.user?.id || 1,
      },
    });

    return res.status(201).json({ success: true, subscription: newSubscription });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
