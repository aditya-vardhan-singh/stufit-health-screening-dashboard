import axios from "axios";
import tokenService from "../services/tokenService";

const API_BASE_URL = "http://localhost:5000/api/auth";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth token to headers
api.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      tokenService.removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Login
export const login = (email, password) =>
  api.post("/login", { email, password });

// Verify OTP
export const verifyOtp = (email, otp) =>
  api.post("/verify-otp", { email, otp });

// Forgot Password
export const forgotPassword = (email) =>
  api.post("/forgot-password", { email });

// Verify Forgot OTP
export const verifyForgotOtp = (email, otp) =>
  api.post("/verify-forgot-otp", { email, otp });

// Reset Password (uses reset token in header)
export const resetPassword = (resetToken, newPassword) =>
  axios.post(
    `${API_BASE_URL}/reset-password`,
    { newPassword },
    {
      headers: {
        Authorization: `Bearer ${resetToken}`,
        "Content-Type": "application/json",
      },
    }
  );
