export async function logoutUser(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido.' });
    }

    res.status(200).json({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar logout' });
  }
}
