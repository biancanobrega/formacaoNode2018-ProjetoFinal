import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

import { TokenTypeEnum } from '../../commons/enums/token-type';
import { getServerConfigs } from '../../../config/config';
import { IUserToken } from '../../models/user-token';
import { ITokenManager } from '../interfaces/token-manager';

import * as TokenUtil from '../../commons/utils/token';

export default class UserTokenManager implements ITokenManager<IUserToken> {
  public generateToken(id: string, tokenType: TokenTypeEnum) {
    try {
      const config = getServerConfigs().components;
      const lifetime = TokenUtil.getLifetime(tokenType, config);
      const removeOnFirstUse =
        tokenType === TokenTypeEnum.CreateAccount ||
        tokenType === TokenTypeEnum.ForgotPassword;

      const expirationDate: Date = new Date();
      expirationDate.setHours(new Date().getHours() + lifetime);

      const randomBytes = crypto.randomBytes(0);
      const hash = crypto
        .createHash(config.userTokenManager.hashDigest)
        .update(randomBytes.toString() + expirationDate)
        .digest('hex');

      const sign = jwt.sign(
        { hash, user: id },
        new Buffer(config.userTokenManager.tokenKey, 'base64'),
        { expiresIn: lifetime + 'h' }
      );
      const userToken: IUserToken = {
        hash,
        user: id,
        removeOnFirstUse,
        validThru: expirationDate
      };

      return { tokenInfo: userToken, sign };
    } catch (error) {
      console.log('UserTokenManager - generateToken: ', error);
      throw error;
    }
  }

  public decoded(token: string): Promise<IUserToken> {
    return new Promise((resolve, reject) => {
      const config = getServerConfigs().components;
      jwt.verify(token, new Buffer(config.userTokenManager.tokenKey, 'base64'), (err, decoded) => {
        if (decoded) {
          resolve(decoded as IUserToken);
        } else if (err) {
          console.error('UserTokenManager - decoded: ', err);
        }
        reject();
      });
    });
  }
}
