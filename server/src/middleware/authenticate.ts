import AppErrorCode from "../core/constants/appErrorCodes";
import env from "../core/constants/env";
import { UNAUTHORIZED } from "../core/constants/http";
import appAssert from "../utils/appAssert";
import { verifyToken } from "../utils/tokens";
import asynchandler from "./asyncHandler";

const authenticate = asynchandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  appAssert(
    authHeader && authHeader.startsWith("Bearer "),
    UNAUTHORIZED,
    "Not authorized",
    AppErrorCode.InvalidAuthorizationHeader
  );

  const accessToken = authHeader.split(" ")[1];
  const { error, payload } = verifyToken(accessToken, env.ACCESS_TOKEN.secret);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    AppErrorCode.InvalidAccessToken
  );

  res.locals.userId = payload.userId;
  next();
});

export default authenticate;
