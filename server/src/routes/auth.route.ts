import { Router } from "express";
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from "../controllers/auth.controller";

const authroutes = Router();

authroutes.post("/register", registerHandler);
authroutes.post("/login", loginHandler);
authroutes.post("/logout", logoutHandler);

export default authroutes;
