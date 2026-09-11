import assert from "node:assert/strict";
import { test } from "node:test";
import { validateLogin, validateRegister } from "../../src/modules/auth/auth.validation.js";
import {
  validateCreateTask,
  validateTaskId,
  validateUpdateTask,
} from "../../src/modules/tasks/task.validation.js";

const runMiddleware = (middleware, request) => {
  let nextError;
  let nextCalled = false;

  middleware(request, {}, (error) => {
    nextError = error;
    nextCalled = true;
  });

  return { nextCalled, nextError };
};

test("validateRegister accepts a valid registration payload", () => {
  const result = runMiddleware(validateRegister, {
    body: { name: "Alex", email: "alex@example.com", password: "password123" },
  });

  assert.equal(result.nextCalled, true);
  assert.equal(result.nextError, undefined);
});

test("validateRegister rejects a short password", () => {
  const result = runMiddleware(validateRegister, {
    body: { name: "Alex", email: "alex@example.com", password: "short" },
  });

  assert.equal(result.nextError.statusCode, 400);
  assert.equal(result.nextError.message, "Password must be at least 8 characters");
});

test("validateLogin rejects missing credentials", () => {
  const result = runMiddleware(validateLogin, { body: { email: "alex@example.com" } });

  assert.equal(result.nextError.statusCode, 400);
  assert.equal(result.nextError.message, "Email and password are required");
});

test("validateCreateTask rejects non-boolean completed values", () => {
  const result = runMiddleware(validateCreateTask, {
    body: { title: "Write tests", completed: "false" },
  });

  assert.equal(result.nextError.statusCode, 400);
  assert.equal(result.nextError.message, "Completed must be a boolean");
});

test("validateUpdateTask rejects an empty update", () => {
  const result = runMiddleware(validateUpdateTask, { body: {} });

  assert.equal(result.nextError.statusCode, 400);
  assert.equal(result.nextError.message, "At least one field must be updated");
});

test("validateTaskId converts a positive ID to a number", () => {
  const request = { params: { id: "12" } };
  const result = runMiddleware(validateTaskId, request);

  assert.equal(result.nextError, undefined);
  assert.equal(request.params.id, 12);
});

test("validateTaskId rejects invalid IDs", () => {
  const result = runMiddleware(validateTaskId, { params: { id: "abc" } });

  assert.equal(result.nextError.statusCode, 400);
  assert.equal(result.nextError.message, "Task ID must be a positive integer");
});
