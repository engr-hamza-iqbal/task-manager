import express from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { 
    create, 
    getTasks, 
    getTask,
    update,
    remove
} from "./task.controller.js";
import {
    validateCreateTask,
    validateTaskId,
    validateUpdateTask,
} from "./task.validation.js";

const router = express.Router();

router.post("/", authenticate, validateCreateTask, create);
router.get("/", authenticate, getTasks);
router.get("/:id", authenticate, validateTaskId, getTask);
router.put("/:id", authenticate, validateTaskId, validateUpdateTask, update);
router.delete("/:id", authenticate, validateTaskId, remove);

export default router;