export async function logoutUser(req, res) {
  const userId = req.userId;

  res.status(200).json({ message: `Logout realizado com sucesso do usuário com o ID: ${userId}` });
}
