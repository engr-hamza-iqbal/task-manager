import { 
    createTask, 
    getTasksByUser, 
    getTaskById, 
    updateTask,
    deleteTask
} from "./task.service.js";

const create = async (req, res, next) => {
    try {
        const { title, description } = req.body;
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
        const taskId = req.params.id;
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
        const taskId = req.params.id;

        const { title, description, completed } = req.body;
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
        const taskId = req.params.id;
        await deleteTask(taskId, req.user.userId);
        return res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}
export { create, getTasks, getTask, update, remove };