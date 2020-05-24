import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RepositoriesModule } from './repositories/repositories.module';
import { UsersModule } from './users/users.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    RepositoriesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
