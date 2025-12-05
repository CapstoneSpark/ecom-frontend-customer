

import axiosInstance from "./axiosInstance";

function normalizeError(err) {
  return {
    ok: false,
    message:
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Something went wrong.",
  };
}

export const OrderAPI = {
  // USER — Get orders of logged user
  async getUserOrders(userId) {
    try {
      const res = await axiosInstance.get(`/api/v1/orders?userId=${userId}`);
      return { ok: true, data: res.data };
    } catch (err) {
      return normalizeError(err);
    }
  },

  // USER — Cancel order
  async cancelOrder(orderId) {
    try {
      const res = await axiosInstance.post(`/api/v1/orders/${orderId}/cancel`);
      return { ok: true, data: res.data };
    } catch (err) {
      return normalizeError(err);
    }
  },

  // ADMIN — Fetch all orders
  async getAllOrders() {
    try {
      const res = await axiosInstance.get(`/api/v1/orders/admin/all`);
      return { ok: true, data: res.data };
    } catch (err) {
      return normalizeError(err);
    }
  },

  // ADMIN — Update status
  async updateStatus(orderId, status) {
    try {
      const res = await axiosInstance.put(`/api/v1/orders/${orderId}/status?status=${status}`);
      return { ok: true, data: res.data };
    } catch (err) {
      return normalizeError(err);
    }
  },

  // ADMIN/USER — Get order by ID
  async getOrderById(orderId) {
    try {
      const res = await axiosInstance.get(`/api/v1/orders/${orderId}`);
      return { ok: true, data: res.data };
    } catch (err) {
      return normalizeError(err);
    }
  },

  // Special — RazorPay idempotency
  async getByIdempotency(key) {
    try {
      const res = await axiosInstance.get(`/api/v1/orders/by-idempotency/${key}`);
      return { ok: true, data: res.data };
    } catch (err) {
      return normalizeError(err);
    }
  },
  async deleteOrder(orderId) {
  try {
    const res = await axiosInstance.delete(`/api/v1/orders/${orderId}`);
    return { ok: true, data: res.data };
  } catch (err) {
    return normalizeError(err);
  }
},

};
