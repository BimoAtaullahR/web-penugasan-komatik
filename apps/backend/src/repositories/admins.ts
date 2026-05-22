import { prisma } from "../prisma";

export const adminRepository = {
  findByUsername(username: string) {
    return prisma.admin.findUnique({ where: { username } });
  },
};
