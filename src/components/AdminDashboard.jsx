


import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  LogOut,
  Edit,
  Trash2,
  Plus,
  Search,
  DollarSign,
  TrendingUp,
  ShoppingCart,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AdminDashboard({ products, onNavigate, onDeleteProduct }) {
  const [activeMenu, setActiveMenu] = useState("products");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = products.reduce((sum, p) => sum + p.price * 15, 0);
  const totalOrders = 342;
  const totalProducts = products.length;

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "users", label: "Users", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* 🔥 GLASS SIDEBAR */}
      <aside className="w-64 bg-gray-900/90 backdrop-blur-xl text-white shadow-lg flex flex-col border-r border-gray-800">
        <div className="p-6 border-b border-gray-800 flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg tracking-wide">ShopHub</h1>
            <p className="text-sm text-gray-400">Admin Panel</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeMenu === item.id
                    ? "bg-blue-600 shadow-md"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => onNavigate("home")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600/10 text-gray-300 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1">
        
        {/* Floating Header */}
        <header className="bg-white shadow-sm sticky top-0 z-20 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-wide">
            {menuItems.find((i) => i.id === activeMenu)?.label}
          </h1>

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-xs text-gray-600">admin@shophub.com</div>
            </div>
          </div>
        </header>

        <div className="p-8">
          
          {/* DASHBOARD */}
          {activeMenu === "dashboard" && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
                  <div className="flex justify-between mb-4">
                    <p className="text-gray-500 font-medium">Total Revenue</p>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="text-green-600 w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-3xl font-semibold">
                    ${totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-green-600 text-sm flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +12.5% this month
                  </p>
                </div>

                {/* Orders */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
                  <div className="flex justify-between mb-4">
                    <p className="text-gray-500 font-medium">Total Orders</p>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <ShoppingBag className="text-blue-600 w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-3xl font-semibold">{totalOrders}</p>
                  <p className="text-blue-600 text-sm flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +8.2% this month
                  </p>
                </div>

                {/* Products */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
                  <div className="flex justify-between mb-4">
                    <p className="text-gray-500 font-medium">Total Products</p>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Package className="text-purple-600 w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-3xl font-semibold">{totalProducts}</p>
                  <p className="text-purple-600 text-sm">+3 new this week</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={() => setActiveMenu("products")}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Package className="w-5 h-5" />
                    Manage Products
                  </button>

                  <button
                    onClick={() => onNavigate("admin-add-product")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {activeMenu === "products" && (
            <div className="space-y-6">
              
              {/* Search + Add */}
              <div className="flex items-center justify-between">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={() => onNavigate("admin-add-product")}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                  <Plus className="w-5 h-5" />
                  Add Product
                </button>
              </div>

              {/* Product Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Image", "Name", "Category", "Price", "Stock", "Actions"].map(
                        (t) => (
                          <th
                            key={t}
                            className="px-6 py-4 text-left text-sm text-gray-500 font-medium"
                          >
                            {t}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr
                        key={p.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        {/* Image */}
                        <td className="px-6 py-4">
                          <div className="w-16 h-16 overflow-hidden rounded-xl">
                            <ImageWithFallback
                              src={p.image}
                              alt={p.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </td>

                        {/* Name */}
                        <td className="px-6 py-4">
                          <div className="font-medium">{p.name}</div>
                          <div className="text-sm text-gray-500">{p.brand}</div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                            {p.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4 font-medium text-gray-700">
                          ${p.price.toFixed(2)}
                        </td>

                        {/* Stock */}
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 text-sm rounded-full ${p.stock > 50
                              ? "bg-green-100 text-green-700"
                              : p.stock > 20
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                            }`}
                          >
                            {p.stock}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex gap-2 justify-end">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onDeleteProduct(p.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredProducts.length === 0 && (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-8 text-gray-500"
                        >
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PLACEHOLDER */}
          {(activeMenu === "orders" || activeMenu === "users") && (
            <div className="bg-white rounded-2xl shadow p-12 border text-center text-gray-500">
              Coming Soon…
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
