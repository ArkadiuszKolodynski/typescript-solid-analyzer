import { Injectable } from '@nestjs/common';
import { dir } from 'tmp-promise';
import * as path from 'path';
import { AnalysisResultsDto } from './dto/analysis-results.dto';
import { cloneRepo } from './utils/clone-repo.util';
import { cleanup } from '../common/utils/cleanup.utils';
import { ConfigService } from '@nestjs/config';
import { PluginsService } from 'src/plugins/plugins.service';
import { Plugin } from 'src/plugins/interfaces/plugin.interface';
import { PluginInstance } from './interfaces/plugin-instance.interface';

@Injectable()
export class AnalysesService {
  pluginsPath: string = this.configService.get<string>('pluginsPath');

  constructor(
    private readonly configService: ConfigService,
    private readonly pluginsService: PluginsService,
  ) {}

  async performAnalysis(cloneUrl: string): Promise<AnalysisResultsDto> {
    const tmpDir = await dir();
    await cloneRepo(cloneUrl, tmpDir.path);
    const enabledPlugins = await this.pluginsService.getEnabledPlugins();
    const results = await this.executeTests(enabledPlugins, tmpDir.path);
    cleanup(tmpDir.path);
    console.log('results:', results);
    console.log('done');
    return new AnalysisResultsDto(results);
  }

  private async executeTests(plugins: Plugin[], pathToRepo: string): Promise<any[]> {
    return Promise.all<any>(
      plugins.map(async (plugin) => {
        console.log(plugin.name);
        const pluginModulePath = path.join(this.pluginsPath, plugin.name, plugin.main);
        delete require.cache[require.resolve(pluginModulePath)];
        const pluginInstance: PluginInstance = await import(pluginModulePath);
        console.log(pluginInstance);
        return pluginInstance.execute(pathToRepo);
      }),
    );
  }
}
