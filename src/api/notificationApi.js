

// // src/api/notificationApi.js
// import axios from "axios";

// const BASE = "http://localhost:9090/api/v1/notifications"; // Gateway

// export const NotificationAPI = {
//   send: (data) =>
//     axios.post(`${BASE}/send`, data, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     }),

//   getForUser: (userId) =>
//     axios.get(`${BASE}/user/${userId}`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     }),

//   markAsRead: (id) =>
//     axios.put(`${BASE}/${id}/read`, {}, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     })
// };


// src/api/notificationApi.js
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
