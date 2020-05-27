import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';
import * as fastifyCookie from 'fastify-cookie';
import * as fastifyCsrf from 'fastify-csrf';
import * as fastifyReplyFrom from 'fastify-reply-from';
import * as fastifySession from 'fastify-session';
import * as helmet from 'fastify-helmet';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
//TODO
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoSessionStore = require('connect-mongodb-session')(fastifySession);

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: 1 }),
  );
  const configService = app.get(ConfigService);
  app.register(helmet);
  app.register(fastifyCookie);
  //TODO: secure cookies
  app.register(fastifySession, {
    cookie: { httpOnly: true, maxAge: 365 * 24 * 60 * 60 * 1000, sameSite: 'Lax', secure: false },
    saveUninitialized: false,
    secret: configService.get<string>('sessionSecret'),
    store: new mongoSessionStore({
      uri: configService.get<string>('mongoConnectionString'),
      collection: 'sessions',
    }),
  });
  app.register(fastifyCsrf);
  app.register(fastifyReplyFrom);
  app.setGlobalPrefix('api/v1');
  app.useWebSocketAdapter(new WsAdapter(app));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get<number>('port'));
};
bootstrap();
