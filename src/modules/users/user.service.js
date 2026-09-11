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

export { deleteUser };
