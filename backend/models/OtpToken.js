import mongoose from "mongoose";

const otpTokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // 5 minutes expiry
});

export default mongoose.model("OtpToken", otpTokenSchema);
