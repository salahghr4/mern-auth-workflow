import nodeMailer from "nodemailer";
import env from "../core/constants/env";
import {
  getPasswordResetTemplate,
  getVerifyEmailTemplate,
} from "./emailTemplates";
import { ObjectId } from "mongoose";

type emailParams = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

const emailTransporter = nodeMailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.MAILER_USER,
    pass: env.MAILER_PASS,
  },
});

export const sendMail = async (mailoptions: emailParams) => {
  await emailTransporter.sendMail({
    from: env.MAILER_USER,
    ...mailoptions,
  });
};

export const sendVerificationEmail = async (email: string, code: ObjectId) => {
  const url = `${env.APP_ORIGIN}/email/verify/${code}`;
  sendMail({
    to: email,
    ...getVerifyEmailTemplate(url),
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  code: ObjectId,
  exipresAt: number
) => {
  const url = `${env.APP_ORIGIN}/password/reset?code=${code}&expiresAt=${exipresAt}`;
  sendMail({
    to: email,
    ...getPasswordResetTemplate(url),
  });
};
