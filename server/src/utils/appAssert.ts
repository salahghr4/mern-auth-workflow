import assert from "node:assert";
import { HttpStatusCode } from "../core/constants/http";
import AppError from "./AppError";
import AppErrorCode from "../core/constants/appErrorCodes";

type AppAssert = (
  condition: any,
  HttpStatusCode: HttpStatusCode,
  message: string,
  errorCode?: AppErrorCode
) => asserts condition;

/**
 * Asserts a condition and throws an AppError if the condition is falsy.
 */
const appAssert: AppAssert = (condition, httpStatusCode, message, errorCode) =>
  assert(condition, new AppError(httpStatusCode, message, errorCode));

export default appAssert;
