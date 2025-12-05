

import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Users", path: "/admin/users" },
    { label: "Products", path: "/admin/products" },
    { label: "Categories", path: "/admin/categories" },
    { label: "Orders", path: "/admin/orders" }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-60 bg-white border-r shadow-sm p-6 sticky top-0 h-screen">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-2 py-1 rounded-md text-sm font-medium transition
                ${location.pathname === item.path
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="bg-white border-b px-6 py-4 flex justify-end items-center gap-6">
          <div className="text-right">
            <p className="text-sm font-semibold">{user?.email}</p>
            <p className="text-xs text-gray-600">{user?.roles?.join(", ")}</p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </header>

        {/* CONTENT WRAPPER — ⭐ THIS FIXES YOUR PAGES */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
