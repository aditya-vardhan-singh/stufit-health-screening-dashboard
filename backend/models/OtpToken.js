import mongoose from "mongoose";

const otpTokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  purpose: { // 🔄 ADDED FIELD
    type: String,
    enum: ["login", "forgotPassword"],
    default: "login",
  },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // 5 minutes expiry
});

export default mongoose.model("OtpToken", otpTokenSchema);
