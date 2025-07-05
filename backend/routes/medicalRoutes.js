import express from "express";
import {
  createMedicalRecord,
  getFilteredRecords,
} from "../controllers/medicalRecordController.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createMedicalRecord);
router.get("/filter", authMiddleware, getFilteredRecords);
// router.post("/create", createMedicalRecord);
// router.get("/filter", getFilteredRecords);

export default router;
