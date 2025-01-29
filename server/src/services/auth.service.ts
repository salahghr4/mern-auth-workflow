import env from "../core/constants/env";
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from "../core/constants/http";
import VerificationCodeType from "../core/constants/verificationCodeType";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import appAssert from "../utils/appAssert";
import { fiveMinutAgo, oneHourFromNow, oneYearFromNow } from "../utils/date";
import { sendPasswordResetEmail, sendVerificationEmail } from "../utils/mailer";
import { refreshTokenOptions, signToken, verifyToken } from "../utils/tokens";

type createAccountParams = {
  username: string;
  email: string;
  password: string;
  userAgent?: string;
};

type loginParams = Omit<createAccountParams, "username">;

type ResetPasswordParams = {
  password: string;
  verificationCode: string;
};

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

export const sendResetPasswordEmail = async (email: string) => {
  const user = await UserModel.findOne({ email: email });
  appAssert(user, NOT_FOUND, "User not found");

  // check for password reset requests (max 2 request in 5 min)
  const requestsCount = await VerificationCodeModel.countDocuments({
    userId: user._id,
    type: VerificationCodeType.PasswordVerification,
    createdAt: { $gt: fiveMinutAgo() },
  });
  appAssert(
    requestsCount <= 1,
    TOO_MANY_REQUESTS,
    "Too many requests, please try again later"
  );

  const exipresAt = oneHourFromNow();
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.PasswordVerification,
    expiresAt: exipresAt,
  });

  await sendPasswordResetEmail(
    email,
    verificationCode._id,
    exipresAt.getTime()
  );
  return;
};

export const resetPassword = async ({ password, verificationCode }: ResetPasswordParams) => {
  const valideCode = await VerificationCodeModel.findOne({
    _id: verificationCode,
    type: VerificationCodeType.PasswordVerification,
    expiresAt: { $gt: new Date() },
  });
  appAssert(valideCode, NOT_FOUND, "Invalid or expired verification code");

  const updatedUser = await UserModel.findByIdAndUpdate(valideCode.userId, {
    password: password,
  });
  appAssert(
    updatedUser,
    INTERNAL_SERVER_ERROR,
    "Failed to reset password, please try again later"
  );

  await valideCode.deleteOne();

  return { user: updatedUser.omitPassword() };
};
