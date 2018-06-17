import { TokenTypeEnum } from '../../commons/enums/token-type';

export interface ITokenManager<T> {
  generateToken(
    id: string,
    tokenType: TokenTypeEnum
  ): { tokenInfo: T; sign: string };
  decoded(token: string): Promise<T>;
}
