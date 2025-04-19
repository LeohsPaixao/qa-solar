import prisma from '../../services/prismaClient.js';

/**
 * @swagger
 * /webhooks/unsubscribe:
 *   delete:
 *     summary: Remove uma inscrição de webhook
 *     description: Remove o registro de uma URL que recebia notificações de um evento específico
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
 *                 description: URL que recebia as notificações
 *               event:
 *                 type: string
 *                 description: Nome do evento da inscrição
 *             required:
 *               - targetUrl
 *               - event
 *     responses:
 *       200:
 *         description: Inscrição removida com sucesso
 *       404:
 *         description: Inscrição não encontrada
 *       500:
 *         description: Erro ao remover inscrição
 */
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
    console.error('Erro no unsubscribe:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};
