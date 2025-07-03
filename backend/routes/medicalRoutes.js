import express from "express";
import {
  createMedicalRecord,
  getFilteredRecords,
} from "../controllers/medicalRecordController.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createMedicalRecord);
router.get("/filter", authMiddleware, getFilteredRecords);

export default router;
