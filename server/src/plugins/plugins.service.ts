import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { randomBytes } from 'crypto';
import * as extract from 'extract-zip';
import { Model } from 'mongoose';
import * as os from 'os';
import * as path from 'path';
import { cleanup, parsePackageJson } from 'src/common/utils';
import { Plugin } from './interfaces/plugin.interface';
import { moveDir, isFileExists, writeFileFromBase64 } from './utils';
import {
  InvalidPluginException,
  PluginAlreadyExistException,
  PluginDoesNotExistException,
  IncorrectPluginUploadException,
} from './exceptions';
import { ExtractedPlugin } from './extracted-plugin';

@Injectable()
export class PluginsService {
  private readonly pluginsPath: string = this.configService.get<string>('pluginsPath');

  constructor(
    @InjectModel('Plugin') private readonly pluginModel: Model<Plugin>,
    private readonly configService: ConfigService,
  ) {}

  async upload(dataUri: string): Promise<string> {
    const pluginFileName = `${randomBytes(12).toString('hex')}.zip`;
    const pluginFilePath = os.tmpdir() + path.sep + pluginFileName;
    await writeFileFromBase64(pluginFilePath, dataUri.split(',').pop());
    return pluginFileName;
  }

  async create(pluginFileName: string): Promise<void> {
    const { pathToPluginZip, pathToExtractPlugin } = await this.getPaths(pluginFileName);
    const plugin: ExtractedPlugin = await this.extractZippedPlugin(
      pathToPluginZip,
      pathToExtractPlugin,
    );
    if ((await this.pluginModel.findOne({ name: plugin.name })) !== null) {
      throw new PluginAlreadyExistException([pathToPluginZip, pathToExtractPlugin]);
    }
    const createdPlugin: Plugin = await new this.pluginModel(plugin).save();
    await moveDir(pathToExtractPlugin, this.pluginsPath + path.sep + createdPlugin.name);
    cleanup(pathToPluginZip);
    return;
  }

  async update(pluginFileName: string): Promise<void> {
    const { pathToPluginZip, pathToExtractPlugin } = await this.getPaths(pluginFileName);
    const plugin: ExtractedPlugin = await this.extractZippedPlugin(
      pathToPluginZip,
      pathToExtractPlugin,
    );
    await this.pluginModel
      .findOneAndUpdate({ name: plugin.name }, plugin)
      .orFail(new PluginDoesNotExistException([pathToPluginZip, pathToExtractPlugin]));
    await cleanup(this.pluginsPath + path.sep + plugin.name);
    await moveDir(pathToExtractPlugin, this.pluginsPath + path.sep + plugin.name);
    cleanup(pathToPluginZip);
    return;
  }

  async delete(name: string): Promise<void> {
    await this.pluginModel.findOneAndDelete({ name }).orFail(new PluginDoesNotExistException());
    cleanup(this.pluginsPath + path.sep + name);
    return;
  }

  async setEnable(name: string, is_enabled: boolean): Promise<void> {
    await this.pluginModel
      .findOneAndUpdate({ name }, { is_enabled })
      .orFail(new PluginDoesNotExistException());
    return;
  }

  async getEnabledPlugins(): Promise<Plugin[]> {
    return this.pluginModel.find({ is_enabled: true });
  }

  private async getPaths(pluginZipName: string): Promise<any> {
    const pathToPluginZip = os.tmpdir() + path.sep + pluginZipName;
    if (!(await isFileExists(pathToPluginZip))) throw new IncorrectPluginUploadException();
    const pathToExtractPlugin = pathToPluginZip.replace('.zip', '');
    return { pathToPluginZip, pathToExtractPlugin };
  }

  private async extractZippedPlugin(
    filePath: string,
    extractDestination: string,
  ): Promise<ExtractedPlugin> {
    await extract(filePath, { dir: extractDestination });
    const plugin: ExtractedPlugin = plainToClass(
      ExtractedPlugin,
      await parsePackageJson(`${extractDestination}${path.sep}package.json`),
      { excludeExtraneousValues: true },
    );
    try {
      await validateOrReject(plugin);
    } catch (errors) {
      throw new InvalidPluginException(errors, [filePath, extractDestination]);
    }
    return plugin;
  }
}
