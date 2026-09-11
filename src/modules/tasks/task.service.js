import prisma from "../../db/prisma.js";

const createTask = async ({ title, description, userId }) => {
    const task = await prisma.task.create({
        data: {
            title,
            description,
            userId,
        },
    });
    return task;
}
const getTasksByUser = async (userId) => {
    const tasks = await prisma.task.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return tasks;
}

const getTaskById = async (taskId, userId) => {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            userId,
        },
    });
    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }
    return task;
}
export { createTask, getTasksByUser, getTaskById };