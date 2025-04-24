/**
 * @swagger
 * tags:
 *   - name: Webhooks
 *     description: Endpoints para gerenciamento de inscrições em webhooks
 */

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
 *                 example: https://api.exemplo.com/webhook
 *               event:
 *                 type: string
 *                 description: Nome do evento para se inscrever
 *                 example: status_update
 *             required:
 *               - targetUrl
 *               - event
 *     responses:
 *       201:
 *         description: Inscrição criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 subscription:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     targetUrl:
 *                       type: string
 *                     event:
 *                       type: string
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Target URL e evento são obrigatórios
 *       422:
 *         description: URL inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: URL inválida
 *       409:
 *         description: Inscrição já existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Inscrição já existe
 *       500:
 *         description: Erro ao criar inscrição
 */

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
 *                 example: https://api.exemplo.com/webhook
 *               event:
 *                 type: string
 *                 description: Nome do evento da inscrição
 *                 example: status_update
 *             required:
 *               - targetUrl
 *               - event
 *     responses:
 *       200:
 *         description: Inscrição removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Inscrição removida com sucesso
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: targetUrl e event são obrigatórios
 *       404:
 *         description: Inscrição não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Inscrição não encontrada
 *       500:
 *         description: Erro ao remover inscrição
 */
