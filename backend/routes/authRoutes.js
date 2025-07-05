import express from "express";
import {
  signup,
  login,
  verifyOtp,
  forgotPassword,
  verifyForgotOtp,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);

// ✅ Forgot Password Routes
router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-otp", verifyForgotOtp);
router.post("/reset-password", resetPassword);

export default router;
