import { Module } from '@nestjs/common';
import { PluginsController } from './plugins.controller';
import { PluginsService } from './plugins.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PluginSchema } from './schemas/plugin.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Plugin', schema: PluginSchema }])],
  controllers: [PluginsController],
  providers: [PluginsService],
})
export class PluginsModule {}
