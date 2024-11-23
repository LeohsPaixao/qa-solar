import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function loginUser(req, res) {
  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado.' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'A senha não confere.' })
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
    })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao tentar realizar o login.' })
  }
}
