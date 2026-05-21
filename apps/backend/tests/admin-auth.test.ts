import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import request from "supertest";
import bcrypt from "bcryptjs";

process.env.DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5433/komatik?schema=public";

process.env.JWT_SECRET = "test-secret-key";

let app: any;
let prisma: any;

const schemaPath = "apps/backend/prisma/schema.prisma";

before(async () => {
  execSync(`npx prisma generate --schema ${schemaPath}`, { stdio: "inherit" });
  execSync(`npx prisma db push --schema ${schemaPath}`, { stdio: "inherit" });
  const appModule = await import("../src/app");
  const prismaModule = await import("../src/prisma");
  app = appModule.app;
  prisma = prismaModule.prisma;

  // Seed a test admin
  const hash = await bcrypt.hash("admin123", 10);
  await prisma.admin.deleteMany();
  await prisma.admin.create({
    data: { username: "admin", password: hash },
  });
});

after(async () => {
  if (prisma) {
    await prisma.admin.deleteMany();
    await prisma.$disconnect();
  }
});

test("POST /api/v1/auth/login with valid credentials returns 200 and sets cookie", async () => {
  const response = await request(app)
    .post("/api/v1/auth/login")
    .send({ username: "admin", password: "admin123" });

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);

  const cookies = response.headers["set-cookie"];
  assert.ok(cookies, "Response should set a cookie");
  const tokenCookie = Array.isArray(cookies)
    ? cookies.find((c: string) => c.startsWith("token="))
    : cookies.startsWith("token=") ? cookies : null;
  assert.ok(tokenCookie, "Should set a 'token' cookie");
  assert.ok(tokenCookie.includes("HttpOnly"), "Cookie should be HttpOnly");
});

test("POST /api/v1/auth/login with wrong password returns 401", async () => {
  const response = await request(app)
    .post("/api/v1/auth/login")
    .send({ username: "admin", password: "wrongpassword" });

  assert.equal(response.status, 401);
  assert.equal(response.body.success, false);
  assert.equal(response.body.message, "Invalid credentials");
});

test("POST /api/v1/auth/login with non-existent user returns 401", async () => {
  const response = await request(app)
    .post("/api/v1/auth/login")
    .send({ username: "nobody", password: "admin123" });

  assert.equal(response.status, 401);
  assert.equal(response.body.success, false);
});

test("POST /api/v1/jerseys without auth returns 401", async () => {
  const response = await request(app)
    .post("/api/v1/jerseys")
    .send({ clubName: "Test FC" });

  assert.equal(response.status, 401);
  assert.equal(response.body.success, false);
});

// Helper: login and return cookie string
async function loginAdmin(): Promise<string> {
  const res = await request(app)
    .post("/api/v1/auth/login")
    .send({ username: "admin", password: "admin123" });
  const cookies = res.headers["set-cookie"];
  return Array.isArray(cookies) ? cookies[0] : cookies;
}

test("POST /api/v1/jerseys with auth creates a Jersey retrievable via GET", async () => {
  const cookie = await loginAdmin();

  const createRes = await request(app)
    .post("/api/v1/jerseys")
    .set("Cookie", cookie)
    .send({
      clubName: "Test FC",
      league: "Test League",
      country: "Testland",
      season: "2025/2026",
      kitType: "Home",
      issueType: "Fan Issue",
      brand: "TestBrand",
      gender: "Men",
      price: 500000,
      description: "A test jersey",
      image: "/images/test.png",
      rating: 4.0,
      isNew: true,
      stock: 10,
    });

  assert.equal(createRes.status, 201);
  assert.equal(createRes.body.success, true);
  assert.equal(createRes.body.data.clubName, "Test FC");
  const createdId = createRes.body.data.id;

  // Verify via public GET
  const getRes = await request(app).get(`/api/v1/jerseys/${createdId}`);
  assert.equal(getRes.status, 200);
  assert.equal(getRes.body.data.clubName, "Test FC");

  // Cleanup
  await prisma.jersey.delete({ where: { id: createdId } });
});

test("PUT /api/v1/jerseys/:id with auth updates a Jersey", async () => {
  const cookie = await loginAdmin();

  // Create a jersey to update
  const createRes = await request(app)
    .post("/api/v1/jerseys")
    .set("Cookie", cookie)
    .send({
      clubName: "Update FC",
      league: "Test League",
      country: "Testland",
      season: "2025/2026",
      kitType: "Home",
      issueType: "Fan Issue",
      brand: "TestBrand",
      gender: "Men",
      price: 500000,
      description: "Will be updated",
      image: "/images/test.png",
      rating: 4.0,
      isNew: true,
      stock: 10,
    });

  const id = createRes.body.data.id;

  const updateRes = await request(app)
    .put(`/api/v1/jerseys/${id}`)
    .set("Cookie", cookie)
    .send({ clubName: "Updated FC", price: 999000 });

  assert.equal(updateRes.status, 200);
  assert.equal(updateRes.body.success, true);
  assert.equal(updateRes.body.data.clubName, "Updated FC");
  assert.equal(updateRes.body.data.price, 999000);

  // Verify via GET
  const getRes = await request(app).get(`/api/v1/jerseys/${id}`);
  assert.equal(getRes.body.data.clubName, "Updated FC");

  // Cleanup
  await prisma.jersey.delete({ where: { id } });
});

test("PUT /api/v1/jerseys/:id returns 404 for non-existent Jersey", async () => {
  const cookie = await loginAdmin();

  const response = await request(app)
    .put("/api/v1/jerseys/99999")
    .set("Cookie", cookie)
    .send({ clubName: "Ghost FC" });

  assert.equal(response.status, 404);
  assert.equal(response.body.success, false);
});

test("DELETE /api/v1/jerseys/:id with auth removes a Jersey", async () => {
  const cookie = await loginAdmin();

  // Create a jersey to delete
  const createRes = await request(app)
    .post("/api/v1/jerseys")
    .set("Cookie", cookie)
    .send({
      clubName: "Delete FC",
      league: "Test League",
      country: "Testland",
      season: "2025/2026",
      kitType: "Home",
      issueType: "Fan Issue",
      brand: "TestBrand",
      gender: "Men",
      price: 500000,
      description: "Will be deleted",
      image: "/images/test.png",
      rating: 4.0,
      isNew: false,
      stock: 5,
    });

  const id = createRes.body.data.id;

  const deleteRes = await request(app)
    .delete(`/api/v1/jerseys/${id}`)
    .set("Cookie", cookie);

  assert.equal(deleteRes.status, 200);
  assert.equal(deleteRes.body.success, true);

  // Verify it's gone
  const getRes = await request(app).get(`/api/v1/jerseys/${id}`);
  assert.equal(getRes.status, 404);
});

test("POST /api/v1/jerseys with missing required fields returns 400", async () => {
  const cookie = await loginAdmin();

  const response = await request(app)
    .post("/api/v1/jerseys")
    .set("Cookie", cookie)
    .send({ clubName: "Incomplete FC" }); // missing most required fields

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
  assert.ok(response.body.errors, "Should include validation errors");
  assert.ok(response.body.errors.length > 0, "Should have at least one validation error");
});
