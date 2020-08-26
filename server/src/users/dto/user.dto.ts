import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  readonly login: string;
  @IsArray()
  readonly repositories: any[];
}
