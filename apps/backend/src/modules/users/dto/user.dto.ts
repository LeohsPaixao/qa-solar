import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'ID do usuário' })
  id: number;

  @ApiProperty({ description: 'Nome completo do usuário' })
  full_name: string;

  @ApiPropertyOptional({ description: 'Nome social do usuário' })
  social_name?: string;

  @ApiProperty({ description: 'Email do usuário' })
  email: string;

  @ApiPropertyOptional({ description: 'Telefone do usuário' })
  phone?: string;

  @ApiProperty({ description: 'Documento do usuário' })
  document: string;

  @ApiProperty({ description: 'Data de criação' })
  created_at: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updated_at: Date;
}
