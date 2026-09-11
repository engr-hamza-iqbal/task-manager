import assert from "node:assert/strict";
import { test } from "node:test";
import { errorHandler } from "../../src/middleware/error.middleware.js";
import notFound from "../../src/middleware/not-found.middleware.js";
import ApiError from "../../src/utils/api-error.js";

const createResponse = () => {
  const response = {};
  response.status = (statusCode) => {
    response.statusCode = statusCode;
    return response;
  };
  response.json = (body) => {
    response.body = body;
    return response;
  };
  return response;
};

test("ApiError stores status code and message", () => {
  const error = new ApiError(422, "Invalid payload");

  assert.equal(error.name, "ApiError");
  assert.equal(error.statusCode, 422);
  assert.equal(error.message, "Invalid payload");
});

test("notFound returns a JSON 404 response", () => {
  const response = createResponse();

  notFound({ method: "GET", originalUrl: "/missing" }, response);

  assert.equal(response.statusCode, 404);
  assert.deepEqual(response.body, { message: "Route not found: GET /missing" });
});

test("errorHandler returns known application errors", () => {
  const response = createResponse();

  errorHandler(new ApiError(400, "Invalid payload"), {}, response, () => {});

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, { message: "Invalid payload" });
});

test("errorHandler hides unexpected internal error details", () => {
  const response = createResponse();
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    errorHandler(new Error("database password"), {}, response, () => {});
  } finally {
    console.error = originalConsoleError;
  }

  assert.equal(response.statusCode, 500);
  assert.deepEqual(response.body, { message: "Internal server error" });
});
