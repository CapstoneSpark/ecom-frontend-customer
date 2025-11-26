export class NotificationService {
    static listeners = [];
    static notifications = [
        {
            id: "1",
            type: "order",
            title: "Order Confirmed",
            message: "Your order #1001 has been confirmed and is being processed.",
            date: new Date(Date.now() - 86400000).toISOString(),
            read: false,
        },
        {
            id: "2",
            type: "promotion",
            title: "Special Offer!",
            message: "Get 20% off on all electronics. Limited time only!",
            date: new Date(Date.now() - 172800000).toISOString(),
            read: false,
        },
        {
            id: "3",
            type: "order",
            title: "Order Shipped",
            message: "Your order #1000 has been shipped and will arrive in 2-3 days.",
            date: new Date(Date.now() - 259200000).toISOString(),
            read: true,
        },
    ];
    static subscribe(callback) {
        this.listeners.push(callback);
        callback(this.notifications);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== callback);
        };
    }
    static getNotifications() {
        return this.notifications;
    }
    static getUnreadCount() {
        return this.notifications.filter((n) => !n.read).length;
    }
    static addNotification(notification) {
        const newNotification = {
            ...notification,
            id: Date.now().toString(),
            date: new Date().toISOString(),
            read: false,
        };
        this.notifications.unshift(newNotification);
        this.notifyListeners();
    }
    static markAsRead(id) {
        this.notifications = this.notifications.map((n) => n.id === id ? { ...n, read: true } : n);
        this.notifyListeners();
    }
    static markAllAsRead() {
        this.notifications = this.notifications.map((n) => ({ ...n, read: true }));
        this.notifyListeners();
    }
    static deleteNotification(id) {
        this.notifications = this.notifications.filter((n) => n.id !== id);
        this.notifyListeners();
    }
    static clearAll() {
        this.notifications = [];
        this.notifyListeners();
    }
    static notifyListeners() {
        this.listeners.forEach((listener) => listener(this.notifications));
    }
    // Send email notification (mock)
    static async sendEmailNotification(email, subject, message) {
        console.log(`Sending email to ${email}: ${subject} - ${message}`);
        await new Promise((resolve) => setTimeout(resolve, 500));
        return true;
    }
}
