import bcrypt from "bcrypt";

export function saltPassword(password: string) {
  return bcrypt.hash(password, 10);
}