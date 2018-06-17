import * as nconf from 'nconf';
import * as path from 'path';

// Read Configurations
const configs = new nconf.Provider({
  store: {
    file: path.join(
      __dirname,
      `./env/config.${process.env.NODE_ENV || 'dev'}.json`
    ),
    type: 'file'
  }
});

export interface IServerConfiguration {
  port: number;
  database: IDataConfiguration;
  components: IComponentsConfiguration;
}

export interface IDataConfiguration {
  connectionString: string;
}

export interface IComponentsConfiguration {
  userTokenManager: IUserTokenManagerConfiguration;
}

interface IUserTokenManagerConfiguration {
  hashDigest: string;
  hashLength: number;
  defaultLifetime: number;
  createAccountLifetime: number;
  changePasswordLifetime: number;
  tokenKey: string;
}

export function getServerConfigs(): IServerConfiguration {
  return configs.get('server');
}
