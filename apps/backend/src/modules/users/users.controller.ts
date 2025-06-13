import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { DeleteUserDto } from '../users/dto/delete-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 409, description: 'CPF/CNPJ ou email já está em uso.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      message: 'Usuário cadastrado com sucesso!',
      user,
    };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Nenhum usuário encontrado.' })
  async findAll() {
    const users = await this.usersService.findAll();
    if (!users || users.length === 0) {
      throw new HttpException('Nenhum usuário encontrado.', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar dados do usuário logado' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado', type: UserDto })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async getMe(@Request() req: any) {
    try {
      const user = await this.usersService.findOne(req.user.id);
      return user;
    } catch (error: any) {
      console.error('Erro ao buscar usuário:', error);
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar dados do usuário logado' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso', type: UserDto })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async update(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    try {
      if (!req.user?.id) {
        throw new HttpException('ID do usuário não encontrado no token', HttpStatus.UNAUTHORIZED);
      }

      const user = await this.usersService.update(req.user.id, updateUserDto);
      return {
        message: 'Usuário alterado com sucesso.',
        user,
      };
    } catch (error: any) {
      console.error('Erro ao atualizar usuário:', error);
      throw new HttpException('Erro ao atualizar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('delete')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Excluir usuários' })
  @ApiResponse({ status: 200, description: 'Usuários excluídos com sucesso' })
  @ApiResponse({ status: 404, description: 'Nenhum usuário encontrado para excluir' })
  async delete(@Body() deleteUserDto: DeleteUserDto, @Param('userId') userId: number) {
    try {
      if (deleteUserDto.ids.includes(userId)) {
        throw new HttpException('Você não pode excluir o usuário logado.', HttpStatus.BAD_REQUEST);
      }

      if (deleteUserDto.ids.length === 0) {
        throw new HttpException('Nenhum usuário encontrado para excluir.', HttpStatus.NOT_FOUND);
      }

      const deletedUsers = await this.usersService.deleteUsers(deleteUserDto.ids);
      return {
        message: `${deletedUsers.count} usuário(s) excluído(s) com sucesso!`,
      };
    } catch (error: any) {
      console.error('Erro ao excluir usuário:', error);
      throw new HttpException('Erro ao excluir usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
