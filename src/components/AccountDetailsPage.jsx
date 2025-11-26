import React from "react";
import { ArrowLeft, LogOut } from "lucide-react";

export default function AccountDetailsPage({ user, onNavigate, logout }) {
  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <button
        onClick={() => onNavigate("profile")}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h2 className="text-2xl mb-4">My Account Details</h2>

      <div className="bg-white border rounded-lg p-6 space-y-3">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <button
        onClick={logout}
        className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
