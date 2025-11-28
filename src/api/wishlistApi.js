import axiosInstance from "./axiosInstance";

export const WishlistAPI = {
  add: (userId, productId) =>
    axiosInstance.post("/api/v1/wishlist/add", { userId, productId }),

  getUserWishlist: (userId) =>
    axiosInstance.get(`/api/v1/wishlist/user/${userId}`),

  remove: (mappingId) =>
  axiosInstance.delete(`/api/v1/wishlist/remove/${mappingId}`),

};
