import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async getGithubAccessToken(code: string): Promise<string> {
    const response: any = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
      }),
    });
    if (response.ok) {
      const tokenObj: any = await response.json();
      if (!tokenObj.error) {
        return tokenObj.access_token;
      }
    }
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  async getGithubUser(access_token: string): Promise<any> {
    const response = await fetch('https://api.github.com/user', {
      headers: { Authorization: `token ${access_token}` },
    });
    if (response.ok) {
      return response.json();
    }
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }
}
