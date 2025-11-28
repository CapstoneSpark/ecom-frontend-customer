

import React, { useEffect, useState, useContext } from "react";
import { Package, CheckCircle, XCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { OrderAPI } from "../api/orderApi";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

export function OrdersPage() {
    const { user } = useContext(AuthContext);
    const userId = user?.id || user?.userId;

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);

    const loadOrders = async () => {
        try {
            const res = await OrderAPI.getUserOrders(userId);
            setOrders(res.data || []);
        } catch (err) {
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) loadOrders();
    }, [userId]);

    const toggleExpand = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    // NEW: CANCEL ORDER
    const handleCancelOrder = async (orderId) => {
        try {
            const res = await OrderAPI.cancelOrder(orderId);
            toast.success("Order cancelled successfully");
            loadOrders();
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Failed to cancel order"
            );
        }
    };

    const stages = [
        { key: "pending", label: "Order Placed" },
        { key: "processing", label: "Processing" },
        { key: "shipped", label: "Shipped" },
        { key: "delivered", label: "Delivered" },
    ];

    const stageIndex = (status) =>
        stages.findIndex((s) => s.key === status);

    if (loading) {
        return (
            <div className="py-20 text-center text-gray-600 text-xl">
                Loading your orders...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl mb-8">My Orders</h1>

            {orders.length === 0 ? (
                <div className="bg-white rounded-xl border p-16 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-2xl mb-4">No orders yet</h2>
                    <p className="text-gray-600 mb-8">
                        Start shopping and your orders will appear here.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => {
                        const status = order.orderStatus?.trim().toLowerCase();
                        const activeIndex = stageIndex(status);

                        const canCancel =
                            status === "pending" || status === "processing";

                        return (
                            <div
                                key={order.orderId}
                                className="bg-white rounded-xl border overflow-hidden shadow-sm"
                            >
                                {/* HEADER */}
                                <div
                                    className="bg-gray-50 px-6 py-4 border-b flex justify-between cursor-pointer hover:bg-gray-100"
                                    onClick={() => toggleExpand(order.orderId)}
                                >
                                    <div className="flex gap-6">
                                        <div>
                                            <div className="text-sm text-gray-600">
                                                Order Number
                                            </div>
                                            <div>{order.orderId}</div>
                                        </div>

                                        <div>
                                            <div className="text-sm text-gray-600">
                                                Placed On
                                            </div>
                                            <div>
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-sm text-gray-600">
                                                Total
                                            </div>
                                            <div>₹{order.totalAmount}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div
                                            className={`px-4 py-2 rounded-full text-sm capitalize ${
                                                {
                                                    pending: "bg-yellow-100 text-yellow-700",
                                                    processing: "bg-blue-100 text-blue-700",
                                                    shipped: "bg-purple-100 text-purple-700",
                                                    delivered: "bg-green-100 text-green-700",
                                                    cancelled: "bg-red-100 text-red-700",
                                                }[status] || "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {status}
                                        </div>
                                    </div>
                                </div>

                                {/* EXPANDED */}
                                {expandedOrder === order.orderId && (
                                    <div className="p-6 animate-fadein">

                                        {/* CANCEL BUTTON */}
                                        {canCancel && (
                                            <div className="flex justify-end mb-4">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCancelOrder(order.orderId);
                                                    }}
                                                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                                >
                                                    Cancel Order
                                                </button>
                                            </div>
                                        )}

                                        {/* PROGRESS BAR */}
                                        <div className="w-full mt-8 mb-10">
                                            <h3 className="text-lg font-semibold mb-6">
                                                Order Progress
                                            </h3>

                                            <div className="relative px-4">
                                                <div className="absolute top-5 left-4 right-4 h-1.5 bg-gray-200 rounded-full"></div>

                                                <div
                                                    className="absolute top-5 left-4 h-1.5 bg-green-500 rounded-full transition-all duration-700 ease-in-out"
                                                    style={{
                                                        width: `calc(${(activeIndex / (stages.length - 1)) * 100}%)`,
                                                    }}
                                                ></div>

                                                <div className="relative flex justify-between items-center">
                                                    {stages.map((stage, index) => {
                                                        const completed = index <= activeIndex;
                                                        const current = index === activeIndex;

                                                        return (
                                                            <div
                                                                key={stage.key}
                                                                className="flex flex-col items-center flex-1"
                                                            >
                                                                <div className="relative flex items-center justify-center">
                                                                    {current && (
                                                                        <div className="absolute w-10 h-10 bg-green-300 rounded-full opacity-30 animate-ping"></div>
                                                                    )}

                                                                    <div
                                                                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                                                                            completed
                                                                                ? "bg-green-600 border-green-700 shadow-md shadow-green-300"
                                                                                : "bg-gray-200 border-gray-400"
                                                                        }`}
                                                                    >
                                                                        {completed ? (
                                                                            <CheckCircle size={18} className="text-white" />
                                                                        ) : (
                                                                            <XCircle size={18} className="text-gray-400" />
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <span
                                                                    className={`mt-3 text-xs sm:text-sm w-24 text-center ${
                                                                        completed
                                                                            ? "text-green-700 font-medium"
                                                                            : "text-gray-500"
                                                                    }`}
                                                                >
                                                                    {stage.label}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        {/* ITEMS */}
                                        <div className="space-y-4 mb-6">
                                            {order.items?.map((item, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                                                        <ImageWithFallback
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>

                                                    <div className="flex-1">
                                                        <div className="mb-1">{item.name}</div>
                                                        <div className="text-sm text-gray-600">
                                                            Qty: {item.quantity}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        ₹{(item.price * item.quantity).toFixed(2)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
