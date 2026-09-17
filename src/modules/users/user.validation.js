import ApiError from "../../utils/api-error.js";

const validateUpdateMe = (req, res, next) => {
	const { name, email } = req.body || {};

	if (name === undefined && email === undefined) {
		return next(new ApiError(400, "At least one profile field must be updated"));
	}
	if (name !== undefined && !name.trim()) {
		return next(new ApiError(400, "Name cannot be empty"));
	}
	if (email !== undefined && !email.trim().includes("@")) {
		return next(new ApiError(400, "A valid email is required"));
	}

	req.body.name = name?.trim();
	req.body.email = email?.trim().toLowerCase();
	next();
};

export { validateUpdateMe };
