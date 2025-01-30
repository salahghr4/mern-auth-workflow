import AppErrorCode from "../core/constants/appErrorCodes";
import { HttpStatusCode } from "../core/constants/http";

class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
    public errorCode?: AppErrorCode
  ) {
    super(message);
  }
}

export default AppError;
