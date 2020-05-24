import { Controller, Get, Req, HttpException, HttpStatus } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { FastifyRequest } from 'fastify';

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @Get()
  async getRepositories(@Req() req: FastifyRequest) {
    if (req.session.token) {
      return await this.repositoriesService.findAll(req.session.token);
    }
    throw new HttpException('Unauthorized!', HttpStatus.UNAUTHORIZED);
  }
}
