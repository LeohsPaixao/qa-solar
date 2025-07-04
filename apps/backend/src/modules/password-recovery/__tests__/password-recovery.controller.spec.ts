import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users/users.service';
import { PasswordRecoveryController } from '../password-recovery.controller';
import { PasswordRecoveryService } from '../password-recovery.service';

describe('PasswordRecoveryController', () => {
  let controller: PasswordRecoveryController;

  const mockUsersService = {
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordRecoveryController],
      providers: [
        PasswordRecoveryService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<PasswordRecoveryController>(PasswordRecoveryController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('Deve retornar um e-mail enviado com instruções para recuperar a senha', async () => {
    mockUsersService.findByEmail.mockResolvedValue({
      id: 1,
      email: 'generic@example.com',
      password: '123456',
    });

    const result = await controller.forgotPassword({ email: 'generic@example.com' });
    expect(result.message).toBe('Um e-mail foi enviado com instruções para recuperar a senha.');
  });

  it('Deve retornar um erro se o e-mail não for válido', async () => {
    mockUsersService.findByEmail.mockRejectedValue(new NotFoundException('Usuário não encontrado.'));

    await expect(controller.forgotPassword({ email: 'invalid@example.com' })).rejects.toThrow(NotFoundException);
  });
});
