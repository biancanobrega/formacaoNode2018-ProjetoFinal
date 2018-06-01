import * as nconf from 'nconf';
import * as path from 'path';

// Read Configurations
const configs = new nconf.Provider({
  store: {
    file: path.join(
      __dirname,
      `./env/config.${process.env.NODE_ENV || 'dev'}.json`
    ),
    type: 'file',
  }
});

export interface IServerConfiguration {
  port: number;
  service: IServiceConfiguration;
}

interface IServiceConfiguration {
  email: IEmailService;
}

interface IEmailService {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  email: string;
}

export function getServerConfigs(): IServerConfiguration {
  return configs.get('server');
}
