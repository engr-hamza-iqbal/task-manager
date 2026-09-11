import express from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { removeMe } from "./user.controller.js";

const router = express.Router();

router.delete("/me", authenticate, removeMe);

export default router;
