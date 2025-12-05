

import { useState } from "react";
import { X, Trash2, User, Mail, Phone, Package, CreditCard, AlertTriangle } from "lucide-react";
import { OrderAPI } from "../api/orderApi";
import { toast } from "sonner";

export default function OrderDetailDrawer({ order, close, refresh }) {
  const [status, setStatus] = useState(order.orderStatus?.toUpperCase());
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const saveStatus = async () => {
    try {
      setLoading(true);
      await OrderAPI.updateStatus(order.orderId, status);
      toast.success("Order status updated");
      await refresh();
      close();
    } catch (err) {
      toast.error("Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  const removeOrder = async () => {
    try {
      setLoading(true);
      await OrderAPI.deleteOrder(order.orderId);
      toast.success("Order deleted successfully");
      await refresh();
      close();
    } catch (err) {
      toast.error("Failed to delete order");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const statusMap = {
      PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
      PROCESSING: "bg-blue-100 text-blue-800 border-blue-200",
      SHIPPED: "bg-purple-100 text-purple-800 border-purple-200",
      DELIVERED: "bg-green-100 text-green-800 border-green-200",
      CANCELLED: "bg-red-100 text-red-800 border-red-200",
    };
    return statusMap[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={close}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Order #{order.orderId}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(status)}`}>
                {status}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <button
            onClick={close}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Customer & Order Info */}
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User size={20} />
                  Customer Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium text-gray-900">{order.userEmail || "N/A"}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Name</div>
                      <div className="font-medium text-gray-900">{order.userName || "N/A"}</div>
                    </div>
                  </div>
                  {order.phone && (
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="font-medium text-gray-900">{order.phone}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard size={20} />
                  Order Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{order.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">₹0</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">₹{order.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Items & Actions */}
            <div className="space-y-6">
              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package size={20} />
                  Order Items ({order.items?.length || 0})
                </h3>
                <div className="space-y-3">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span>Qty: {item.quantity}</span>
                          <span>₹{item.price} each</span>
                        </div>
                        <div className="font-semibold text-gray-900 mt-1">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update */}
              {!order.deleteMode && (
                <div className="bg-blue-50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                    disabled={loading}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                  <button
                    disabled={loading}
                    onClick={saveStatus}
                    className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Updating...
                      </div>
                    ) : (
                      "Update Status"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-red-900 mb-3 flex items-center gap-2">
                <AlertTriangle size={20} />
                Danger Zone
              </h3>
              <p className="text-red-700 mb-4">
                Once you delete this order, there is no going back. Please be certain.
              </p>
              
              {!confirmDelete ? (
                <div className="flex justify-center">
                <button
                  onClick={() => setConfirmDelete(true)}
                  disabled={loading}
                  className="flex-1  py-2 flex justify-center px-8 rounded-lg font-medium text-red-600 hover:bg-red-50 border border-transparent disabled:opacity-50"
                >
                  <Trash2 size={18} />
                  Delete Order
                </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border border-red-300">
                    <p className="text-red-800 font-medium text-center mb-3">
                      Are you sure you want to delete Order #{order.orderId}?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => setConfirmDelete(false)}
                        disabled={loading}
                        className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={removeOrder}
                        disabled={loading}
                        className="flex-1 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 border border-transparent disabled:opacity-50"
                      >
                        {loading ? (
                          "Deleting..."
                        ) : (
                          <>
                            <Trash2 size={16} />
                            Yes, Delete Order
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}