// src/services/authService.js
import axiosInstance from "../api/axiosInstance";

export const login = async (email, password) => {
  const response = await axiosInstance.post("/api/v1/users/login", {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/api/v1/users/register", userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getStoredUser = () => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};
