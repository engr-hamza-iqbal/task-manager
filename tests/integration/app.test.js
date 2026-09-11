import assert from "node:assert/strict";
import { test } from "node:test";
import jwt from "jsonwebtoken";
import request from "supertest";
import app from "../../src/app.js";
import swaggerSpec from "../../src/docs/swagger.js";

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

test("Swagger documents logout and account deletion", async () => {
	const response = await request(app).get("/api-docs/");

	assert.equal(response.status, 200);
	assert.ok(swaggerSpec.paths["/api/auth/logout"].post);
	assert.ok(swaggerSpec.paths["/api/users/me"].delete);
});

test("logout requires authentication", async () => {
	const response = await request(app).post("/api/auth/logout");

	assert.equal(response.status, 401);
	assert.equal(response.body.message, "Authentication token is required");
});

test("logout acknowledges a valid token without database access", async () => {
	const secret = process.env.JWT_SECRET || "test-secret";
	process.env.JWT_SECRET = secret;
	const token = jwt.sign({ userId: 1, email: "user@example.com" }, secret);

	const response = await request(app)
		.post("/api/auth/logout")
		.set("Authorization", `Bearer ${token}`);

	assert.equal(response.status, 200);
	assert.match(response.body.message, /Logged out successfully/);
});

test("account deletion requires authentication", async () => {
	const response = await request(app).delete("/api/users/me");

	assert.equal(response.status, 401);
	assert.equal(response.body.message, "Authentication token is required");
});
