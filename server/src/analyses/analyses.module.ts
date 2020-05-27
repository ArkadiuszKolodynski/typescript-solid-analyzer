import { Module } from '@nestjs/common';
import { AnalysesGateway } from './analyses.gateway';
import { AnalysesService } from './analyses.service';
import { PluginsModule } from 'src/plugins/plugins.module';

@Module({
  imports: [PluginsModule],
  providers: [AnalysesGateway, AnalysesService],
  exports: [AnalysesService],
})
export class AnalysesModule {}
