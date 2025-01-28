import jwt, { SignOptions } from "jsonwebtoken";
import env from "../core/constants/env";
import { UserDocument } from "../models/user.model";

type Payload = {
  userId: UserDocument["_id"];
};

type decodedToken = Payload & {
  iat: number
  exp: number
}

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
  return jwt.sign({ ...payload }, secret, { ...signOpts });
};

export const verifyToken = (token: string, secret: string) => {
  try {
    const payload = jwt.verify(token, secret) as decodedToken;
    return { payload };
  } catch (error: any) {
    return { error: error.message };
  }
};
