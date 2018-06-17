import { TokenTypeEnum } from '../enums/token-type';
import { IComponentsConfiguration } from '../../../config/config';

export function getLifetime(
  tokenType: TokenTypeEnum,
  config: IComponentsConfiguration
) {
  let lifetime = 0;
  switch (tokenType) {
    case TokenTypeEnum.CreateAccount: {
      lifetime = config.userTokenManager.createAccountLifetime;
      break;
    }
    case TokenTypeEnum.ForgotPassword: {
      lifetime = config.userTokenManager.changePasswordLifetime;
      break;
    }
    case TokenTypeEnum.Default: {
      lifetime = config.userTokenManager.defaultLifetime;
    }
    default: {
      lifetime = config.userTokenManager.defaultLifetime;
      break;
    }
  }
  return lifetime;
}
