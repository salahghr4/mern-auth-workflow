import { NOT_FOUND, OK } from "../core/constants/http";
import asynchandler from "../middleware/asyncHandler";
import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";

export const getUserHandler = asynchandler(async (req, res) => {
  const user = await UserModel.findById(res.locals.userId);
  appAssert(user, NOT_FOUND, "User not found");
  res.status(OK).json({ user: user.omitPassword() });
});
