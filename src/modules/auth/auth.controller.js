import { registerUser, loginUser, revokeToken } from "./auth.service.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser({
      name,
      email,
      password,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser({
      email,
      password,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      ...user,
    });
  } catch (error) {
    next(error);
  }
}

const logout = async (req, res, next) => {
  try {
    await revokeToken({
      jti: req.user.jti,
      expiresAt: new Date(req.user.exp * 1000),
    });

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { register, login, logout };