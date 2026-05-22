import { jerseyRepository } from "../repositories/jerseys";
import type { JerseyListQuery } from "../validation/jerseys";
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
