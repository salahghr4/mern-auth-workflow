import z from "zod";

export const emailSchema = z
  .string()
  .email({ message: "Invalid email address" });

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be 8 or more characters long" })
  .max(255);

export const verificationCode = z
  .string()
  .min(24, { message: "Invalide verification code" })
  .max(24, { message: "Invalide verification code" });

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be 3 or more characters long" })
      .max(30),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verificationCodeSchema = z.object({
  verificationCode: verificationCode,
});

export const resetPassswordSchema = z.object({
  password: passwordSchema,
  verificationCode: verificationCode,
});
