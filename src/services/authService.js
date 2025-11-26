// src/services/authService.js
import axiosInstance from "../api/axiosInstance";


// Get Profile
export const getProfile = async () => {
  const response = await axiosInstance.get("/api/v1/users/profile");
  return response.data;
};

// Update Profile
export const updateProfile = async (payload) => {
  const response = await axiosInstance.put("/api/v1/users/profile", payload);
  return response.data;
};

// Change Password
export const changePassword = async (payload) => {
  const response = await axiosInstance.put("/api/v1/users/change-password", payload);
  return response.data;
};


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

export const deleteAccount = async () => {
  const response = await axiosInstance.delete("/api/v1/users/profile");
  return response.data;
};
