import env from "../core/constants/env";
import { CREATED } from "../core/constants/http";
import asynchandler from "../middleware/asyncHandler";
import { createAccount } from "../services/auth.service";
import { registerschema } from "../validation/auth.validator";

export const registerHandler = asynchandler(async (req, res) => {
  const request = registerschema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await createAccount(request);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV !== "development",
    sameSite: "strict",
    path: `${env.API_PREFIX}/auth/refresh-token`,
    maxAge: env.REFRESH_TOKEN.expireIn * 1000
  });
  res.status(CREATED).json({ user, accessToken });
});
