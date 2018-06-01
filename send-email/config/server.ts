import * as Express from 'express';
import * as BodyParser from 'body-parser';

export function init() {
  const app = Express();

  app.use(BodyParser.urlencoded({ extended: true }));
  app.use(BodyParser.json());
  app.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With, content-type, Authorization'
    );
    next();
  });

  return app;
}
