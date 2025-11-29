import axiosInstance from "./axiosInstance";

function handle(err) {
  return {
    ok: false,
    status: err?.response?.status,
    message:
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Something went wrong",
  };
}

const BASE = "/api/v1/products";
const MAP_BASE = "/api/v1/product-categories";

export const ProductAPI = {
  async getAll(page = 0, size = 999) {
    try {
      const res = await axiosInstance.get(`${BASE}?page=${page}&size=${size}`);
      return { ok: true, data: res.data.content || res.data };
    } catch (e) {
      return handle(e);
    }
  },

  async getProduct(productId) {
    try {
      const res = await axiosInstance.get(`${BASE}/${productId}`);
      return { ok: true, data: res.data };
    } catch (e) {
      return handle(e);
    }
  },

  async createProduct(product) {
    try {
      const res = await axiosInstance.post(BASE, product);
      return { ok: true, data: res.data };
    } catch (e) {
      return handle(e);
    }
  },

  async updateProduct(productId, product) {
    try {
      const res = await axiosInstance.put(`${BASE}/${productId}`, product);
      return { ok: true, data: res.data };
    } catch (e) {
      return handle(e);
    }
  },

  async deleteProduct(productId) {
    try {
      const res = await axiosInstance.delete(`${BASE}/${productId}`);
      return { ok: true, data: res.data };
    } catch (e) {
      return handle(e);
    }
  },

  // PRODUCT-CATEGORY MAPPINGS
  async getCategoriesByProduct(productId) {
    try {
      const res = await axiosInstance.get(`${MAP_BASE}/product/${productId}`);
      return { ok: true, data: res.data };
    } catch (e) {
      return handle(e);
    }
  },

  async mapToCategory(productId, categoryId) {
    try {
      const res = await axiosInstance.post(MAP_BASE, {
        productId,
        categoryId,
      });
      return { ok: true, data: res.data };
    } catch (e) {
      return handle(e);
    }
  },

  async unmapCategory(mappingId) {
    try {
      const res = await axiosInstance.delete(`${MAP_BASE}/${mappingId}`);
      return { ok: true, data: res.data };
    } catch (e) {
      return handle(e);
    }
  },
};
