

import axiosInstance from "./axiosInstance";

export const CartAPI = {
  getCart: (userId) => axiosInstance.get(`/api/cart/${userId}`),

  
  addItem: (userId, sku, qty = 1) =>
    axiosInstance.post(`/api/cart/${userId}/item`, {
      sku: sku,          // ✅ changed productId → sku
      quantity: qty,
    }),

  removeItem: (userId, sku) =>
    axiosInstance.delete(`/api/cart/${userId}/item/${sku}`),

  clearCart: (userId) =>
    axiosInstance.delete(`/api/cart/${userId}`)
};
