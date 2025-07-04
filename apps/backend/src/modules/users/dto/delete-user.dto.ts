import { IsArray, IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
  @IsArray()
  @IsNotEmpty()
  ids: number[];
}
