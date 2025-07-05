import React, { useState } from "react";
import AuthLayout from "../components/Auth/AuthLayout";
import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm";
import OtpVerificationForm from "../components/Auth/OtpVerification";
import ResetPasswordForm from "../components/Auth/ResetPasswordForm";
import { Link } from "react-router-dom";
import { forgotPassword, verifyForgotOtp, resetPassword } from "../api/auth";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState("email"); // "email" | "otp" | "reset" | "done"
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");

  // Step 1: Send OTP
  const handleForgot = async (emailInput) => {
    await forgotPassword(emailInput);
    setEmail(emailInput);
    setStep("otp");
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (otp) => {
    const res = await verifyForgotOtp(email, otp);
    setResetToken(res.data.resetToken);
    setStep("reset");
  };

  // Step 3: Reset Password
  const handleResetPassword = async (newPassword) => {
    await resetPassword(resetToken, newPassword);
    setStep("done");
  };

  return (
    <AuthLayout>
      {step === "email" && (
        <>
          <ForgotPasswordForm onSubmit={handleForgot} />
          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-400 hover:underline">
              Back to Login
            </Link>
          </div>
        </>
      )}
      {step === "otp" && (
        <>
          <OtpVerificationForm onSubmit={handleVerifyOtp} />
          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-400 hover:underline">
              Back to Login
            </Link>
          </div>
        </>
      )}
      {step === "reset" && (
        <>
          <ResetPasswordForm onSubmit={handleResetPassword} />
          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-400 hover:underline">
              Back to Login
            </Link>
          </div>
        </>
      )}
      {step === "done" && (
        <div className="text-center">
          <p className="text-green-400 mt-4 mb-4">
            Password reset successful! You can now{" "}
            <Link to="/login" className="text-blue-400 underline">
              login
            </Link>
            .
          </p>
        </div>
      )}
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
