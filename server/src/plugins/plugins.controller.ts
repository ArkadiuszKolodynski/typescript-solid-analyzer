import {
  Controller,
  UseGuards,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PluginsService } from './plugins.service';
import { UploadPluginDto } from './dto/upload-plugin.dto';
import { CreatePluginDto } from './dto/create-plugin.dto';
import { DeletePluginDto } from './dto/delete-plugin.dto';

@Controller('plugins')
// @UseGuards(AuthGuard)
@UsePipes(ValidationPipe)
export class PluginsController {
  constructor(private readonly pluginsService: PluginsService) {}

  @Post('/upload')
  private async upload(@Body() uploadPluginDto: UploadPluginDto): Promise<any> {
    const fileName: string = await this.pluginsService.upload(uploadPluginDto.dataUri);
    return { fileName };
  }

  @Post('/create')
  private async create(@Body() createPluginDto: CreatePluginDto): Promise<void> {
    await this.pluginsService.create(createPluginDto.fileName);
    return;
  }

  @Put('/update')
  private async update() {
    await this.pluginsService.update();
    return {};
  }

  @Delete('/delete')
  private async delete(@Body() deletePluginDto: DeletePluginDto) {
    await this.pluginsService.delete(deletePluginDto.name);
    return {};
  }
}
