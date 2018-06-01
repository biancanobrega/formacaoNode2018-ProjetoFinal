import * as Express from 'express';
import * as HTTP_CODES from 'http-status';

import EmailService from '../providers/services/email';

export default class ExampleController {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  public async send(req: Express.Request, res: Express.Response) {
    try {
      const body = req.body;
      await this.emailService.sendEmail(body);
      res.send({ message: 'Email successfully sent.' });
    } catch (error) {
      console.error('EmailController - send: ', error);
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
        message: 'It was not possible to send the email. Try again later.'
      });
    }
  }
}
