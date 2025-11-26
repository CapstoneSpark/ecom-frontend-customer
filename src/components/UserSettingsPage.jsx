import React from "react";
import { ArrowLeft, LogOut, Settings } from "lucide-react";

export default function UserSettingsPage({ onNavigate, logout }) {
  return (
    <div className="max-w-xl mx-auto px-6 py-10">

      {/* 🔙 Back Button */}
      <button
        onClick={() => onNavigate("profile")}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h2 className="text-2xl mb-4 flex items-center gap-2">
        <Settings className="w-5 h-5" /> Settings
      </h2>

      <div className="bg-white p-6 border rounded-lg">
        <p className="text-gray-600">Settings options can be added here.</p>
      </div>

      {/* 🔴 Logout */}
      <button
        onClick={logout}
        className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
