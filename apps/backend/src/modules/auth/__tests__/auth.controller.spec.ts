import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../../users/users.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

jest.mock('bcryptjs');

describe('AuthController', () => {
  let controller: AuthController;

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock-jwt-token'),
  };

  const mockUsersService = {
    findByEmail: jest.fn(),
  };

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('Deve ser definido', () => {
      expect(controller).toBeDefined();
    });

    it('Deve retornar um token quando as credenciais são válidas', async () => {
      const mockUser = {
        id: 1,
        email: 'generic@example.com',
        password: '$2a$10$hashedPassword',
      };

      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await controller.login({
        email: 'generic@example.com',
        password: '123456',
      });

      expect(result).toEqual({
        message: 'Login realizado com sucesso!',
        token: 'mock-jwt-token',
      });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: 'generic@example.com',
        sub: 1,
      });
    });

    it('Deve retornar um erro se o email não for válido', async () => {
      mockUsersService.findByEmail.mockRejectedValue(new NotFoundException('Usuário não encontrado.'));

      await expect(
        controller.login({
          email: 'invalid@example.com',
          password: '123456',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('Deve retornar um erro se a senha não for válida', async () => {
      const mockUser = {
        id: 1,
        email: 'generic@example.com',
        password: '$2a$10$hashedPassword',
      };

      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        controller.login({
          email: 'generic@example.com',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('logout', () => {
    it('Deve retornar mensagem de logout bem-sucedido', async () => {
      const result = await controller.logout();

      expect(result).toEqual({
        message: 'O usuário foi deslogado com sucesso!',
      });
    });
  });
});
