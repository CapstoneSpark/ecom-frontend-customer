import React from "react";
import { ArrowLeft, User, Package, Settings, LogOut } from "lucide-react";

export default function ProfilePage({ user, onNavigate, logout }) {
  return (
    <div className="max-w-xl mx-auto px-6 py-10">

      {/* Back Button */}
      <button
        onClick={() => onNavigate("home")}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Profile Header */}
      <div className="text-center mb-8">
        <img
          className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
          src={user.photo}
          alt="Profile"
        />
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
        <p className="text-blue-600 mt-1 text-sm">
          {user.role === "admin" ? "Admin Account" : "User Account"}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-4">

        {/* View My Account */}
        <button
          onClick={() => onNavigate("account")}  // ⭐ Correct Navigation
          className="flex items-center gap-3 w-full p-4 border rounded-lg bg-white hover:bg-gray-50"
        >
          <User className="w-5 h-5" /> View My Account
        </button>

        {/* My Orders */}
        <button
          onClick={() => onNavigate("user-orders")}
          className="flex items-center gap-3 w-full p-4 border rounded-lg bg-white hover:bg-gray-50"
        >
          <Package className="w-5 h-5" /> My Orders
        </button>

        {/* Settings */}
        <button
          onClick={() => onNavigate("user-settings")}
          className="flex items-center gap-3 w-full p-4 border rounded-lg bg-white hover:bg-gray-50"
        >
          <Settings className="w-5 h-5" /> Settings
        </button>

      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
      >
        <LogOut className="w-5 h-5" /> Logout
      </button>
    </div>
  );
}
