import { databaseModels } from '../../../config/database';
import { DatabaseService } from './database';
import { IUserTokenDocument } from '../../models/user-token';

export default class UserTokenDatabase extends DatabaseService<IUserTokenDocument> {
  constructor() {
    super(databaseModels.userTokenModel);
  }
}
