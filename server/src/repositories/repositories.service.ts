import { Injectable, HttpException } from '@nestjs/common';
import fetch, { Response } from 'node-fetch';
import { RepositoryDto } from './dto/repository.dto';

@Injectable()
export class RepositoriesService {
  async findAll(token: string): Promise<RepositoryDto[]> {
    const response: Response = await fetch('https://api.github.com/user/repos', {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    if (response.ok) {
      const repositories: any[] = await response.json();
      return repositories
        .filter((repo) => repo.language?.toLowerCase() === 'typescript')
        .map((repo) => new RepositoryDto(repo.id, repo.clone_url, repo.name, repo.full_name));
    }
    throw new HttpException(response.statusText, response.status);
  }
}
