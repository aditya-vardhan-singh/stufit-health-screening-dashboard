import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import { generateOtp } from "../utils/generateOtp.js";
import OtpToken from "../models/OtpToken.js";

// 🔐 Admin Signup
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body; // email instead of username

    const exists = await Admin.findOne({ username: email });
    if (exists) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({ username: email, password });
    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔐 Admin Login → Sends OTP
export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // email instead of username

    const admin = await Admin.findOne({ username: email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const otp = generateOtp();

    await OtpToken.create({ email, otp });

    await sendEmail(email, "OTP Verification", `Your OTP is: ${otp}`);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  OTP Verification → Returns JWT Token
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const validOtp = await OtpToken.findOne({ email, otp });
    if (!validOtp)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    await OtpToken.deleteMany({ email }); // Clean up used OTPs

    const admin = await Admin.findOne({ username: email });
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
