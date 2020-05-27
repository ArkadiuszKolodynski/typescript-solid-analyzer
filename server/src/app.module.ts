import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AnalysesModule } from './analyses/analyses.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { PluginsModule } from './plugins/plugins.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoConnectionString'),
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    RepositoriesModule,
    UsersModule,
    AnalysesModule,
    PluginsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
