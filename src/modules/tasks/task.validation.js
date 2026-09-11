import ApiError from "../../utils/api-error.js";

const validateTaskId = (req, res, next) => {
	const taskId = Number(req.params.id);

	if (!Number.isInteger(taskId) || taskId < 1) {
		return next(new ApiError(400, "Task ID must be a positive integer"));
	}

	req.params.id = taskId;
	next();
};

const validateCreateTask = (req, res, next) => {
	const { title, completed } = req.body || {};

	if (!title || !title.trim()) {
		return next(new ApiError(400, "Title is required"));
	}

	if (completed !== undefined && typeof completed !== "boolean") {
		return next(new ApiError(400, "Completed must be a boolean"));
	}

	next();
};

const validateUpdateTask = (req, res, next) => {
	const { title, description, completed } = req.body || {};

	if (title === undefined && description === undefined && completed === undefined) {
		return next(new ApiError(400, "At least one field must be updated"));
	}

	if (title !== undefined && (!title || !title.trim())) {
		return next(new ApiError(400, "Title cannot be empty"));
	}

	if (completed !== undefined && typeof completed !== "boolean") {
		return next(new ApiError(400, "Completed must be a boolean"));
	}

	next();
};

export { validateTaskId, validateCreateTask, validateUpdateTask };
