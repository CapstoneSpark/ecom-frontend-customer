import React from "react";
import { ArrowLeft, LogOut, Package } from "lucide-react";

export default function UserOrdersPage({ orders, onNavigate, logout }) {
  return (
    <div className="max-w-xl mx-auto px-6 py-10">

      <button
        onClick={() => onNavigate("profile")}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h2 className="text-2xl mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 mb-4 bg-white">
            <div className="flex gap-3 items-center mb-2">
              <Package className="w-5 h-5" />
              <strong>Order #{order.orderNumber}</strong>
            </div>
            <p>Status: {order.status}</p>
            <p>Total: ${order.total}</p>
          </div>
        ))
      )}

      <button
        onClick={logout}
        className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
