import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'Nome completo do usuário' })
  @IsString()
  @IsOptional()
  full_name?: string;

  @ApiProperty({ description: 'Nome social do usuário' })
  @IsString()
  @IsOptional()
  social_name?: string;

  @ApiProperty({ description: 'Telefone do usuário' })
  @IsString()
  @IsOptional()
  phone?: string;
}
