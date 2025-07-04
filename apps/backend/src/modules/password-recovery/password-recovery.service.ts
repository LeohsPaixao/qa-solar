import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class PasswordRecoveryService {
  constructor(private readonly usersService: UsersService) {}

  async forgotPassword(email: string) {
    await this.usersService.findByEmail(email);
    return {
      message: 'Um e-mail foi enviado com instruções para recuperar a senha.',
    };
  }
}
