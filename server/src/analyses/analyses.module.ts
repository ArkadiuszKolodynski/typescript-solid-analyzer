import { Module } from '@nestjs/common';
import { PluginsModule } from 'src/plugins/plugins.module';

import { AnalysesGateway } from './analyses.gateway';
import { AnalysesService } from './analyses.service';

@Module({
  imports: [PluginsModule],
  providers: [AnalysesGateway, AnalysesService],
  exports: [AnalysesService],
})
export class AnalysesModule {}
