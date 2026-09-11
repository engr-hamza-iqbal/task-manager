import express from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { 
    create, 
    getTasks, 
    getTask,
    update,
    remove
} from "./task.controller.js";

const router = express.Router();

router.post("/", authenticate, create);
router.get("/", authenticate, getTasks);
router.get("/:id", authenticate, getTask);
router.put("/:id", authenticate, update);
router.delete("/:id", authenticate, remove);

export default router;