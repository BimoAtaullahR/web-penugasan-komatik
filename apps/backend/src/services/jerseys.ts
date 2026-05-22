import { jerseyRepository } from "../repositories/jerseys";
import type { JerseyListQuery } from "../validation/jerseys";

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
