import { Router } from 'express';

import UserTokenController from '../controllers/user-token';
import ExpressValidator from '../commons/validators/request';
import { UserTokenModel } from '../models';
import { FieldRequest } from '../commons/enums';

export default function(server: Router) {
  const userTokenController = new UserTokenController();
  server.post(
    '/v1/token/user',
    ExpressValidator.validateRequest(
      UserTokenModel.UserTokenJoi,
      FieldRequest.Body
    ),
    userTokenController.add.bind(userTokenController)
  );
  server.head(
    '/v1/token/user/validate',
    ExpressValidator.validateRequest(
      UserTokenModel.UserTokenValidationRequestJoi,
      FieldRequest.Headers
    ),
    userTokenController.validate.bind(userTokenController)
  );
}
