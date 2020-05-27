export class CreateUserDto {
  readonly login: string;

  constructor(login: string) {
    this.login = login;
  }
}
