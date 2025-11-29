// src/api/userApi.js
import axiosInstance from "./axiosInstance"; // adjust path if needed

const BASE = "/api/v1/users";

function handleError(err) {
  // normalize error payload for UI
  const message =
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    "Network error";
  const status = err?.response?.status;
  return { ok: false, status, message, raw: err };
}

export const UserAPI = {
  // AUTH
  async register(registerPayload) {
    // registerPayload: { name, email, password, ... }
    try {
      const res = await axiosInstance.post(`${BASE}/register`, registerPayload);
      return { ok: true, data: res.data };
    } catch (err) {
      return handleError(err);
    }
  },

  async login(loginPayload) {
    // loginPayload: { email, password }
    try {
      const res = await axiosInstance.post(`${BASE}/login`, loginPayload);
      // expected response: { token, user: { ... } } (based on your backend)
      return { ok: true, data: res.data };
    } catch (err) {
      return handleError(err);
    }
  },

  // PASSWORD
  async resetPassword(payload) {
    // payload: { email, newPassword } or your DTO shape
    try {
      const res = await axiosInstance.post(`${BASE}/reset-password`, payload);
      return { ok: true, data: res.data };
    } catch (err) {
      return handleError(err);
    }
  },

  async changePassword(changePayload) {
    // changePayload: { oldPassword, newPassword } (per DTO)
    try {
      const res = await axiosInstance.put(`${BASE}/change-password`, changePayload);
      return { ok: true, data: res.data };
    } catch (err) {
      return handleError(err);
    }
  },

  // PROFILE
  async getProfile() {
    try {
      const res = await axiosInstance.get(`${BASE}/profile`);
      return { ok: true, data: res.data };
    } catch (err) {
      return handleError(err);
    }
  },

  async updateProfile(updatePayload) {
    try {
      const res = await axiosInstance.put(`${BASE}/profile`, updatePayload);
      return { ok: true, data: res.data };
    } catch (err) {
      return handleError(err);
    }
  },

  async deleteProfile() {
    try {
      const res = await axiosInstance.delete(`${BASE}/profile`);
      return { ok: true, data: res.data };
    } catch (err) {
      return handleError(err);
    }
  },

  // ADMIN (optional) — these endpoints require ADMIN role
  async getUserById(id) {
    try {
      const res = await axiosInstance.get(`${BASE}/${id}`);
      return { ok: true, data: res.data };
    } catch (err) {
      return handleError(err);
    }
  },

  async getAllUsers(page = 0, size = 10) {
    try {
      const res = await axiosInstance.get(`${BASE}?page=${page}&size=${size}`);
      return { ok: true, data: res.data };
    } catch (err) {
      return handleError(err);
    }
  },

  async assignRoleToUser(id, roleRequest) {
    // roleRequest: { roleName: "ROLE_ADMIN" } or similar based on DTO
    try {
      const res = await axiosInstance.post(`${BASE}/${id}/roles`, roleRequest);
      return { ok: true, data: res.data };
    } catch (err) {
      return handleError(err);
    }
  },

  async removeRoleFromUser(id, roleRequest) {
    try {
      const res = await axiosInstance.delete(`${BASE}/${id}/roles`, { data: roleRequest });
      return { ok: true, data: res.data };
    } catch (err) {
      return handleError(err);
    }
  },
};
