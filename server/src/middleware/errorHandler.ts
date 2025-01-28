import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../core/constants/http";
import z from "zod";
import AppError from "../utils/AppError";
import env from "../core/constants/env";
import { clearAuthCookie } from "../utils/cookies";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));

  res.status(BAD_REQUEST).json({
    errors: errors,
  });
};

const handleAppError = (res: Response, error: AppError) => {
  res.status(error.statusCode).json({ message: error.message });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH ${req.path}`, error);

  if (req.path === `${env.API_PREFIX}/auth/refresh-token`) {
    clearAuthCookie(res);
  }

  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }

  if (error instanceof AppError) {
    return handleAppError(res, error);
  }

  res.status(INTERNAL_SERVER_ERROR).send("Internal server error");
  return;
};

export default errorHandler;
