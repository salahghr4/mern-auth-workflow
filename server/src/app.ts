import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import env from "./core/constants/env";
import { OK } from "./core/constants/http";
import errorHandler from "./middleware/errorHandler";
import authroutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import authenticate from "./middleware/authenticate";
const app = express();

app.use(express.json());

app.use(cors({ origin: env.APP_ORIGIN, credentials: true }));
app.use(cookieParser());

app.use(`${env.API_PREFIX}/auth`, authroutes);
app.use(`${env.API_PREFIX}/user`, authenticate, userRoutes);

app.get("/", (req, res) => {
  res.status(OK).json({ status: "good" });
});

app.use(errorHandler);

export default app;
