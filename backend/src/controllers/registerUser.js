import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const registerUser = async (req, res) => {
  const { fullName, socialName, document, docType, phone, email, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        full_name: fullName,
        social_name: socialName,
        document,
        doc_type: docType,
        phone,
        email,
        password: hashedPassword,
      },
    })

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' })
  } catch (error) {
    console.error('Erro ao registrar usuário:', error)

    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return res.status(400).json({ message: 'E-mail já está em uso.' })
    }

    res.status(500).json({ message: 'Erro ao tentar cadastrar o usuário.' })
  }
}
