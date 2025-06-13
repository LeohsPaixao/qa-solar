import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export enum DocType {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
}

export class CreateUserDto {
  @ApiProperty({ description: 'Nome completo do usuário' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ description: 'Nome social do usuário' })
  @IsString()
  @IsNotEmpty()
  social_name: string;

  @ApiProperty({ description: 'CPF ou CNPJ do usuário' })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({ description: 'Tipo de documento (CPF ou CNPJ)', enum: DocType })
  @IsEnum(DocType)
  @IsNotEmpty()
  doc_type: DocType;

  @ApiProperty({ description: 'Telefone do usuário' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Email do usuário' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
