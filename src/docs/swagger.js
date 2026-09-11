const swaggerSpec = {
	openapi: "3.0.3",
	info: {
		title: "Task Management API",
		version: "1.0.0",
		description: "REST API for user authentication and task management.",
	},
	servers: [
		{
			url: "http://localhost:3000",
		},
	],
	tags: [
		{ name: "Authentication" },
		{ name: "Users" },
		{ name: "Tasks" },
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
		schemas: {
			UserCredentials: {
				type: "object",
				required: ["email", "password"],
				properties: {
					email: { type: "string", format: "email", example: "user@example.com" },
					password: { type: "string", format: "password", example: "password123" },
				},
			},
			RegisterRequest: {
				allOf: [
					{
						$ref: "#/components/schemas/UserCredentials",
					},
					{
						type: "object",
						required: ["name"],
						properties: {
							name: { type: "string", example: "Alex User" },
						},
					},
				],
			},
			TaskInput: {
				type: "object",
				required: ["title"],
				properties: {
					title: { type: "string", example: "Review pull request" },
					description: { type: "string", nullable: true, example: "Check the API changes" },
					completed: { type: "boolean", example: false },
				},
			},
			Task: {
				allOf: [
					{ $ref: "#/components/schemas/TaskInput" },
					{
						type: "object",
						properties: {
							id: { type: "integer", example: 1 },
							userId: { type: "integer", example: 1 },
							createdAt: { type: "string", format: "date-time" },
							updatedAt: { type: "string", format: "date-time" },
						},
					},
				],
			},
		},
	},
	paths: {
		"/api/auth/register": {
			post: {
				tags: ["Authentication"],
				summary: "Register a user",
				requestBody: {
					required: true,
					content: {
						"application/json": { schema: { $ref: "#/components/schemas/RegisterRequest" } },
					},
				},
				responses: {
					201: { description: "User registered successfully" },
					400: { description: "Missing required fields" },
					409: { description: "Email is already registered" },
				},
			},
		},
		"/api/auth/login": {
			post: {
				tags: ["Authentication"],
				summary: "Log in a user",
				requestBody: {
					required: true,
					content: {
						"application/json": { schema: { $ref: "#/components/schemas/UserCredentials" } },
					},
				},
				responses: {
					200: { description: "User logged in successfully" },
					400: { description: "Missing email or password" },
					401: { description: "Invalid password" },
					404: { description: "User not found" },
				},
			},
		},
		"/api/auth/me": {
			get: {
				tags: ["Authentication"],
				summary: "Get the authenticated user token payload",
				security: [{ bearerAuth: [] }],
				responses: {
					200: { description: "Authentication successful" },
					401: { description: "Invalid or missing token" },
				},
			},
		},
		"/api/auth/logout": {
			post: {
				tags: ["Authentication"],
				summary: "Log out the authenticated user",
							   description: "The current JWT is revoked immediately. The client should also remove its local copy.",
				security: [{ bearerAuth: [] }],
				responses: {
					200: { description: "Logout acknowledged" },
					401: { description: "Invalid or missing token" },
				},
			},
		},
		"/api/users/me": {
			delete: {
				tags: ["Users"],
				summary: "Delete the authenticated user account",
				description: "Deletes the user and cascades deletion to the user's tasks.",
				security: [{ bearerAuth: [] }],
				responses: {
					200: { description: "User account deleted successfully" },
					401: { description: "Invalid or missing token" },
					404: { description: "User not found" },
				},
			},
		},
		"/api/tasks": {
			post: {
				tags: ["Tasks"],
				summary: "Create a task",
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						"application/json": { schema: { $ref: "#/components/schemas/TaskInput" } },
					},
				},
				responses: {
					201: { description: "Task created successfully" },
					400: { description: "Title is required" },
					401: { description: "Invalid or missing token" },
				},
			},
			get: {
				tags: ["Tasks"],
				summary: "Get all tasks for the authenticated user",
				security: [{ bearerAuth: [] }],
				responses: {
					200: {
						description: "Tasks retrieved successfully",
						content: {
							"application/json": {
								schema: { type: "object", properties: { tasks: { type: "array", items: { $ref: "#/components/schemas/Task" } } } },
							},
						},
					},
					401: { description: "Invalid or missing token" },
				},
			},
		},
		"/api/tasks/{id}": {
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: { type: "integer", minimum: 1 },
				},
			],
			get: {
				tags: ["Tasks"],
				summary: "Get one task",
				security: [{ bearerAuth: [] }],
				responses: {
					200: { description: "Task retrieved successfully" },
					400: { description: "Task ID must be a number" },
					401: { description: "Invalid or missing token" },
					404: { description: "Task not found" },
				},
			},
			put: {
				tags: ["Tasks"],
				summary: "Update a task",
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						"application/json": { schema: { $ref: "#/components/schemas/TaskInput" } },
					},
				},
				responses: {
					200: { description: "Task updated successfully" },
					400: { description: "Invalid task ID or empty update" },
					401: { description: "Invalid or missing token" },
					404: { description: "Task not found" },
				},
			},
			delete: {
				tags: ["Tasks"],
				summary: "Delete a task",
				security: [{ bearerAuth: [] }],
				responses: {
					200: { description: "Task deleted successfully" },
					400: { description: "Task ID must be a number" },
					401: { description: "Invalid or missing token" },
					404: { description: "Task not found" },
				},
			},
		},
	},
};

export default swaggerSpec;
