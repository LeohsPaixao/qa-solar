export async function logoutUser(req, res) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token não fornecido.' });
  }

  return res.status(200).json({ message: 'O usuário foi deslogado com sucesso!' });
}
