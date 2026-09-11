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

const updateTask = async (taskId, userId, data) => {
    const existingTask = await prisma.task.findFirst({
        where: {
            id: taskId,
            userId,
        },
    });
    if (!existingTask) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }
    const task = await prisma.task.update({
        where: {
            id: taskId,
        },
        data,
    });
    return task;
    
}
const deleteTask = async (taskId, userId) => {
    const existingTask = await prisma.task.findFirst({
        where: {
            id: taskId,
            userId,
        },
    });
    if (!existingTask) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }
    await prisma.task.delete({
        where: {
            id: taskId,
        },
    });
}
export { createTask, getTasksByUser, getTaskById, updateTask, deleteTask };