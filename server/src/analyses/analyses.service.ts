import { Injectable } from '@nestjs/common';
import { PluginsService } from 'src/plugins/plugins.service';
import { dir } from 'tmp-promise';

import { cleanup } from '../common/utils/cleanup.utils';
import { PluginInstance } from '../plugins/interfaces/plugin-instance.interface';
import { AnalysisResultsDto } from './dto/analysis-results.dto';
import { cloneRepo } from './utils/clone-repo.util';

@Injectable()
export class AnalysesService {
  constructor(private readonly pluginsService: PluginsService) {}

  async performAnalysis(cloneUrl: string): Promise<AnalysisResultsDto> {
    const tmpDir = await dir();
    await cloneRepo(cloneUrl, tmpDir.path);
    const instansiatedPlugins = await this.pluginsService.loadEnabledPlugins();
    const results = await this.executeTests(instansiatedPlugins, tmpDir.path);
    cleanup(tmpDir.path);
    console.log('results:', results);
    console.log('done');
    return new AnalysisResultsDto(results);
  }

  private async executeTests(plugins: PluginInstance[], pathToRepo: string): Promise<any[]> {
    return Promise.all<any>(plugins.map((plugin) => plugin.execute(pathToRepo)));
  }
}
