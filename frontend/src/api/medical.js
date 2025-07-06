// src/api/medical.js

import axios from "axios";
import tokenService from "../services/tokenService";

// API base URL
const API_BASE_URL = "http://localhost:5000/api/medical";

// Axios instance banaya
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request me JWT token header me add kiya
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

// Filtered medical records ke liye GET API call
export const getFilteredMedicalRecords = (filters) =>
  api.get("/filter", {
    params: filters,
  });
