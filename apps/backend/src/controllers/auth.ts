import type { Request, Response, NextFunction } from "express";
import { parseLoginPayload } from "../validation/auth";
import { loginAdmin } from "../services/auth";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = parseLoginPayload(req.body);
    const { admin, token } = await loginAdmin(payload);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, data: admin });
  } catch (error) {
    next(error);
  }
};

export const meController = (req: Request, res: Response) => {
  res.json({ success: true, data: req.admin });
};

export const logoutController = (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out" });
};
