import { Document, model, ObjectId, Schema } from "mongoose";
import VerificationCodeType from "../core/constants/verificationCodeType";

interface verificationCodeDocument extends Document {
  userId: ObjectId;
  type: VerificationCodeType;
  expiresAt: Date;
  createdAt: Date;
}

const verificationCodeSchema = new Schema<verificationCodeDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  type: { required: true, type: String },
  createdAt: { type: Date, default: Date.now, required: true },
  expiresAt: { type: Date, required: true },
});

const VerificationCodeModel = model<verificationCodeDocument>(
  "VerificationCode",
  verificationCodeSchema,
  "verification_codes"
);

export default VerificationCodeModel;
