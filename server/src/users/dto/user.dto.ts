import { IsArray, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly login: string;
  @IsArray()
  readonly repositories: any[];
}
