import { prisma } from "../prisma";

export type JerseyFilters = {
  search?: string;
  league?: string;
  kitType?: string;
  issueType?: string;
  brand?: string;
};

export const jerseyRepository = {
  async findManyWithCount(filters: JerseyFilters, limit: number, offset: number) {
    const whereClause: any = {};

    if (filters.search) {
      whereClause.OR = [
        { clubName: { contains: filters.search, mode: "insensitive" } },
        { country: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    if (filters.league) whereClause.league = filters.league;
    if (filters.kitType) whereClause.kitType = filters.kitType;
    if (filters.issueType) whereClause.issueType = filters.issueType;
    if (filters.brand) whereClause.brand = filters.brand;

    const [total, data] = await Promise.all([
      prisma.jersey.count({ where: whereClause }),
      prisma.jersey.findMany({
        where: whereClause,
        take: limit,
        skip: offset,
        orderBy: { id: "asc" },
      }),
    ]);

    return { total, data };
  },
  async findById(id: number) {
    return prisma.jersey.findUnique({ where: { id } });
  },
};
