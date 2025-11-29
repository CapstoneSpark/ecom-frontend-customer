import axiosInstance from "./axiosInstance";

const BASE = "/api/v1/product-categories";

export const ProductCategoryAPI = {
  async getByCategory(categoryId) {
    const res = await axiosInstance.get(`${BASE}/category/${categoryId}`);
    return res.data;
  },

  async getByProduct(productId) {
    const res = await axiosInstance.get(`${BASE}/product/${productId}`);
    return res.data;
  },

  async createMapping(payload) {
    const res = await axiosInstance.post(BASE, payload);
    return res.data;
  },

  async updateMapping(id, payload) {
    const res = await axiosInstance.put(`${BASE}/${id}`, payload);
    return res.data;
  },

  async deleteMapping(id) {
    const res = await axiosInstance.delete(`${BASE}/${id}`);
    return res.data;
  },
};
