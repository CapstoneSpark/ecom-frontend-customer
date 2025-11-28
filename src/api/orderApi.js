// import axios from "axios";

// const BASE = "http://localhost:8084/api/v1/orders";

// export const OrderAPI = {
//   getByIdempotency: (key) =>
//     axios.get(`${BASE}/by-idempotency/${key}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     }),
//     getUserOrders: (userId) =>
//     axios.get(`${BASE}?userId=${userId}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     }),
//     cancelOrder: (orderId) =>
//   axiosInstance.post(`/api/v1/orders/${orderId}/cancel`),

// };


import axiosInstance from "../api/axiosInstance";

export const OrderAPI = {
  getByIdempotency: (key) =>
    axiosInstance.get(`/api/v1/orders/by-idempotency/${key}`),

  getUserOrders: (userId) =>
    axiosInstance.get(`/api/v1/orders?userId=${userId}`),

  cancelOrder: (orderId) =>
    axiosInstance.post(`/api/v1/orders/${orderId}/cancel`),
};
