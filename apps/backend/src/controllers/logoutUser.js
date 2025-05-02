export async function logoutUser(req, res) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token não fornecido.' });
  }

  if (token === 'forçar-erro') {
    return res.status(500).json({ message: 'Erro ao deslogar o usuário.' });
  }

  return res.status(200).json({ message: 'O usuário foi deslogado com sucesso!' });
}
