import type { Request, Response, NextFunction } from "express";
import { parseJerseyId, parseJerseyListQuery } from "../validation/jerseys";
import { getJerseyById, listJerseys } from "../services/jerseys";

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

export const getJerseyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseJerseyId(req.params.id);
    const jersey = await getJerseyById(id);
    res.json({ success: true, data: jersey });
  } catch (error) {
    next(error);
  }
};
