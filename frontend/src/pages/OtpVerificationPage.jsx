// src/pages/OtpVerificationPage.jsx
import React from "react";
import AuthLayout from "../components/Auth/AuthLayout";
import OtpVerificationForm from "../components/Auth/OtpVerification";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const OtpVerificationPage = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { handleOtpVerified } = useAuth();

  const handleVerify = async (otp) => {
    try {
      await handleOtpVerified(email, otp);
      setError("");
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setError("Invalid or expired OTP.");
      setSuccess(false);
    }
  };

  return (
    <AuthLayout>
      {!success ? (
        <>
          <OtpVerificationForm onSubmit={handleVerify} />
          {error && (
            <div className="mt-1 text-red-400 text-sm text-center">{error}</div>
          )}
        </>
      ) : (
        <div className="text-center">
          <p className="text-green-400 mt-3 mb-4">
            OTP verified! Redirecting...
          </p>
        </div>
      )}
    </AuthLayout>
  );
};

export default OtpVerificationPage;
