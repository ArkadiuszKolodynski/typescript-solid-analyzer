import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/login')
  private async login(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply<ServerResponse>,
    @Body('code') code: string,
  ): Promise<void> {
    //TODO: validate input only and delegate work to service
    const token: string = await this.authService.getGithubAccessToken(code);
    const githubUser: any = await this.authService.getGithubUser(token);
    let user: UserDto = await this.usersService.findOne(githubUser.login);
    if (!user) {
      user = await this.usersService.createUser(new CreateUserDto(githubUser.login));
    }
    req.session.user = user;
    req.session.token = token;
    res.send(githubUser);
    Logger.log(`User ${user.login} logged in`);
  }

  @Post('/logout')
  private async logout(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply<ServerResponse>,
  ): Promise<void> {
    const login = req.session.user.login;
    req.destroySession((err) => {
      if (err) Logger.error(err.message, err.stack);
      delete req.session;
      res.send({});
      Logger.log(`User ${login} logged out`);
    });
  }

  @Get('/status')
  private async status(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply<ServerResponse>,
  ): Promise<void> {
    // res.setCookie('csrf-token', req.csrfToken(), { httpOnly: false, secure: false, path: '/' });
    if (req.session?.token) {
      res.send(await this.authService.getGithubUser(req.session.token));
    } else {
      delete req.session;
      throw new HttpException('Unauthorized!', HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('/authorize-in-github')
  private authorizeInGithub(@Res() res: FastifyReply<ServerResponse>): void {
    const clientId = this.configService.get<string>('clientId');
    res.from(
      `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email%20repo`,
    );
  }
}
