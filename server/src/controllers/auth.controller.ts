import { CREATED, OK, UNAUTHORIZED } from "../core/constants/http";
import asynchandler from "../middleware/asyncHandler";
import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
  verifyEmail,
} from "../services/auth.service";
import appAssert from "../utils/appAssert";
import { clearAuthCookie, setAuthCookie } from "../utils/cookies";
import {
  registerSchema,
  verificationCodeSchema,
} from "../validation/auth.validator";

export const registerHandler = asynchandler(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await createAccount(request);

  setAuthCookie({ res, refreshToken })
    .status(CREATED)
    .json({ user, accessToken, message: "Registration successful" });
});

export const loginHandler = asynchandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await loginUser({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  setAuthCookie({ res, refreshToken })
    .status(OK)
    .json({ user, accessToken, message: "Logged in successfully" });
});

export const logoutHandler = asynchandler(async (req, res) => {
  clearAuthCookie(res).status(OK).json({ message: "Logged out successfully" });
});

export const refreshTokenHandler = asynchandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string | undefined;
  appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

  const { accessToken } = await refreshUserAccessToken(refreshToken);
  res.status(OK).json({ accessToken, message: "Access token refreshed" });
});

export const emailVerifyHandler = asynchandler(async (req, res) => {
  const { verificationCode } = verificationCodeSchema.parse({
    verificationCode: req.params.code,
  });

  await verifyEmail(verificationCode);
  res.status(OK).json({ message: "Email was successfully verified" });
});
