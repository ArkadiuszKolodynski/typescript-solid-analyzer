import { resolve } from 'path';

export default (): Configuration => ({
  clientId: process.env.CLIENT_ID || 'client_id',
  clientSecret: process.env.CLIENT_SECRET || 'client_secret',
  mongoConnectionString: process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost/solid',
  pluginsPath: resolve(__dirname, '..', '..', `${process.env.PLUGINS_PATH || 'plugins'}`),
  port: parseInt(process.env.PORT, 10) || 3000,
  sessionSecret: process.env.SESSION_SECRET || 'session_secret',
});
