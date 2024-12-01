export async function logoutUser(req, res) {
  return res.status(200).json({ message: 'O usuário deslogado com sucesso!' });
}
