import express from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { create, getTasks, getTask } from "./task.controller.js";

const router = express.Router();

router.post("/", authenticate, create);
router.get("/", authenticate, getTasks);
router.get("/:id", authenticate, getTask);

export default router;