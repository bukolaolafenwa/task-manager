import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import taskRoutes from "./routes/taskRoutes";

import connectDB from "./config/db";

// Environment variables loading
dotenv.config();
// Connection to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/tasks", taskRoutes);

// Routes
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Manager API Running",
  });
});

// Server
const PORT = process.env.PORT || 3600;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Frontend URL: ${process.env.CLIENT_URL}`);
});