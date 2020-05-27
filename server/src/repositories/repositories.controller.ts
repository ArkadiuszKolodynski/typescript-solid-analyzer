import { Controller, Get, UseGuards, Session as GetSession } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { Session } from 'fastify';
import { RepositoryDto } from './dto/repository.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('repositories')
@UseGuards(AuthGuard)
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @Get()
  async findAll(@GetSession() session: Session): Promise<RepositoryDto[]> {
    return this.repositoriesService.findAll(session.token);
  }
}
