import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { PasswordRecoveryService } from './password-recovery.service';

@ApiTags('password-recovery')
@Controller('password-recovery')
export class PasswordRecoveryController {
  constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Solicitar recuperação de senha' })
  @ApiResponse({ status: 200, description: 'Um e-mail foi enviado com instruções para recuperar a senha.' })
  @ApiResponse({ status: 404, description: 'Este email não esta cadastrado no banco de dados.' })
  @ApiResponse({ status: 500, description: 'Erro ao enviar e-mail para recuperação de senha.' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.passwordRecoveryService.forgotPassword(forgotPasswordDto.email);
  }
}
