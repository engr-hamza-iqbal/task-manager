import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authentication token is required",
      });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.jti || !decoded.exp) {
      throw new Error("Token does not support revocation");
    }

    const revokedToken = await prisma.revokedToken.findUnique({
      where: { jti: decoded.jti },
    });

    if (revokedToken) {
      throw new Error("Token has been revoked");
    }

    req.user = decoded;
    req.token = token;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export { authenticate };