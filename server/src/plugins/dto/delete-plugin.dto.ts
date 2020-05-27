import { IsNotEmpty, IsString } from 'class-validator';
export class DeletePluginDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
