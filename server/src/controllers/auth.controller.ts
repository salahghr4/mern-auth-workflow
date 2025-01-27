import env from "../core/constants/env";
import { CREATED, OK } from "../core/constants/http";
import asynchandler from "../middleware/asyncHandler";
import { createAccount, loginUser } from "../services/auth.service";
import { setAuthCookie } from "../utils/cookies";
import { registerSchema } from "../validation/auth.validator";

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
    .json({ user, accessToken, message: "Login successful" });
});
