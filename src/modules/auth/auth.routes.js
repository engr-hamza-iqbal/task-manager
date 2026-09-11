import express from "express";
import { register, login, logout } from "./auth.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { validateLogin, validateRegister } from "./auth.validation.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, (req, res) => {
    res.status(200).json({ user: req.user, message: "Authentication successful" });
});

export default router;