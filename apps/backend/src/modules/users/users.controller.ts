import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

interface AuthenticatedRequest {
  user: {
    id: number;
    email: string;
    full_name: string;
    social_name?: string;
    phone?: string;
    created_at: Date;
    updated_at: Date;
  };
}

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso', type: UserDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'E-mail já cadastrado' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      message: 'Usuário criado com sucesso.',
      user,
    };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários', type: [UserDto] })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar dados do usuário logado' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado', type: UserDto })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getMe(@Request() req: AuthenticatedRequest) {
    return await this.usersService.findOne(req.user.id);
  }

  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar dados do usuário logado' })
  @ApiResponse({ status: 200, description: 'Usuário alterado com sucesso', type: UserDto })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado para atualizar' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async update(@Request() req: AuthenticatedRequest, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(req.user.id, updateUserDto);
    return {
      message: 'Usuário alterado com sucesso.',
      user,
    };
  }

  @Delete('delete')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Excluir usuários' })
  @ApiResponse({ status: 200, description: 'Usuários excluídos com sucesso' })
  @ApiResponse({ status: 400, description: 'Você não pode excluir o usuário logado.' })
  @ApiResponse({ status: 404, description: 'Nenhum usuário encontrado para excluir' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async delete(@Body() deleteUserDto: DeleteUserDto, @Request() req: AuthenticatedRequest) {
    const deletedUsers = await this.usersService.deleteUsers(deleteUserDto.ids, req);
    return {
      message: `${deletedUsers.count} usuário(s) excluído(s) com sucesso!`,
    };
  }
}
