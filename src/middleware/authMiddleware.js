import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, _res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    error.statusCode = error.statusCode || 401;
    next(error);
  }
};

export const authorize = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    return next(error);
  }
  next();
};
