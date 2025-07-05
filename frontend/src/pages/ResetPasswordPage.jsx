import React from "react";
import AuthLayout from "../components/Auth/AuthLayout";
import ResetPasswordForm from "../components/Auth/ResetPasswordForm";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../api/auth";

const ResetPasswordPage = () => {
  const location = useLocation();
  const resetToken = location.state?.resetToken;
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (password) => {
    await resetPassword(resetToken, password);
    setSuccess(true);
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <AuthLayout>
      {!success ? (
        <>
          <ResetPasswordForm onSubmit={handleReset} />
          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-400 hover:underline">
              Back to Login
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-green-400 mt-2 mb-4">
            Password reset successful! Redirecting to login...
          </p>
        </div>
      )}
    </AuthLayout>
  );
};

export default ResetPasswordPage;
