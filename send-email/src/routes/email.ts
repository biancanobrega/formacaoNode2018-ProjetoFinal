import { Router } from 'express';
import EmailController from '../controllers/email';
import RequestValidator from '../commons/validators/request';
import { FieldRequest } from '../commons/enums/validator';
import { EmailJoi } from '../models/email';

export default function(server: Router) {
  const emailController = new EmailController();

  server.post(
    '/v1/email/send',
    RequestValidator.validateRequest(EmailJoi, FieldRequest.Body),
    emailController.send.bind(emailController)
  );
}
