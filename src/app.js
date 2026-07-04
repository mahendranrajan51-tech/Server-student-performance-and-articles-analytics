import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";

export const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/tracking", trackingRoutes);

app.use((err, _req, res, _next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || "Server error" });
});
