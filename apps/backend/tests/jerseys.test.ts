import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import request from "supertest";

process.env.DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5433/komatik?schema=public";

let app;
let prisma;
let seedJerseys;

const schemaPath = "apps/backend/prisma/schema.prisma";

before(async () => {
  execSync(`npx prisma generate --schema ${schemaPath}`, { stdio: "inherit" });
  execSync(`npx prisma db push --schema ${schemaPath}`, { stdio: "inherit" });
  const appModule = await import("../src/app");
  const prismaModule = await import("../src/prisma");
  const seedModule = await import("../src/seed");
  app = appModule.app;
  prisma = prismaModule.prisma;
  seedJerseys = seedModule.seedJerseys;
  await seedJerseys();
});

after(async () => {
  if (prisma) {
    await prisma.$disconnect();
  }
});

test("GET /api/v1/jerseys returns seeded data with pagination meta", async () => {
  const response = await request(app).get("/api/v1/jerseys?limit=5&offset=0");

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.meta.limit, 5);
  assert.equal(response.body.meta.offset, 0);
  assert.ok(response.body.meta.total >= 1);
  assert.equal(response.body.data.length, 5);
});

test("GET /api/v1/jerseys/:id returns a jersey detail", async () => {
  const response = await request(app).get("/api/v1/jerseys/1");

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.data.id, 1);
  assert.ok(response.body.data.clubName);
});

test("GET /api/v1/jerseys?search=name filters by club name", async () => {
  const response = await request(app).get("/api/v1/jerseys?search=Barcelona");

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.ok(response.body.data.length > 0);
  assert.ok(response.body.data.every((j) => j.clubName.toLowerCase().includes("barcelona")));
});

test("GET /api/v1/jerseys?league=... filters by league", async () => {
  const response = await request(app).get("/api/v1/jerseys?league=Premier%20League");

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.ok(response.body.data.every((j) => j.league === "Premier League"));
});
