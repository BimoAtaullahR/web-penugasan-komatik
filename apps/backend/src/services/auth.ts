import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../middleware/errors";
import { adminRepository } from "../repositories/admins";
import type { LoginPayload } from "../validation/auth";

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";

export const loginAdmin = async ({ username, password }: LoginPayload) => {
  const admin = await adminRepository.findByUsername(username);
  if (!admin) {
    throw new AppError("Invalid credentials", 401);
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, {
    expiresIn: "24h",
  });

  return { admin: { id: admin.id, username: admin.username }, token };
};

export const verifyAdminToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number; username: string };
  } catch {
    throw new AppError("Invalid or expired token", 401);
  }
};
