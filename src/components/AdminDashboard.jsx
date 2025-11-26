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

// 👇 now receives products + onDeleteProduct from App.jsx
export function AdminDashboard({ products, onNavigate, onDeleteProduct }) {
  const [activeMenu, setActiveMenu] = useState("products");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <div>ShopHub</div>
              <div className="text-sm text-gray-400">Admin Panel</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeMenu === item.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => onNavigate("home")}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1">
        {/* Top bar */}
        <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl">
            {menuItems.find((i) => i.id === activeMenu)?.label || "Dashboard"}
          </h1>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="text-sm">Admin User</div>
              <div className="text-xs text-gray-600">admin@shophub.com</div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* DASHBOARD TAB */}
          {activeMenu === "dashboard" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-600">Total Revenue</div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="text-3xl mb-2">
                    ${totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />+12.5% from last month
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-600">Total Orders</div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-3xl mb-2">{totalOrders}</div>
                  <div className="text-sm text-blue-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />+8.2% from last month
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-600">Total Products</div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="text-3xl mb-2">{totalProducts}</div>
                  <div className="text-sm text-purple-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />+3 new products
                  </div>
                </div>
              </div>

              {/* Small shortcuts (optional) */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveMenu("products")}
                    className="p-3 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Package className="w-4 h-4" />
                    Manage Products
                  </button>
                  <button
                    onClick={() => onNavigate("admin-add-product")}
                    className="p-3 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeMenu === "products" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={() => onNavigate("admin-add-product")}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5" />
                  Add New Product
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm text-gray-600">
                        Image
                      </th>
                      <th className="px-6 py-4 text-left text-sm text-gray-600">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm text-gray-600">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-sm text-gray-600">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm text-gray-600">
                        Stock
                      </th>
                      <th className="px-6 py-4 text-right text-sm text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div>{product.name}</div>
                          <div className="text-sm text-gray-600">
                            {product.brand}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {product.category}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          ${product.price.toFixed(2)}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              product.stock > 50
                                ? "bg-green-100 text-green-700"
                                : product.stock > 20
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                              <Edit className="w-4 h-4" />
                            </button>

                            {/* ❌ DELETE BUTTON – CALLS PARENT FUNCTION */}
                            <button
                              onClick={() => onDeleteProduct(product.id)}
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
                          className="px-6 py-8 text-center text-gray-500"
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

          {/* ORDERS / USERS PLACEHOLDER */}
          {(activeMenu === "orders" || activeMenu === "users") && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="text-gray-400 mb-4">Coming Soon</div>
              <p className="text-gray-600">
                This feature is under development.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
