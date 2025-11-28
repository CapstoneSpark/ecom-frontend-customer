
// src/components/OrderConfirmationPage.jsx

import React, { useEffect, useContext, useState } from "react";
import { CheckCircle, Download, Package, Bell } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { NotificationAPI } from "../api/notificationApi";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import { CartAPI } from "../api/cartApi";
import confetti from "canvas-confetti";

export function OrderConfirmationPage() {
  const navigate = useNavigate();
  const { id: orderId } = useParams(); 
  const { user } = useContext(AuthContext);

  const [sending, setSending] = useState(false);

  // 🎉 CONFETTI ONCE WHEN PAGE LOADS
  useEffect(() => {
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 400);
  }, []);

  // 🧹 CLEAR CART AFTER SUCCESS
  useEffect(() => {
    async function clear() {
      try {
        const raw = user?.id || user?.userId;
        if (!raw || !orderId) return;

        await CartAPI.clearCart(String(raw));
        window.dispatchEvent(new Event("cartUpdated"));
      } catch (err) {
        console.warn("Failed to clear cart", err);
      }
    }

    if (user && orderId) clear();
  }, [user, orderId]);

  // 🔔 SEND NOTIFICATION
  useEffect(() => {
    async function sendNotification() {
      try {
        await NotificationAPI.send({
          userId: user?.id || user?.userId,
          email: user?.email,
          phoneNumber: user?.phone || "",
          type: "ORDER_PLACED",
          channel: "EMAIL",
          title: "Order Confirmed",
          message: `Your order has been placed successfully!`,
        });
      } catch (err) {
        console.warn("Notification failed:", err);
      }
    }

    if (orderId) sendNotification();
  }, [orderId, user]);

  // 🔁 RESEND
  const resendNotification = async () => {
    setSending(true);

    try {
      await NotificationAPI.send({
        userId: user?.id || user?.userId,
        email: user?.email,
        phoneNumber: user?.phone || "",
        type: "ORDER_PLACED",
        channel: "EMAIL",
        title: "Order Confirmation (Resent)",
        message: `Here is another copy of your confirmation.`,
      });

      toast.success("Notification resent!");
    } catch (err) {
      toast.error("Failed to resend notification");
    } finally {
      setSending(false);
    }
  };

  // 📄 DOWNLOAD INVOICE (optional)
  const handleDownloadInvoice = () => {
    const content = [
      "ShopHub - Order Invoice",
      "------------------------",
      `Date : ${new Date().toLocaleString()}`,
      "",
      "Thank you for shopping with us!",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4 text-center animate-fadeIn">

        {/* 🟢 Animated Success Icon */}
        <div className="mx-auto mb-6 animate-pop">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center shadow-md">
            <CheckCircle className="w-16 h-16 text-green-600 animate-bounceSlow" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-12 shadow-xl">

          <h1 className="text-4xl font-bold mb-4">Order Successful!</h1>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Thank you for your purchase.  
            Your items will be delivered soon.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/orders")}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              Track Order
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>

          <button
            onClick={handleDownloadInvoice}
            className="mt-6 text-blue-600 hover:text-blue-700 flex items-center gap-2 mx-auto"
          >
            <Download className="w-4 h-4" />
            Download Invoice
          </button>

          {/* ⭐ RESEND OPTION */}
          <button
            onClick={resendNotification}
            disabled={sending}
            className={`mt-4 text-purple-600 hover:text-purple-700 flex items-center gap-2 mx-auto ${
              sending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Bell className="w-4 h-4" />
            {sending ? "Sending..." : "Didn’t receive notification? Resend"}
          </button>

        </div>
      </div>
    </div>
  );
}
