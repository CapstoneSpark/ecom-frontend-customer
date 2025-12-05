
import axiosInstance from "../api/axiosInstance"; // adjust path if needed

const BASE = "/api/v1/notifications"; // gateway route

export const NotificationAPI = {
  send: (data) =>
    axiosInstance.post(`${BASE}/send`, data),

  getForUser: (userId) =>
    axiosInstance.get(`${BASE}/user/${userId}`),

  markAsRead: (id) =>
    axiosInstance.put(`${BASE}/${id}/read`)
};
