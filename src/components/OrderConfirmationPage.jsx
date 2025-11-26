import React, { useEffect } from "react";
import { CheckCircle, Download, Mail, Package } from "lucide-react";
import { NotificationService } from "../services/notificationService";

export function OrderConfirmationPage({ orderId, onNavigate }) {
  useEffect(() => {
    // Add notification when order is confirmed
    NotificationService.addNotification({
      type: "order",
      title: "Order Confirmed!",
      message: `Your order ${orderId} has been successfully placed and is being processed.`,
    });

    // Mock: send email notification
    NotificationService.sendEmailNotification(
      "customer@example.com",
      "Order Confirmation",
      `Thank you for your order! Order ID: ${orderId}`
    );
  }, [orderId]);

  // ⭐ NEW – Download invoice as a simple text file
  const handleDownloadInvoice = () => {
    const content = [
      "ShopHub - Order Invoice",
      "------------------------",
      `Order ID : ${orderId}`,
      `Date     : ${new Date().toLocaleString()}`,
      "",
      "Thank you for shopping with us!",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${orderId}.txt`; // file name
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-4xl mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg mb-8">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="text-sm text-gray-600 mb-2">Order Number</div>
            <div className="text-2xl mb-4">{orderId}</div>
            <div className="text-sm text-gray-600">
              A confirmation email has been sent to your email address.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-6">
              <Package className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-sm mb-1">Estimated Delivery</div>
              <div>3-5 Business Days</div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <Mail className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-sm mb-1">Updates</div>
              <div>Via Email &amp; SMS</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate("orders")}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              Track Order
            </button>

            <button
              onClick={() => onNavigate("home")}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>

          {/* ⭐ UPDATED BUTTON – now actually downloads a file */}
          <button
            onClick={handleDownloadInvoice}
            className="mt-6 text-blue-600 hover:text-blue-700 flex items-center gap-2 mx-auto"
          >
            <Download className="w-4 h-4" />
            Download Invoice
          </button>
        </div>

        <div className="mt-12 text-left">
          <h2 className="text-2xl mb-6">What's Next?</h2>

          {/* (rest of your “What’s Next?” cards can stay the same) */}
        </div>
      </div>
    </div>
  );
}
