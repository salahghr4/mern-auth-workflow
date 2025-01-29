import jwt from "jsonwebtoken";
import env from "../core/constants/env";
import VerificationCodeType from "../core/constants/verificationCodeType";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import { oneYearFromNow } from "../utils/date";
import appAssert from "../utils/appAssert";
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from "../core/constants/http";
import { refreshTokenOptions, signToken, verifyToken } from "../utils/tokens";
import { sendVerificationEmail } from "../utils/mailer";

type createAccountParams = {
  username: string;
  email: string;
  password: string;
  userAgent?: string;
};

type loginParams = Omit<createAccountParams, "username">;

export const createAccount = async (data: createAccountParams) => {
  const userExist = await UserModel.exists({ email: data.email });

  appAssert(!userExist, CONFLICT, "Email already in use");
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

  await sendVerificationEmail(user.email, verificationCode._id);

  const refreshToken = signToken({ userId: user._id }, refreshTokenOptions);
  const accessToken = signToken({ userId: user._id });

  return { user: user.omitPassword(), accessToken, refreshToken };
};

export const loginUser = async ({ email, password }: loginParams) => {
  const user = await UserModel.findOne({ email });
  appAssert(user, UNAUTHORIZED, "Invalid email or password");

  const isvalid = await user.comparePassword(password);
  appAssert(isvalid, UNAUTHORIZED, "Invalid email or password");

  const refreshToken = signToken({ userId: user._id }, refreshTokenOptions);
  const accessToken = signToken({ userId: user._id });

  return { user: user.omitPassword(), accessToken, refreshToken };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken(refreshToken, env.REFRESH_TOKEN.secret);
  appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

  const accessToken = signToken({ userId: payload.userId });
  return { accessToken };
};

export const verifyEmail = async (code: string) => {
  const validCode = await VerificationCodeModel.findOne({
    _id: code,
    type: VerificationCodeType.EmailVerification,
    expiresAt: { $gt: new Date() },
  });
  appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");

  const updatedUser = await UserModel.findByIdAndUpdate(
    validCode.userId,
    { verified: true },
    { new: true }
  );
  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to verify email");

  await validCode.deleteOne();
};
