import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { WsAdapter } from '@nestjs/platform-ws';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fastifyCookie = require('fastify-cookie');
// import fastifyCsrf from 'fastify-csrf';
// import helmet from 'fastify-helmet';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fastifyMetrics = require('fastify-metrics');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fastifyReplyFrom = require('fastify-reply-from');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fastifySession = require('fastify-session');

import { AppModule } from './app.module';
//TODO
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoSessionStore = require('connect-mongodb-session')(fastifySession);

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: 1 }),
  );
  const configService = app.get(ConfigService);
  app.enableCors({ origin: 'http://localhost:5000' });
  // app.register(helmet);
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
  // app.register(fastifyCsrf);
  app.register(fastifyMetrics, { endpoint: '/metrics' });
  app.register(fastifyReplyFrom);
  app.setGlobalPrefix('api/v1');
  app.useWebSocketAdapter(new WsAdapter(app));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(configService.get<number>('port'));
};
bootstrap();
