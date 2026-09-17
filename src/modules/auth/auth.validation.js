import ApiError from "../../utils/api-error.js";

const validateRegister = (req, res, next) => {
	const { name, email, password } = req.body || {};

	if (!name || !email || !password) {
		return next(new ApiError(400, "Name, email and password are required"));
	}

	if (!/^\S+@\S+\.\S+$/.test(email)) {
		return next(new ApiError(400, "A valid email is required"));
	}

	if (password.length < 8) {
		return next(new ApiError(400, "Password must be at least 8 characters"));
	}

	next();
};

const validateLogin = (req, res, next) => {
	const { email, password } = req.body || {};

	if (!email || !password) {
		return next(new ApiError(400, "Email and password are required"));
	}
	if (!/^\S+@\S+\.\S+$/.test(email)) {
		return next(new ApiError(400, "A valid email is required"));
	}

	next();
};

export { validateRegister, validateLogin };
