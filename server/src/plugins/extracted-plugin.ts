import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsSemVer } from 'class-validator';

export class ExtractedPlugin {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;
  @Expose()
  @IsNotEmpty()
  @IsString()
  main: string;
  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsSemVer()
  version: string;

  constructor(name: string, main: string, version: string) {
    this.name = name;
    this.main = main;
    this.version = version;
  }
}
