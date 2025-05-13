
export async function getMeApiKey(req, res) {
  try {
    const user = req.user;

    const token = res.getHeader('Authorization');

    return res.json({
      message: 'Autenticação via API Key bem-sucedida',
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email
      },
      token: token
    });

  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
}