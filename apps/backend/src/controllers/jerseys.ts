import type { Request, Response, NextFunction } from "express";
import {
  parseJerseyCreatePayload,
  parseJerseyId,
  parseJerseyListQuery,
  parseJerseyUpdatePayload,
} from "../validation/jerseys";
import {
  createJersey,
  deleteJersey,
  getJerseyById,
  listJerseys,
  updateJersey,
} from "../services/jerseys";

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

export const createJerseyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = parseJerseyCreatePayload(req.body);
    const jersey = await createJersey(payload);
    res.status(201).json({ success: true, data: jersey });
  } catch (error) {
    next(error);
  }
};

export const updateJerseyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseJerseyId(req.params.id);
    const payload = parseJerseyUpdatePayload(req.body);
    const jersey = await updateJersey(id, payload);
    res.json({ success: true, data: jersey });
  } catch (error) {
    next(error);
  }
};

export const deleteJerseyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseJerseyId(req.params.id);
    await deleteJersey(id);
    res.json({ success: true, message: "Jersey deleted" });
  } catch (error) {
    next(error);
  }
};
