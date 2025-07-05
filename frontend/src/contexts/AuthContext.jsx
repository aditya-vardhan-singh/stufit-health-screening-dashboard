import React, { createContext, useState, useEffect } from "react";
import { login, verifyOtp } from "../api/auth";
import tokenService from "../services/tokenService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = tokenService.getToken();
    if (token) {
      setUser({ email: "admin@example.com" });
    }
    setLoading(false);
  }, []);

  // Step 1: Login (sends OTP)
  const handleLogin = async (email, password) => {
    await login(email, password);
  };

  // Step 2: OTP Verification (returns JWT)
  const handleOtpVerified = async (email, otp) => {
    const res = await verifyOtp(email, otp);
    // Backend returns: { message: "Login successful", token: "..." }
    tokenService.setToken(res.data.token);
    setUser({ email });
  };

  const handleLogout = () => {
    tokenService.removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleLogin, handleOtpVerified, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
