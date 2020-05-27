import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import * as extractZippedPlugin from 'extract-zip';
import { Model } from 'mongoose';
import { tmpdir } from 'os';
import * as path from 'path';
import { cleanup } from 'src/common/utils/cleanup.utils';
import { Plugin } from './interfaces/plugin.interface';
import { writeFileFromBase64 } from './utils/write-file-from-base64.util';
import { parsePackageJson } from 'src/common/utils/parse-package-json.util';
import { moveDir } from './utils/move-dir.util';

@Injectable()
export class PluginsService {
  private readonly pluginsPath: string = path.resolve(__dirname, '../..', process.env.PLUGINS_PATH);

  constructor(@InjectModel('Plugin') private readonly pluginModel: Model<Plugin>) {}

  async upload(dataUri: string): Promise<string> {
    const pluginFileName = `${randomBytes(12).toString('hex')}.zip`;
    const pluginFilePath = tmpdir() + path.sep + pluginFileName;
    await writeFileFromBase64(pluginFilePath, dataUri.split(',').pop());
    return pluginFileName;
  }

  async create(pluginFileName: string): Promise<void> {
    const pluginFilePath = tmpdir() + path.sep + pluginFileName;
    const pluginExtractDestination = pluginFilePath.replace('.zip', '');
    await extractZippedPlugin(pluginFilePath, { dir: pluginExtractDestination });
    const { name, main, version } = await parsePackageJson(
      `${pluginExtractDestination}${path.sep}package.json`,
    );
    if ((await this.pluginModel.findOne({ name })) !== null) {
      cleanup(pluginFilePath);
      cleanup(pluginExtractDestination);
      throw new HttpException('Plugin already exist', HttpStatus.BAD_REQUEST);
    }
    const plugin: Plugin = await new this.pluginModel({ name, main, version }).save();
    await moveDir(pluginExtractDestination, this.pluginsPath + path.sep + plugin.name);
    cleanup(pluginFilePath);
    return;
  }

  async update() {
    return;
  }

  async delete(name: string): Promise<void> {
    const plugin: Plugin = await this.pluginModel.findOneAndDelete({ name });
    if (plugin !== null) return;
    throw new HttpException('Plugin does not exist', HttpStatus.BAD_REQUEST);
  }
}
