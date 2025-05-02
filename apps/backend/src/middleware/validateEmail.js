export function validateEmail(req, res, next) {
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({ message: 'E-mail é obrigatório.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'E-mail inválido.' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail.length > 254) {
    return res.status(400).json({ message: 'E-mail excede o limite de tamanho permitido.' });
  }

  const blockedDomains = ['tempmail.com', '10minutemail.com'];
  const domain = normalizedEmail.split('@')[1];
  if (blockedDomains.includes(domain)) {
    return res.status(400).json({ message: 'Domínio de e-mail não permitido.' });
  }

  req.validatedEmail = normalizedEmail;
  next();
}
