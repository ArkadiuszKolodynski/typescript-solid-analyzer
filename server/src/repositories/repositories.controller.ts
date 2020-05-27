import { Controller, Get, Session as GetSession,UseGuards } from '@nestjs/common';
import { Session } from 'fastify';
import { AuthGuard } from 'src/auth/auth.guard';

import { RepositoryDto } from './dto/repository.dto';
import { RepositoriesService } from './repositories.service';

@Controller('repositories')
@UseGuards(AuthGuard)
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @Get()
  async findAll(@GetSession() session: Session): Promise<RepositoryDto[]> {
    return this.repositoriesService.findAll(session.token);
  }
}
