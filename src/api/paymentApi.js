

import axiosInstance from "../api/axiosInstance"; // adjust the path as needed

const BASE_URL = "/api/v1/payments"; // handled by API Gateway

export const PaymentAPI = {
  async createOrder(body) {
    console.log("📤 Sending Payment Payload:", body);

    try {
      const response = await axiosInstance.post(`${BASE_URL}/create`, body);

      console.log("✅ Payment Order Created:", response.data);
      return response.data;

    } catch (err) {
      console.error("❌ PAYMENT ERROR FULL RESPONSE:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });

      throw err;
    }
  }
};
