import * as Express from 'express';
import * as HTTP_CODES from 'http-status';
import * as Joi from 'joi';
import { FieldRequest } from '../enums/validator';

export default class ExpressValidator {
  /**
   * Validates the specified part of a resuest (body, query, params...) based on a joi schema
   */
  public static validateRequest = (
    schema: Joi.ObjectSchema,
    field: FieldRequest
  ) => (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    schema
      .validate(req[field])
      .then((result) => {
        next();
      })
      .catch((error: Joi.ValidationError) => {
        let errorMessages: { message: string }[];
        errorMessages = Object.keys(error.details).map((errorField) => {
          return { message: error.details[Number(errorField)].message };
        });
        console.log('[ExpressValidator - validateRequest]: ', error);
        res.status(HTTP_CODES.BAD_REQUEST).send({ errors: errorMessages });
      });
  };
}
