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
      .json({
        success: false,
        error: `${missingFields.join(', ')} ${missingFields.length === 1 ? 'é' : 'são'} obrigatório${missingFields.length === 1 ? '' : 's'}`
      });
  }

  try {
    new URL(targetUrl);
  } catch (error) {
    return res.status(422).json({
      success: false,
      message: 'URL inválida',
      error: error.message
    });
  }

  try {
    const existingSubscription = await prisma.webhookSubscription.findFirst({
      where: {
        targetUrl,
        event,
        userId
      },
    });

    if (existingSubscription) {
      return res.status(409).json({
        success: false,
        message: 'Inscrição já existe',
        subscriptionId: existingSubscription.id
      });
    }

    const newSubscription = await prisma.webhookSubscription.create({
      data: {
        targetUrl,
        event,
        userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Inscrição criada com sucesso',
      subscription: newSubscription
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao criar inscrição',
      error: error.message
    });
  }
};
