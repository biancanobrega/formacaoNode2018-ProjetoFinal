import * as Server from './config/server';
import * as Database from './config/database';
import { getServerConfigs } from './config/config';

import UserTokenRoute from './src/routes/user-token';

console.log(`Running enviroment ${process.env.NODE_ENV || 'dev'}`);

// Starting Application Server
const server = Server.init();

server.listen(process.env.port || getServerConfigs().port, () => {
  console.log('Servidor ON');
  Database.init();
  UserTokenRoute(server);
});
