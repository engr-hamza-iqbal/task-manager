import express from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { removeMe } from "./user.controller.js";
import { getMe, updateMe } from "./user.controller.js";
import { validateUpdateMe } from "./user.validation.js";

const router = express.Router();

router.get("/me", authenticate, getMe);
router.patch("/me", authenticate, validateUpdateMe, updateMe);
router.delete("/me", authenticate, removeMe);

export default router;
