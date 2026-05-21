import { prisma } from "./prisma";
import { jerseySeedData } from "./seed-data";

export const seedJerseys = async () => {
  await prisma.jersey.deleteMany();
  await prisma.jersey.createMany({ data: jerseySeedData });
};
