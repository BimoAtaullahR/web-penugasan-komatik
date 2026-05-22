import { jerseyRepository } from "../repositories/jerseys";
import type {
  JerseyCreatePayload,
  JerseyListQuery,
  JerseyUpdatePayload,
} from "../validation/jerseys";
import { AppError } from "../middleware/errors";

export const listJerseys = async (query: JerseyListQuery) => {
  const { limit, offset, search, league, kitType, issueType, brand } = query;
  const { total, data } = await jerseyRepository.findManyWithCount(
    { search, league, kitType, issueType, brand },
    limit,
    offset
  );

  return {
    data,
    meta: { total, limit, offset },
  };
};

export const getJerseyById = async (id: number) => {
  const jersey = await jerseyRepository.findById(id);
  if (!jersey) {
    throw new AppError("Jersey not found", 404);
  }

  return jersey;
};

export const createJersey = async (payload: JerseyCreatePayload) => {
  return jerseyRepository.create(payload);
};

export const updateJersey = async (id: number, payload: JerseyUpdatePayload) => {
  const existing = await jerseyRepository.findById(id);
  if (!existing) {
    throw new AppError("Jersey not found", 404);
  }

  return jerseyRepository.update(id, payload);
};

export const deleteJersey = async (id: number) => {
  const existing = await jerseyRepository.findById(id);
  if (!existing) {
    throw new AppError("Jersey not found", 404);
  }

  await jerseyRepository.remove(id);
};
