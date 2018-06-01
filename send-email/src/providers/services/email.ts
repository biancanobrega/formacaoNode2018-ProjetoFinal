import { createTransport, SendMailOptions } from 'nodemailer';
import { getServerConfigs } from '../../../config/config';

export default class EmailService {
  public sendEmail(email: SendMailOptions) {
    const config = getServerConfigs().service.email;
    const transport = createTransport({
      auth: {
        pass: config.auth.pass,
        user: config.auth.user,
      },
      host: config.host,
      port: config.port,
      secure: config.secure,
    });

    email.from = config.email;
    return transport.sendMail(email);
  }

}
