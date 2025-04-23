import prisma from '../services/prismaClient.js';

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
    if (error.response && error.response.status === 500) {
      return res.status(500).json({ message: 'Falha ao enviar e-mail para recuperação de senha.' });
    }
  }
}
