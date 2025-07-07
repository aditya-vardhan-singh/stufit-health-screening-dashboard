import axios from "axios";
import tokenService from "../services/tokenService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_AUTH;

const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenService.removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const login = (email, password) =>
  api.post("/login", { email, password });
export const verifyOtp = (email, otp) =>
  api.post("/verify-otp", { email, otp });
export const forgotPassword = (email) =>
  api.post("/forgot-password", { email });
export const verifyForgotOtp = (email, otp) =>
  api.post("/verify-forgot-otp", { email, otp });

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
