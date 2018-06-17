import * as Express from 'express';
import * as HTTP_CODES from 'http-status';

import { ITokenManager } from '../components/interfaces/token-manager';
import { UserTokenModel} from '../models/';
import UserTokenDatabase from '../providers/database/user-token';
import UserTokenManager from '../components/implements/user-token-manager';

export default class TokenController {
  private tokenManager: ITokenManager<UserTokenModel.IUserToken>;
  private userTokenDatabase: UserTokenDatabase;

  constructor() {
    this.tokenManager = new UserTokenManager();
    this.userTokenDatabase = new UserTokenDatabase();
  }

  public async add(req: Express.Request, res: Express.Response) {
    try {
      const body = req.body;
      const token = this.tokenManager.generateToken(body.userId, body.type);
      await this.userTokenDatabase.add(UserTokenModel.parse(
        token.tokenInfo
      ) as UserTokenModel.IUserTokenDocument);

      res.status(HTTP_CODES.CREATED).send({ token: token.sign });
    } catch (error) {
      console.log('TokenController - add: ', error);
      res.sendStatus(HTTP_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  public async validate(req: Express.Request, res: Express.Response) {
    try {
      const tokenHeader = req.headers['x-user-access'];
      const user = req.headers['x-user-id'];
      if (tokenHeader) {
        const decodedToken = await this.tokenManager.decoded(
          tokenHeader.toString().split(' ')[1]
        );
        if (decodedToken.user === user) {
          const result = await this.userTokenDatabase.findByParams({
            user: decodedToken.user,
            hash: decodedToken.hash
          });
          const token = result[0];
          if (token && token.validThru && token.validThru > new Date()) {
            if (token.removeOnFirstUse) {
              this.userTokenDatabase.remove(token._id);
            }
            res.sendStatus(HTTP_CODES.OK);
          } else {
            res.sendStatus(HTTP_CODES.UNAUTHORIZED);
          }
        } else {
          res.sendStatus(HTTP_CODES.UNAUTHORIZED);
        }
      } else {
        res.sendStatus(HTTP_CODES.UNAUTHORIZED);
      }
    } catch (error) {
      console.log('TokenController - validate: ', error);
      res.sendStatus(HTTP_CODES.INTERNAL_SERVER_ERROR);
    }
  }
}
