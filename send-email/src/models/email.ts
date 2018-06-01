import * as Joi from 'joi';

export const EmailJoi = Joi.object({
  to: Joi.string().required(),
  subject: Joi.string().required(),
  text: Joi.string().optional(),
  html: Joi.string().optional()
});
