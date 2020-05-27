import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PluginsController } from './plugins.controller';
import { PluginsService } from './plugins.service';
import { PluginSchema } from './schemas/plugin.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Plugin', schema: PluginSchema }])],
  controllers: [PluginsController],
  providers: [PluginsService],
  exports: [PluginsService],
})
export class PluginsModule {}
