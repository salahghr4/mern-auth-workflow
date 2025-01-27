import env from "../core/constants/env";
import { CREATED, OK } from "../core/constants/http";
import asynchandler from "../middleware/asyncHandler";
import { createAccount, loginUser } from "../services/auth.service";
import { registerSchema } from "../validation/auth.validator";

export const registerHandler = asynchandler(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await createAccount(request);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV !== "development",
    sameSite: "strict",
    path: `${env.API_PREFIX}/auth/refresh-token`,
    maxAge: env.REFRESH_TOKEN.expireIn * 1000,
  });
  res
    .status(CREATED)
    .json({ user, accessToken, message: "Registration successful" });
});

export const loginHandler = asynchandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await loginUser({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV !== "development",
    sameSite: "strict",
    path: `${env.API_PREFIX}/auth/refresh-token`,
    maxAge: env.REFRESH_TOKEN.expireIn * 1000,
  });

  res.status(OK).json({ user, accessToken, message: "Login successful" });
});
