import * as Mongoose from 'mongoose';
import { IDataConfiguration, getServerConfigs } from './config';
import { IUserTokenDocument, UserTokenSchema } from '../src/models/user-token';

export let databaseModels: IDatabase;
export interface IDatabase {
  userTokenModel: Mongoose.Model<IUserTokenDocument>;
}

export const init = () => {
  const config = getServerConfigs().database;
  const connection = Mongoose.createConnection(config.connectionString);

  connection.on('error', () => {
    console.log(`Unable to connect to database: ${config.connectionString}`);
  });

  connection.once('open', () => {
    console.log(`Connected to database: ${config.connectionString}`);
  });

  databaseModels = {
    userTokenModel: connection.model<IUserTokenDocument>('UserToken', UserTokenSchema)
  };
};
