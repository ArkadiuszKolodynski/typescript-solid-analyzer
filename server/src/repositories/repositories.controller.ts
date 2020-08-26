import { Controller, Get, Session as GetSession, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

import { RepositoryDto } from './dto/repository.dto';
import { RepositoriesService } from './repositories.service';

@Controller('repositories')
@UseGuards(AuthGuard)
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @Get()
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findAll(@GetSession() session): Promise<RepositoryDto[]> {
    return this.repositoriesService.findAll(session.token);
  }
}
