import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';
import * as fastifyCookie from 'fastify-cookie';
import * as fastifyCsrf from 'fastify-csrf';
import * as fastifyReplyFrom from 'fastify-reply-from';
import * as fastifySession from 'fastify-session';
import * as helmet from 'fastify-helmet';
//TODO
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoSessionStore = require('connect-mongodb-session')(fastifySession);

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: 1 }),
  );
  app.register(helmet);
  app.register(fastifyCookie);
  //TODO: secure cookies
  app.register(fastifySession, {
    cookie: { httpOnly: false, maxAge: 365 * 24 * 60 * 60 * 1000, sameSite: 'Lax', secure: false },
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: new mongoSessionStore({
      uri: process.env.MONGO_CONNECTION_STRING,
      collection: 'sessions',
    }),
  });
  app.register(fastifyCsrf, { cookie: true });
  app.register(fastifyReplyFrom);
  app.useWebSocketAdapter(new WsAdapter(app));
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
};
bootstrap();
