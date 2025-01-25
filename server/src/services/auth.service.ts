import jwt from "jsonwebtoken";
import env from "../core/constants/env";
import VerificationCodeType from "../core/constants/verificationCodeType";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import { oneYearFromNow } from "../utils/date";
type createAccountParams = {
  username: string;
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: createAccountParams) => {
  const userExist = await UserModel.exists({ email: data.email });
  if (userExist) {
    throw new Error("User already exists");
  }

  const user = await UserModel.create({
    username: data.username,
    email: data.email,
    password: data.password,
  });

  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  const refreshToken = jwt.sign(
    { userId: user._id },
    env.REFRESH_TOKEN.secret,
    { expiresIn: env.REFRESH_TOKEN.expireIn }
  );

  const accessToken = jwt.sign({ userId: user._id }, env.ACCESS_TOKEN.secret, {
    expiresIn: env.ACCESS_TOKEN.expireIn,
  });

  return { user, accessToken, refreshToken };
};
