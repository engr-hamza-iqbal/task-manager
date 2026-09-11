import assert from "node:assert/strict";
import { test } from "node:test";
import request from "supertest";
import app from "../../src/app.js";

test("GET /api-docs/ serves the Swagger UI", async () => {
  const response = await request(app).get("/api-docs/");

  assert.equal(response.status, 200);
  assert.match(response.text, /swagger-ui/);
});

test("protected task routes reject requests without a token", async () => {
  const response = await request(app).get("/api/tasks");

  assert.equal(response.status, 401);
  assert.equal(response.body.message, "Authentication token is required");
});

test("registration validates required fields", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({ email: "user@example.com" });

  assert.equal(response.status, 400);
  assert.equal(response.body.message, "Name, email and password are required");
});

test("login validates required fields", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({ email: "user@example.com" });

  assert.equal(response.status, 400);
  assert.equal(response.body.message, "Email and password are required");
});
