import bcrypt from "bcrypt";

export const hashValue = async (value: string, salt?: number) =>
  bcrypt.hash(value, salt || 10);

export const compareValue = async (value: string, hashedValue: string) =>
  bcrypt.compare(value, hashedValue).catch(() => false);
