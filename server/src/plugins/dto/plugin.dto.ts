import { IsNotEmpty, IsString } from 'class-validator';

export class PluginDto {
  @IsNotEmpty()
  @IsString()
  readonly fileName: string;
}
