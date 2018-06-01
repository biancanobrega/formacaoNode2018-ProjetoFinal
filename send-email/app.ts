import * as Server from './config/server';
import { getServerConfigs } from './config/config';
import EmailRoute from './src/routes/email';

console.log(`Running enviroment ${process.env.NODE_ENV || 'dev'}`);

// Starting Application Server
const server = Server.init();

server.listen(process.env.port || getServerConfigs().port, () => {
  console.log('Servidor ON');
  EmailRoute(server);
});
