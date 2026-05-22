import type { Request, Response, NextFunction } from "express";
import { AppError } from "./errors";
import { verifyAdminToken } from "../services/auth";

export const requireAdmin = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const headerToken = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  const token = headerToken || req.cookies?.token;
  if (!token) {
    next(new AppError("Authentication required", 401));
    return;
  }

  const payload = verifyAdminToken(token);
  req.admin = payload;
  next();
};
