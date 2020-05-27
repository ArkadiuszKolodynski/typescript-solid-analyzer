import { Body, Controller, Delete, Param, Patch,Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

import { PluginDto } from './dto/plugin.dto';
import { UploadPluginDto } from './dto/upload-plugin.dto';
import { PluginsService } from './plugins.service';

@Controller('plugins')
@UseGuards(AuthGuard)
export class PluginsController {
  constructor(private readonly pluginsService: PluginsService) {}

  @Post('/upload')
  private async upload(@Body() uploadPluginDto: UploadPluginDto): Promise<any> {
    const fileName: string = await this.pluginsService.upload(uploadPluginDto.dataUri);
    return { fileName };
  }

  @Post()
  private async create(@Body() pluginDto: PluginDto): Promise<void> {
    await this.pluginsService.create(pluginDto.fileName);
    return;
  }

  @Put()
  private async update(@Body() pluginDto: PluginDto): Promise<void> {
    await this.pluginsService.update(pluginDto.fileName);
    return;
  }

  @Delete('/:name')
  private async delete(@Param('name') name: string): Promise<void> {
    await this.pluginsService.delete(name);
    return;
  }

  @Patch('/:name/enable')
  private async enable(@Param('name') name: string): Promise<void> {
    await this.pluginsService.setEnable(name, true);
    return;
  }

  @Patch('/:name/disable')
  private async disable(@Param('name') name: string): Promise<void> {
    await this.pluginsService.setEnable(name, false);
    return;
  }
}
