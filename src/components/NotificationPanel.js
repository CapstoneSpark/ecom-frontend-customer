import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Bell, X, Package, Tag, AlertCircle, Star } from "lucide-react";
import { NotificationService } from "../services/notificationService";
export function NotificationPanel({ isOpen, onClose }) {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        const unsubscribe = NotificationService.subscribe(setNotifications);
        return unsubscribe;
    }, []);
    const getIcon = (type) => {
        switch (type) {
            case "order":
                return _jsx(Package, { className: "w-5 h-5 text-blue-600" });
            case "promotion":
                return _jsx(Tag, { className: "w-5 h-5 text-green-600" });
            case "review":
                return _jsx(Star, { className: "w-5 h-5 text-yellow-600" });
            default:
                return _jsx(AlertCircle, { className: "w-5 h-5 text-gray-600" });
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        if (minutes < 60)
            return `${minutes}m ago`;
        if (hours < 24)
            return `${hours}h ago`;
        return `${days}d ago`;
    };
    if (!isOpen)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-black/20 z-40", onClick: onClose }), _jsxs("div", { className: "fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Bell, { className: "w-6 h-6" }), _jsx("h2", { className: "text-xl", children: "Notifications" }), NotificationService.getUnreadCount() > 0 && (_jsx("span", { className: "px-2 py-1 bg-red-500 text-white text-xs rounded-full", children: NotificationService.getUnreadCount() }))] }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-gray-100 rounded-lg", children: _jsx(X, { className: "w-5 h-5" }) })] }), notifications.length > 0 && (_jsxs("div", { className: "px-6 py-3 border-b flex gap-2", children: [_jsx("button", { onClick: () => NotificationService.markAllAsRead(), className: "text-sm text-blue-600 hover:text-blue-700", children: "Mark all as read" }), _jsx("span", { className: "text-gray-300", children: "\u2022" }), _jsx("button", { onClick: () => {
                                    if (confirm("Clear all notifications?")) {
                                        NotificationService.clearAll();
                                    }
                                }, className: "text-sm text-gray-600 hover:text-gray-700", children: "Clear all" })] })), _jsx("div", { className: "flex-1 overflow-y-auto", children: notifications.length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center p-6", children: [_jsx("div", { className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4", children: _jsx(Bell, { className: "w-8 h-8 text-gray-400" }) }), _jsx("h3", { className: "mb-2", children: "No notifications" }), _jsx("p", { className: "text-sm text-gray-600", children: "You're all caught up! Check back later for updates." })] })) : (_jsx("div", { className: "divide-y", children: notifications.map((notification) => (_jsx("div", { className: `p-4 hover:bg-gray-50 cursor-pointer ${!notification.read ? "bg-blue-50/50" : ""}`, onClick: () => NotificationService.markAsRead(notification.id), children: _jsxs("div", { className: "flex gap-3", children: [_jsx("div", { className: "flex-shrink-0 mt-1", children: getIcon(notification.type) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [_jsx("h4", { className: !notification.read ? "" : "text-gray-700", children: notification.title }), !notification.read && (_jsx("div", { className: "w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" }))] }), _jsx("p", { className: "text-sm text-gray-600 mb-2", children: notification.message }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs text-gray-500", children: formatDate(notification.date) }), _jsx("button", { onClick: (e) => {
                                                                e.stopPropagation();
                                                                NotificationService.deleteNotification(notification.id);
                                                            }, className: "text-xs text-gray-500 hover:text-red-600", children: "Delete" })] })] })] }) }, notification.id))) })) })] })] }));
}
