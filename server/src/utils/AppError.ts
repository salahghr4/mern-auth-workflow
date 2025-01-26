import { HttpStatusCode } from "../core/constants/http";

class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string
  ) {
    super(message);
  }
}

export default AppError;
