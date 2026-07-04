import jwt from "jsonwebtoken";
import User from "../models/User.js";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000
};

const signToken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

const sendAuth = (res, user, status = 200) => {
  res.cookie("token", signToken(user._id), cookieOptions);
  res.status(status).json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!["teacher", "student"].includes(role)) {
      const error = new Error("Role must be teacher or student");
      error.statusCode = 400;
      throw error;
    }

    const exists = await User.findOne({ email });
    if (exists) {
      const error = new Error("Email already registered");
      error.statusCode = 409;
      throw error;
    }

    const user = await User.create({ name, email, password, role });
    sendAuth(res, user, 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    sendAuth(res, user);
  } catch (error) {
    next(error);
  }
};

export const logout = (_req, res) => {
  res.clearCookie("token", { ...cookieOptions, maxAge: undefined });
  res.json({ message: "Logged out" });
};

export const me = (req, res) => {
  res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role } });
};
