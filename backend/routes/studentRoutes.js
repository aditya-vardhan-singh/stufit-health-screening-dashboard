import express from "express";
import { registerStudent } from "../controllers/studentController.js";

import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/register", authMiddleware, registerStudent);

export default router;
