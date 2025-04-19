import prisma from '../services/prismaClient.js';

/**
 * @swagger
 * /user/email/{email}:
 *   post:
 *     summary: Envia um e-mail para o usuário com instruções para recuperar a senha
 *     description: >
 *       Este endpoint envia um e-mail para o usuário com as instruções necessárias para a recuperação de senha.
 *       Caso o e-mail informado não esteja cadastrado no sistema, será retornado um erro 404.
 *       Se ocorrer algum problema no envio do e-mail, por exemplo, uma falha na conexão com o servidor de e-mail,
 *       será retornado o erro 550.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Email do usuário para o qual o e-mail de recuperação de senha deve ser enviado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: E-mail enviado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem confirmando o envio do e-mail.
 *                   example: "Um e-mail foi enviado com instruções para recuperar a senha."
 *       404:
 *         description: E-mail não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: >
 *                     Este erro ocorre quando o e-mail informado não está cadastrado no sistema.
 *                     Verifique se o email foi digitado corretamente ou se o usuário está registrado.
 *                   example: "Este email não esta cadastrado no banco de dados."
 *       550:
 *         description: Falha ao enviar o e-mail para recuperação de senha.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: >
 *                     Este erro ocorre quando há uma falha no serviço de envio do e-mail, possivelmente devido a problemas
 *                     de configuração ou indisponibilidade do servidor de e-mail.
 *                   example: "Falha ao enviar e-mail para recuperação de senha."
 */
export async function getEmailUser(req, res) {
  const email = req.validatedEmail;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'Este email não esta cadastrado no banco de dados.' });
    }

    res.status(200).json({ message: 'Um e-mail foi enviado com instruções para recuperar a senha.' });
  } catch (error) {
    console.clear(error);
    return res.status(550).json({ message: 'Falha ao enviar e-mail para recuperação de senha.' });
  }
}
