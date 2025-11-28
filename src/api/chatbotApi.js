// src/api/chatbotApi.js
import axiosInstance from "./axiosInstance";

// Override base URL for chatbot without creating a new instance
const CHATBOT_URL = "/chatbot/message"; // axiosInstance baseURL + this path

let sessionId = "web-" + Date.now(); // one session per tab

export async function sendChatMessage(userMessage) {
  try {
    const res = await axiosInstance.post(CHATBOT_URL, {
      sessionId,
      userMessage: userMessage.trim(),
    });

    return res.data.reply || "Sorry, I could not understand that.";
  } catch (e) {
    console.error("Chatbot API error:", e);
    return "Chatbot service is temporarily unavailable. Please try again later.";
  }
}
