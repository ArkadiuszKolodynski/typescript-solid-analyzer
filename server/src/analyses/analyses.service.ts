import { Injectable } from '@nestjs/common';
import { dir, DirectoryResult } from 'tmp-promise';
import { sep } from 'path';
import { AnalysisResultsDto } from './dto/analysis-results.dto';
import { cloneRepo } from './utils/clone-repo.util';
import { readFile } from './utils/read-file.util';
import { cleanup } from '../common/utils/cleanup.utils';

@Injectable()
export class AnalysesService {
  async performAnalysis(cloneUrl: string): Promise<AnalysisResultsDto> {
    const tmpDir: DirectoryResult = await dir();
    await cloneRepo(cloneUrl, tmpDir.path);
    const packageJson: string = await readFile(`${tmpDir.path + sep}package.json`);
    console.log(packageJson);
    console.log(tmpDir);
    cleanup(tmpDir.path);
    return new AnalysisResultsDto([]);
  }
}
