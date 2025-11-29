import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Tag,
  ClipboardList
} from "lucide-react";

export default function Sidebar() {
  const menu = [
    { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Users", to: "/admin/users", icon: Users },
    { label: "Products", to: "/admin/products", icon: ShoppingBag },
    { label: "Categories", to: "/admin/categories", icon: Tag },
    { label: "Orders", to: "/admin/orders", icon: ClipboardList },
  ];

  return (
    <div className="w-64 bg-white border-r shadow-sm min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10 tracking-tight text-gray-900">
        Admin Panel
      </h1>

      <nav className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                font-medium group
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }
              `
              }
            >
              <Icon
                size={20}
                className="transition-transform group-hover:scale-110"
              />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
