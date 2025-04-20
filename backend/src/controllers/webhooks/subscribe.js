import prisma from '../../services/prismaClient.js';

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
      return res.status(402).json({ message: 'Inscrição já existe' });
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
    console.error(error.message);
    return res.status(500).json({ message: 'Erro ao criar inscrição' });
  }
};
