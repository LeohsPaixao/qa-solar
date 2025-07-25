import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface AuthenticatedRequest {
  user: {
    id: number;
    email: string;
    full_name: string;
    social_name?: string;
    phone?: string;
    created_at: Date;
    updated_at: Date;
  };
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;

    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    const result = Object.fromEntries(Object.entries(user).filter(([key]) => key !== 'password'));

    return result;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        full_name: true,
        social_name: true,
        phone: true,
        document: true,
        doc_type: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!users || users.length === 0) {
      throw new NotFoundException('Nenhum usuário encontrado.');
    }

    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        full_name: true,
        social_name: true,
        phone: true,
        document: true,
        doc_type: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado para atualizar.');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        full_name: true,
        social_name: true,
        phone: true,
        document: true,
        doc_type: true,
        created_at: true,
        updated_at: true,
      },
    });

    return updatedUser;
  }

  async deleteUsers(ids: number[], req?: AuthenticatedRequest) {
    if (req && ids.includes(req.user.id)) {
      throw new BadRequestException('Você não pode excluir o usuário logado.');
    }

    const result = await this.prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Nenhum usuário encontrado para excluir.');
    }

    return result;
  }
}
