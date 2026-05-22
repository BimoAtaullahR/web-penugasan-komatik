import type { Request, Response, NextFunction } from "express";
import { parseJerseyListQuery } from "../validation/jerseys";
import { listJerseys } from "../services/jerseys";

export const listJerseysController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = parseJerseyListQuery(req.query);
    const result = await listJerseys(query);
    res.json({ success: true, data: result.data, meta: result.meta });
  } catch (error) {
    next(error);
  }
};
