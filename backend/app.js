import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors"; // <-- Add this import

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import medicalRoutes from "./routes/medicalRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors()); // <-- Use it here

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/medical", medicalRoutes);

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

startServer();
