import type { Request, Response, NextFunction } from "express";
import { AppError } from "./errors";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors,
    });
    return;
  }

  console.error(error);
  res.status(500).json({ success: false, message: "Internal server error" });
};
