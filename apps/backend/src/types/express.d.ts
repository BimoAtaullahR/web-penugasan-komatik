import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      admin?: JwtPayload | { id: number; username: string };
    }
  }
}

export {};
