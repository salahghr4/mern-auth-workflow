import { Response } from "express";
import env from "../core/constants/env";

type Params = {
  res: Response;
  refreshToken: string;
};

export const setAuthCookie = ({ res, refreshToken }: Params) => {
  return res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV !== "development",
    sameSite: "strict",
    path: `${env.API_PREFIX}/auth/refresh-token`,
    maxAge: env.REFRESH_TOKEN.expireIn * 1000,
  });
};
