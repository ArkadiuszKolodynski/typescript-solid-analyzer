import { Controller, Get, Res, Query, Req, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/login')
  private async login(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply<ServerResponse>,
    @Query('code') code: string,
  ): Promise<void> {
    // validate input only and delegate work to service
    const token: string = await this.authService.getGithubAccessToken(code);
    const githubUser: any = await this.authService.getGithubUser(token);
    let user: User = await this.usersService.findOne(githubUser.login);
    if (!user) {
      user = await this.usersService.createUser({ login: githubUser.login });
    }
    req.session.user = user;
    req.session.token = token;
    res.send(githubUser);
  }

  @Get('/status')
  private async status(@Req() req: FastifyRequest): Promise<any> {
    if (req.session.token) {
      return await this.authService.getGithubUser(req.session.token);
    }
    delete req.session;
    throw new HttpException('Unauthorized!', HttpStatus.UNAUTHORIZED);
  }

  @Get('/logout')
  private async logout(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply<ServerResponse>,
  ): Promise<void> {
    req.destroySession((err) => {
      //TODO: logger
      if (err) console.log(err);
      delete req.session;
      res.send();
    });
  }

  @Get('/github')
  private redirectToGithub(@Res() res: FastifyReply<ServerResponse>): void {
    res.from(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user:email%20repo`,
    );
  }
}
