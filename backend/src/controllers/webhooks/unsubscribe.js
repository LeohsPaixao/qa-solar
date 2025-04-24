import prisma from '../../services/prismaClient.js';

export const unsubscribe = async (req, res) => {
  try {
    const { targetUrl, event } = req.body;

    if (!targetUrl || !event) {
      return res.status(400).json({ error: 'targetUrl e event são obrigatórios' });
    }

    const deleted = await prisma.webhookSubscription.deleteMany({
      where: { targetUrl, event },
    });

    if (deleted.count === 0) {
      return res.status(404).json({ success: false, message: 'Inscrição não encontrada' });
    }

    return res.status(200).json({ success: true, message: 'Inscrição removida com sucesso' });
  } catch (error) {
    if (error.response?.status === 500) {
      return res.status(500).json({ message: 'Erro ao remover inscrição' });
    }
  }
};
