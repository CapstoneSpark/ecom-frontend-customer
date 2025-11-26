import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Package, Truck, CheckCircle, XCircle, Eye } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
export function OrdersPage({ orders, onNavigate }) {
    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return _jsx(Package, { className: "w-5 h-5 text-yellow-600" });
            case "processing":
                return _jsx(Package, { className: "w-5 h-5 text-blue-600" });
            case "shipped":
                return _jsx(Truck, { className: "w-5 h-5 text-purple-600" });
            case "delivered":
                return _jsx(CheckCircle, { className: "w-5 h-5 text-green-600" });
            case "cancelled":
                return _jsx(XCircle, { className: "w-5 h-5 text-red-600" });
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            case "processing":
                return "bg-blue-100 text-blue-700";
            case "shipped":
                return "bg-purple-100 text-purple-700";
            case "delivered":
                return "bg-green-100 text-green-700";
            case "cancelled":
                return "bg-red-100 text-red-700";
        }
    };
    return (_jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8", children: [_jsx("h1", { className: "text-3xl mb-8", children: "My Orders" }), orders.length === 0 ? (_jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-16 text-center", children: [_jsx("div", { className: "w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6", children: _jsx(Package, { className: "w-10 h-10 text-gray-400" }) }), _jsx("h2", { className: "text-2xl mb-4", children: "No orders yet" }), _jsx("p", { className: "text-gray-600 mb-8", children: "Start shopping and your orders will appear here." }), _jsx("button", { onClick: () => onNavigate("products"), className: "px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700", children: "Start Shopping" })] })) : (_jsx("div", { className: "space-y-6", children: orders.map((order) => (_jsxs("div", { className: "bg-white rounded-xl border border-gray-200 overflow-hidden", children: [_jsxs("div", { className: "bg-gray-50 px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-6", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-600", children: "Order Number" }), _jsx("div", { children: order.orderNumber })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-600", children: "Date" }), _jsx("div", { children: new Date(order.date).toLocaleDateString() })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-600", children: "Total" }), _jsxs("div", { children: ["$", order.total.toFixed(2)] })] })] }), _jsx("div", { className: "flex items-center gap-3", children: _jsxs("div", { className: `px-4 py-2 rounded-full text-sm flex items-center gap-2 ${getStatusColor(order.status)}`, children: [getStatusIcon(order.status), _jsx("span", { className: "capitalize", children: order.status })] }) })] }), _jsxs("div", { className: "p-6", children: [_jsx("div", { className: "space-y-4 mb-6", children: order.items.map((item) => (_jsxs("div", { className: "flex gap-4", children: [_jsx("div", { className: "w-20 h-20 rounded-lg overflow-hidden bg-gray-100", children: _jsx(ImageWithFallback, { src: item.image, alt: item.name, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "mb-1", children: item.name }), _jsxs("div", { className: "text-sm text-gray-600", children: ["Quantity: ", item.quantity] })] }), _jsxs("div", { children: ["$", (item.price * item.quantity).toFixed(2)] })] }, item.id))) }), _jsxs("div", { className: "flex flex-wrap gap-3 pt-4 border-t", children: [_jsxs("button", { className: "flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700", children: [_jsx(Eye, { className: "w-4 h-4" }), "View Details"] }), order.status === "shipped" && (_jsxs("button", { className: "flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50", children: [_jsx(Truck, { className: "w-4 h-4" }), "Track Shipment"] })), order.status === "delivered" && (_jsx("button", { className: "flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50", children: "Write Review" })), order.status === "pending" && (_jsx("button", { className: "flex items-center gap-2 px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50", children: "Cancel Order" }))] })] })] }, order.id))) }))] }));
}
