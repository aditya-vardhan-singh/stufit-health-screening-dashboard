import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/Auth/AuthLayout";
import LoginForm from "../components/Auth/LoginForm";
import { login } from "../api/auth";

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    await login(email, password);
    navigate("/verify-otp", { state: { email } });
  };

  return (
    <AuthLayout>
      <LoginForm onSubmit={handleLogin} />
      <div className="mt-4 text-center">
        <Link
          to="/forgot-password"
          className="text-teal-600 hover:text-teal-700 hover:underline text-sm transition"
        >
          Forgot Password?
        </Link>
      </div>
      {error && (
        <p className="mt-3 text-sm text-red-500 text-center">{error}</p>
      )}
    </AuthLayout>
  );
};

export default LoginPage;
