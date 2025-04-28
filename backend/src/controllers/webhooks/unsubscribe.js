import prisma from '../../services/prismaClient.js';

export const unsubscribe = async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    console.log('Recebendo requisição de unsubscribe:', { subscriptionId });

    if (!subscriptionId) {
      console.log('SubscriptionId não fornecido');
      return res.status(400).json({
        error: 'subscriptionId é obrigatório',
        details: { subscriptionId }
      });
    }

    const subscription = await prisma.webhookSubscription.findUnique({
      where: { id: subscriptionId }
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Inscrição não encontrada',
        details: { subscriptionId }
      });
    }

    await prisma.webhookSubscription.delete({
      where: { id: subscriptionId }
    });

    return res.status(200).json({
      success: true,
      message: 'Inscrição removida com sucesso',
      subscriptionId
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao remover inscrição',
      error: error.message
    });
  }
};
