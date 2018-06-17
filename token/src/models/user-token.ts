import { Document, Schema, Types } from 'mongoose';
import * as Joi from 'joi';
import { getValues } from '../commons/enums';

export interface IUserTokenDocument extends Document {
  user: Types.ObjectId;
  created?: Date;
  validThru?: Date;
  hash?: string;
  removeOnFirstUse?: boolean;
}
export const UserTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required.']
  },
  created: { type: Date, default: Date.now },
  validThru: { type: Date, required: [true, 'Valid Thru is required.'] },
  hash: { type: String, required: [true, 'Hash is required.'] },
  removeOnFirstUse: {
    type: Boolean,
    required: [true, 'Remove on first use is required.']
  }
});

export interface IUserToken {
  user: string;
  created?: Date;
  validThru?: Date;
  hash?: string;
  removeOnFirstUse?: boolean;
}

export const UserTokenJoi = Joi.object({
  userId: Joi.string().required(),
  type: Joi.required().valid(...getValues())
});

export const UserTokenValidationRequestJoi = Joi.object({
  'x-user-access': Joi.string().required(),
  'x-user-id': Joi.string().required()
}).options({ allowUnknown: true });

export const parse = (userToken: IUserToken) => {
  return {
    user: Types.ObjectId(userToken.user),
    created: userToken.created,
    validThru: userToken.validThru,
    hash: userToken.hash,
    removeOnFirstUse: userToken.removeOnFirstUse
  };
};
