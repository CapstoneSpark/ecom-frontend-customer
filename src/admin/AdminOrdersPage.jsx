

import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { OrderAPI } from "../api/orderApi";
import { Search, Eye, Trash2, Filter } from "lucide-react";
import OrderDetailDrawer from "./OrderDetailDrawer";
import { toast } from "sonner";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const loadOrders = async () => {
    const res = await OrderAPI.getAllOrders();

    if (!res.ok) {
      toast.error(res.message || "Failed to load orders");
      return;
    }

    setOrders(res.data || []);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filtered = orders.filter((o) => {
    const id = String(o.orderId);
    const userId = String(o.userId);

    const matchesSearch =
      id.includes(search) ||
      userId.includes(search);

    const matchesStatus =
      statusFilter === "all" ||
      o.orderStatus?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const getStatusColor = (status) => {
    const statusMap = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      processing: "bg-blue-100 text-blue-700 border-blue-200",
      shipped: "bg-purple-100 text-purple-700 border-purple-200",
      delivered: "bg-green-100 text-green-700 border-green-200",
      cancelled: "bg-red-100 text-red-700 border-red-200",
    };
    return statusMap[status?.toLowerCase()] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Orders Management</h1>
            <p className="text-gray-600">Manage and track customer orders</p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600">Total: {orders.length}</span>
            <span className="text-gray-600">Filtered: {filtered.length}</span>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Search by order ID or user ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 sm:w-64">
            <Filter size={18} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-6 text-left">Order ID</th>
                <th className="p-6 text-left">User ID</th>
                <th className="p-6 text-left">Amount</th>
                <th className="p-6 text-left">Status</th>
                <th className="p-6 text-left">Date</th>
                <th className="p-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((order) => (
                <tr key={order.orderId} className="hover:bg-gray-50">
                  <td className="p-6 font-mono text-sm">#{order.orderId}</td>
                  <td className="p-6 text-gray-900">{order.userId}</td>
                  <td className="p-6 font-semibold">₹{order.totalAmount}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="p-6 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('en-IN')}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg border border-blue-200 flex items-center gap-2"
                      >
                        <Eye size={16} />
                        View
                      </button>
                      <button
                        onClick={() => setSelectedOrder({ ...order, deleteMode: true })}
                        className="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg border border-red-200 flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <Search size={48} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium">No orders found</h3>
            </div>
          )}
        </div>

        {/* Mobile Version */}
        <div className="lg:hidden space-y-4">
          {filtered.map((order) => (
            <div key={order.orderId} className="p-6 bg-white rounded-xl border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-mono text-sm text-gray-500">#{order.orderId}</p>
                  <p className="font-semibold text-gray-900">User: {order.userId}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(order.orderStatus)}`}>
                  {order.orderStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                  <div className="text-gray-500">Amount</div>
                  <div className="font-semibold">₹{order.totalAmount}</div>
                </div>
                <div>
                  <div className="text-gray-500">Date</div>
                  <div className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="flex-1 px-4 py-2 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50"
                >
                  View
                </button>
                <button
                  onClick={() => setSelectedOrder({ ...order, deleteMode: true })}
                  className="flex-1 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailDrawer
          order={selectedOrder}
          close={() => setSelectedOrder(null)}
          refresh={loadOrders}
        />
      )}
    </AdminLayout>
  );
}
