import { Router } from "express";
import { registerHandler } from "../controllers/auth.controller";

const authroutes = Router();

authroutes.post("/register", registerHandler);

export default authroutes;
