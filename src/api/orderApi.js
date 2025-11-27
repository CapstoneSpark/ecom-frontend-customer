import axios from "axios";

const ORDER_BASE = "http://localhost:8084/api/v1/orders";

export const OrderAPI = {
  getOrder: (orderId) =>
    axios.get(`${ORDER_BASE}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }),
};
