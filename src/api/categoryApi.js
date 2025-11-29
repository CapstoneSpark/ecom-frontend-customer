import axiosInstance from "./axiosInstance";

const BASE = "/api/v1/categories";

function handleError(err) {
  return {
    ok: false,
    message:
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Something went wrong",
    status: err?.response?.status,
  };
}

export const CategoryAPI = {
  async getCategories() {
    try {
      const res = await axiosInstance.get(BASE);
      return res.data;
    } catch (err) {
      return handleError(err);
    }
  },

  async createCategory(payload) {
    try {
      const res = await axiosInstance.post(BASE, payload);
      return { ok: true, data: res.data };
    } catch (err) {
      return handleError(err);
    }
  },

  async updateCategory(id, payload) {
    try {
      const res = await axiosInstance.put(`${BASE}/${id}`, payload);
      return { ok: true, data: res.data };
    } catch (err) {
      return handleError(err);
    }
  },

  async deleteCategory(id) {
    try {
      const res = await axiosInstance.delete(`${BASE}/${id}`);
      return { ok: true, data: res.data };
    } catch (err) {
      return handleError(err);
    }
  },
};
