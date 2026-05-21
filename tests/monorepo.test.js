const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const readJson = (relativePath) => {
  const fullPath = path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf-8"));
};

test("root package.json declares workspaces and dev scripts", () => {
  const pkg = readJson("package.json");

  assert.ok(Array.isArray(pkg.workspaces), "workspaces should be an array");
  assert.ok(pkg.scripts?.["dev:frontend"], "dev:frontend script should exist");
  assert.ok(pkg.scripts?.["dev:backend"], "dev:backend script should exist");
});

test("frontend and backend workspaces are present", () => {
  const frontendPkg = readJson("apps/frontend/package.json");
  const backendPkg = readJson("apps/backend/package.json");

  assert.equal(frontendPkg.name, "frontend");
  assert.equal(backendPkg.name, "backend");
});
