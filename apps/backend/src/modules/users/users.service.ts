import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { email, document, password, ...rest } = createUserDto;

      const existingDocument = await this.prisma.user.findUnique({
        where: { document },
      });

      if (existingDocument) {
        throw new ConflictException('CPF ou CNPJ já está em uso.');
      }

      const existingEmail = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingEmail) {
        throw new ConflictException('E-mail já está em uso.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.prisma.user.create({
        data: {
          ...rest,
          email,
          document,
          password: hashedPassword,
        },
      });

      const result = Object.fromEntries(Object.entries(user).filter(([key]) => key !== 'password'));
      return result;
    } catch (error: any) {
      if (error instanceof ConflictException) {
        throw error.message;
      }
      throw new InternalServerErrorException('Erro ao criar usuário.');
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          full_name: true,
          email: true,
          created_at: true,
          updated_at: true,
        },
      });
      return users;
    } catch (error: any) {
      if (error instanceof Error) {
        throw error.message;
      }
      throw new Error('Erro ao buscar usuários.');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          full_name: true,
          social_name: true,
          email: true,
          phone: true,
          created_at: true,
          updated_at: true,
        },
      });

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      if (!id) {
        throw new Error('ID do usuário é obrigatório');
      }

      const { full_name, social_name, phone_number } = updateUserDto;

      const user = await this.prisma.user.update({
        where: { id },
        data: {
          full_name,
          social_name: social_name || null,
          phone: phone_number || null,
          updated_at: new Date(),
        },
      });

      return user;
    } catch (error: any) {
      if (error instanceof Error) {
        throw error.message;
      }
      throw new Error('Erro ao atualizar usuário');
    }
  }

  async deleteUsers(ids: number[]) {
    return this.prisma.user.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
