import { Router } from "express";
import {
  loginHandler,
  logoutHandler,
  refreshTokenHandler,
  registerHandler,
} from "../controllers/auth.controller";

const authroutes = Router();

authroutes.post("/register", registerHandler);
authroutes.post("/login", loginHandler);
authroutes.post("/logout", logoutHandler);
authroutes.get("/refresh-token", refreshTokenHandler)

export default authroutes;
