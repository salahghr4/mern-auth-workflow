import { Router } from "express";
import { loginHandler, registerHandler } from "../controllers/auth.controller";

const authroutes = Router();

authroutes.post("/register", registerHandler);
authroutes.post("/login", loginHandler);

export default authroutes;
