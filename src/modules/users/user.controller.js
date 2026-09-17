import { deleteUser, getUser, updateUser } from "./user.service.js";

const getMe = async (req, res, next) => {
	try {
		const user = await getUser(req.user.userId);
		return res.status(200).json({ user });
	} catch (error) {
		next(error);
	}
};

const updateMe = async (req, res, next) => {
	try {
		const user = await updateUser(req.user.userId, req.body);
		return res.status(200).json({ message: "Profile updated successfully", user });
	} catch (error) {
		next(error);
	}
};

const removeMe = async (req, res, next) => {
	try {
		await deleteUser(req.user.userId);
		return res.status(200).json({
			message: "User account deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};

export { getMe, updateMe, removeMe };
