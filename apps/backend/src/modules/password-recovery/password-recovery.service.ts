import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class PasswordRecoveryService {
  constructor(private readonly usersService: UsersService) {}

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return {
        message: 'Este email não esta cadastrado no banco de dados.',
      };
    }

    // TODO: Implementar integração com serviço de email
    // Por enquanto, apenas retornamos uma mensagem
    return {
      message: 'Um e-mail foi enviado com instruções para recuperar a senha.',
    };
  }
}
