import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { jerseySeedData } from "./seed-data";

export const seedJerseys = async () => {
  await prisma.jersey.deleteMany();
  await prisma.jersey.createMany({ data: jerseySeedData });
  // Reset auto-increment sequence so new creates don't collide with seeded IDs
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"Jersey"', 'id'), (SELECT MAX(id) FROM "Jersey"))`
  );
};

export const seedAdmin = async () => {
  await prisma.admin.deleteMany();
  const hash = await bcrypt.hash("admin123", 10);
  await prisma.admin.create({
    data: { username: "admin", password: hash },
  });
};
