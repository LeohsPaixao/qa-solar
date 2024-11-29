export async function logoutUser(req, res) {
  try {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token);

    // Opcional: Salve o token numa blacklist (ou apenas apague do frontend para casos simples)
    // await prisma.tokenBlacklist.create({ data: { token } });

    res.status(200).json({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    res.status(500).json({ message: 'Erro ao processar logout' });
  }
}
