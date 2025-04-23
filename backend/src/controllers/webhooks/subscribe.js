import prisma from '../../services/prismaClient.js';

export const subscribe = async (req, res) => {
  const { targetUrl, event, userId } = req.body;

  if (!targetUrl || !event || !userId) {
    const missingFields = [];
    if (!targetUrl) missingFields.push('Target URL');
    if (!event) missingFields.push('evento');
    if (!userId) missingFields.push('User ID');
    return res
      .status(400)
      .json({ error: `${missingFields.join(', ')} ${missingFields.length === 1 ? 'é' : 'são'} obrigatório${missingFields.length === 1 ? '' : 's'}` });
  }

  try {
    new URL(targetUrl);
  } catch (error) {
    if (error.response?.status === 422) {
      return res.status(422).json({ error: 'URL inválida' });
    }
  }

  try {
    const existingSubscription = await prisma.webhookSubscription.findFirst({
      where: {
        targetUrl,
        event,
      },
    });

    if (existingSubscription) {
      return res.status(409).json({ message: 'Inscrição já existe' });
    }

    const newSubscription = await prisma.webhookSubscription.create({
      data: {
        targetUrl,
        event,
        userId,
      },
    });

    return res.status(201).json({ success: true, subscription: newSubscription });
  } catch (error) {
    if (error.response?.status === 500) {
      return res.status(500).json({ message: 'Erro ao criar inscrição' });
    }
  }
};
