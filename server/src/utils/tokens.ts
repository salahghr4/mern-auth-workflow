import env from "../core/constants/env";
import { UserDocument } from "../models/user.model";
import jwt, { SignOptions } from "jsonwebtoken";

type Payload = {
  userId: UserDocument["_id"];
};

type SignOptionsWithSecret = SignOptions & {
  secret: string;
};

export const refreshTokenOptions: SignOptionsWithSecret = {
  secret: env.REFRESH_TOKEN.secret,
  expiresIn: env.REFRESH_TOKEN.expireIn,
};

const accessTokenOptions: SignOptionsWithSecret = {
  secret: env.ACCESS_TOKEN.secret,
  expiresIn: env.ACCESS_TOKEN.expireIn,
};

export const signToken = (
  payload: Payload,
  options?: SignOptionsWithSecret
) => {
  const { secret, ...signOpts } = options || accessTokenOptions;
  return jwt.sign({...payload}, secret, { ...signOpts });
};
