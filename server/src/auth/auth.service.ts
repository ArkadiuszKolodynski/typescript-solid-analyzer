import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async getGithubAccessToken(code: string): Promise<string> {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: this.configService.get<string>('clientId'),
        client_secret: this.configService.get<string>('clientSecret'),
        code,
      }),
    });
    if (!response.ok) throw new HttpException(response.statusText, response.status);
    const tokenObj: any = await response.json();
    if (tokenObj.error) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return tokenObj.access_token;
  }

  async getGithubUser(access_token: string): Promise<any> {
    const response = await fetch('https://api.github.com/user', {
      headers: { Authorization: `token ${access_token}` },
    });
    if (!response.ok) throw new HttpException(response.statusText, response.status);
    return response.json();
  }
}
