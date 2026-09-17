import prisma from "../../db/prisma.js";

const deleteUser = async (userId) => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { id: true },
	});

	if (!user) {
		const error = new Error("User not found");
		error.statusCode = 404;
		throw error;
	}

	await prisma.user.delete({
		where: { id: userId },
	});
};

const getUser = async (userId) => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
	});

	if (!user) {
		const error = new Error("User not found");
		error.statusCode = 404;
		throw error;
	}

	return user;
};

const updateUser = async (userId, { name, email }) => {
	const existingUser = await prisma.user.findUnique({ where: { id: userId } });
	if (!existingUser) {
		const error = new Error("User not found");
		error.statusCode = 404;
		throw error;
	}

	if (email && email !== existingUser.email) {
		const emailOwner = await prisma.user.findUnique({ where: { email } });
		if (emailOwner) {
			const error = new Error("Email is already registered");
			error.statusCode = 409;
			throw error;
		}
	}

	return prisma.user.update({
		where: { id: userId },
		data: { name, email },
		select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
	});
};

export { deleteUser, getUser, updateUser };
