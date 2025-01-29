import { Router } from "express";
import {
  emailVerifyHandler,
  forgotPasswordHandler,
  loginHandler,
  logoutHandler,
  refreshTokenHandler,
  registerHandler,
  resetPasswordHandler,
} from "../controllers/auth.controller";

const authroutes = Router();

authroutes.post("/register", registerHandler);
authroutes.post("/login", loginHandler);
authroutes.post("/logout", logoutHandler);
authroutes.get("/refresh-token", refreshTokenHandler);
authroutes.patch("/email/verify/:code", emailVerifyHandler);
authroutes.post("/password/forgot", forgotPasswordHandler);
authroutes.patch("/password/reset", resetPasswordHandler);

export default authroutes;
