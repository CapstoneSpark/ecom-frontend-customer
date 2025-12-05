


import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axiosInstance from "../api/axiosInstance";
import {
  Users,
  ShoppingBag,
  Tag,
  ClipboardList,
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState({
    months: [],
    revenue: [],
    statusCount: {},
    categoryDistribution: {},
  });

  const loadStats = async () => {
    try {
      const [usersRes, productsRes, categoriesRes, ordersRes] = await Promise.all([
        axiosInstance.get("/api/v1/users?page=0&size=1"),
        axiosInstance.get("/api/v1/products?page=0&size=999"),
        axiosInstance.get("/api/v1/categories"),
        axiosInstance.get("/api/v1/orders/admin/all"),
      ]);

      const totalUsers = usersRes.data?.totalElements ?? 0;

      const totalProducts =
        productsRes.data?.content?.length ?? productsRes.data?.length ?? 0;

      const totalCategories = Array.isArray(categoriesRes.data)
        ? categoriesRes.data.length
        : 0;

      const ordersData = Array.isArray(ordersRes.data) ? ordersRes.data : [];

      const revenue = ordersData.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

      setStats({
        totalUsers,
        totalProducts,
        totalCategories,
        totalOrders: ordersData.length,
        revenue,
      });

      setOrders(ordersData);

      /** --- Generate charts --- **/

      // 1️⃣ Monthly revenue
      const monthNames = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ];

      const monthlyRevenue = Array(12).fill(0);
      ordersData.forEach((o) => {
        const month = new Date(o.createdAt).getMonth();
        monthlyRevenue[month] += o.totalAmount ?? 0;
      });

      // 2️⃣ Order Status Distribution
      const statusCount = {};
      ordersData.forEach((o) => {
        statusCount[o.status] = (statusCount[o.status] || 0) + 1;
      });

      // 3️⃣ Category Distribution
      const categoryMap = {};
      productsRes.data?.content?.forEach((p) => {
        const catName = p?.categories?.[0]?.name || "Uncategorized";
        categoryMap[catName] = (categoryMap[catName] || 0) + 1;
      });

      setChartData({
        months: monthNames,
        revenue: monthlyRevenue,
        statusCount,
        categoryDistribution: categoryMap,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard stats");
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (!stats) {
    return (
      <AdminLayout>
        <p className="text-lg">Loading analytics...</p>
      </AdminLayout>
    );
  }

  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={30} />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Products",
      value: stats.totalProducts,
      icon: <ShoppingBag size={30} />,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Categories",
      value: stats.totalCategories,
      icon: <Tag size={30} />,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "Orders",
      value: stats.totalOrders,
      icon: <ClipboardList size={30} />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      label: "Revenue",
      value: `₹${stats.revenue}`,
      icon: <DollarSign size={30} />,
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* --- Stat Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`p-6 rounded-xl shadow-md flex items-center gap-4 ${card.color}`}
          >
            {card.icon}
            <div>
              <p className="text-lg font-semibold">{card.label}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- Analytics Section --- */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 mt-8">

       
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 ">
          <div className="flex items-center gap-4  mb-4">
            <TrendingUp size={22} className="text-blue-600" />
            <h2 className="text-xl font-bold">Monthly Revenue</h2>
          </div>

          <svg width="100%" height="170">
            {chartData.revenue.map((val, i) => {
              const x = (i / 11) * 100 + "%";
              const height = (val / Math.max(...chartData.revenue, 1)) * 150;
              return (
                <rect
                  key={i}
                  x={x}
                  y={150 - height}
                  width="5%"
                  height={height}
                  fill="#3b82f6"
                />
              );
            })}
          </svg>
        </div> */}

        {/* 🥧 Category Pie Chart */}
        {/* <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <PieChart size={22} className="text-yellow-600" />
            <h2 className="text-xl font-bold">Category Distribution</h2>
          </div>

          <ul className="space-y-2">
            {Object.entries(chartData.categoryDistribution).map(([name, count]) => (
              <li key={name} className="flex justify-between text-gray-700">
                <span>{name}</span>
                <span className="font-semibold">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div> */}

      {/* 📊 Order Status Distribution */}
      {/* <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 mb-12">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={22} className="text-purple-600" />
          <h2 className="text-xl font-bold">Order Status Breakdown</h2>
        </div>

        <ul className="space-y-2">
          {Object.entries(chartData.statusCount).map(([status, count]) => (
            <li key={status} className="flex justify-between text-gray-700">
              <span className="capitalize">{status.toLowerCase()}</span>
              <span className="font-semibold">{count}</span>
            </li>
          ))}
        </ul>
      </div> */}

      {/* 🧾 Recent Orders */}
      {/* <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2">Order ID</th>
              <th className="py-2">User</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 8).map((o) => (
              <tr key={o.orderId} className="border-b">
                <td className="py-2">{o.orderId}</td>
                <td className="py-2">{o.user?.name}</td>
                <td className="py-2 font-semibold">₹{o.totalAmount}</td>
                <td className="py-2 capitalize">{o.status?.toLowerCase()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </AdminLayout>
  );
}
