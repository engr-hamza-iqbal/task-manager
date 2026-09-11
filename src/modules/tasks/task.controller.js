import { 
    createTask, 
    getTasksByUser, 
    getTaskById, 
    updateTask,
    deleteTask
} from "./task.service.js";

const create = async (req, res, next) => {
    try {
        // console.log("Authenticated user:", req.user);
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        const task = await createTask({ 
            title, 
            description, 
            userId: req.user.userId 
        });
        return res.status(201).json({
            message: "Task created successfully",
            task
        });
    } catch (error) {
        next(error);
    }
}

const getTasks = async (req, res, next) => {
    try {
        const tasks = await getTasksByUser(req.user.userId);
        return res.status(200).json({
            message: "Tasks retrieved successfully",
            tasks
        });
    } catch (error) {
        next(error);
    }
}

const getTask = async (req, res, next) => {
    try {
        const taskId = Number(req.params.id);
        if (Number.isNaN(taskId)) {
            return res.status(400).json({ 
                message: "Task ID must be a number" 
            });
        }
        const task = await getTaskById(taskId, req.user.userId);
        return res.status(200).json({
            message: "Task retrieved successfully",
            task
        });
    } catch (error) {
        next(error);
    }
}
const update = async (req, res, next) => {
    try {
        const taskId = Number(req.params.id);

        if (Number.isNaN(taskId)) {
            return res.status(400).json({ 
                message: "Task ID must be a number" 
            });
        }

        const { title, description, completed } = req.body;

        if (
            title === undefined &&
            description === undefined &&
            completed === undefined
        ) {
            return res.status(400).json({ 
                message: "At least one field must be updated" 
            });
        }
        const data = {};
        if (title !== undefined) data.title = title;
        if (description !== undefined) data.description = description;
        if (completed !== undefined) data.completed = completed;

        const task = await updateTask(
            taskId, 
            req.user.userId, 
            data
        );
        return res.status(200).json({
            message: "Task updated successfully",
            task
        });
    } catch (error) {
        next(error);
    }
}
const remove = async (req, res, next) => {
    try {
        const taskId = Number(req.params.id);

        if (Number.isNaN(taskId)) {
            return res.status(400).json({ 
                message: "Task ID must be a number" 
            });
        }
        await deleteTask(taskId, req.user.userId);
        return res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}
export { create, getTasks, getTask, update, remove };