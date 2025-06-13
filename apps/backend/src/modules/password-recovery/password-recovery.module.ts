import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PasswordRecoveryController } from './password-recovery.controller';
import { PasswordRecoveryService } from './password-recovery.service';

@Module({
  imports: [UsersModule],
  controllers: [PasswordRecoveryController],
  providers: [PasswordRecoveryService],
  exports: [PasswordRecoveryService],
})
export class PasswordRecoveryModule {}
