import { deleteUser } from "./user.service.js";

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

export { removeMe };
