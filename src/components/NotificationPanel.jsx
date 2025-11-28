
import { useState, useEffect, useContext, useRef } from "react";
import { Bell, X, Package, Tag, AlertCircle, Star } from "lucide-react";
import { NotificationAPI } from "../api/notificationApi";
import { AuthContext } from "../context/AuthContext";
import notificationSound from "../assets/relax-message-tone.mp3";


export function NotificationPanel({ isOpen, onClose }) {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const previousCount = useRef(0);

  // Audio element for notification sound
  const audioRef = useRef(new Audio(notificationSound));

  // Optional: lower volume
  useEffect(() => {
    audioRef.current.volume = 0.25;
  }, []);

  // fetch notifications
  const loadNotifications = async () => {
    try {
      const res = await NotificationAPI.getForUser(user?.id || user?.userId);
      const list = res.data?.notifications || [];

      // 🔔 Play sound ONLY if new unread notifications arrived
      const unreadNow = list.filter((n) => n.status !== "READ").length;

      // if (unreadNow > previousCount.current && isOpen === false) {
      //   audioRef.current.play().catch(() => {});
      // }

      previousCount.current = unreadNow;
      setNotifications(list);

    } catch (err) {
      console.warn("Failed to fetch notifications:", err);
    }
  };

  // Load when panel opens
  useEffect(() => {
    if (isOpen && user) loadNotifications();
  }, [isOpen, user]);

  // Also poll every 10 seconds for new notifications
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      loadNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, [user]);

  // mark as read
  const markAsRead = async (id) => {
    try {
      await NotificationAPI.markAsRead(id);
      loadNotifications();
    } catch (err) {
      console.warn("Failed to mark as read:", err);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "ORDER_PLACED":
        return <Package className="w-5 h-5 text-blue-600" />;
      case "PROMOTION":
        return <Tag className="w-5 h-5 text-green-600" />;
      case "REVIEW":
        return <Star className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6" />
            <h2 className="text-xl">Notifications</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto divide-y">
          {notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <Bell className="w-10 h-10 text-gray-400 mb-3" />
              <h3>No notifications</h3>
              <p className="text-sm text-gray-600">You're all caught up!</p>
            </div>
          )}

          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                n.status !== "READ" ? "bg-blue-50/50" : ""
              }`}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">{getIcon(n.type)}</div>
                <div className="flex-1">
                  <h4 className="font-medium">{n.title}</h4>
                  <p className="text-sm text-gray-600">{n.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
