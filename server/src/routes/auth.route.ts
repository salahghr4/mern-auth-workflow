import { Router } from "express";
import {
  emailVerifyHandler,
  forgotPasswordHandler,
  loginHandler,
  logoutHandler,
  refreshTokenHandler,
  registerHandler,
} from "../controllers/auth.controller";

const authroutes = Router();

authroutes.post("/register", registerHandler);
authroutes.post("/login", loginHandler);
authroutes.post("/logout", logoutHandler);
authroutes.get("/refresh-token", refreshTokenHandler);
authroutes.get("/email/verify/:code", emailVerifyHandler);
authroutes.post("/password/forgot", forgotPasswordHandler)

export default authroutes;
