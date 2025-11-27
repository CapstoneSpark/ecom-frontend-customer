// // src/api/paymentApi.js
// import axios from "axios";

// const BASE = "http://localhost:8085/api/v1/payments";

// export const PaymentAPI = {
//   createOrder: async (payload) => {
//     const res = await axios.post(`${BASE}/create`, payload);
//     return res.data;
//   },
//   getStatus: async (orderId) => {
//     const res = await axios.get(`${BASE}/status/${orderId}`);
//     return res.data;
//   },
// };
import axios from "axios";

const BASE_URL = "http://localhost:8085/api/v1/payments";

export const PaymentAPI = {
  async createOrder(body) {
    console.log("📤 Sending Payment Payload:", body);

    try {
      const response = await axios.post(`${BASE_URL}/create`, body, {
        headers: { "Content-Type": "application/json" }
      });

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
