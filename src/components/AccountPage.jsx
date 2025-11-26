import React from "react";
import { ArrowLeft, User } from "lucide-react";

export function AccountPage({ user, onNavigate }) {
  return (
    <div className="max-w-xl mx-auto px-6 py-10">

      {/* Back Button */}
      <button
        onClick={() => onNavigate("profile")}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="text-center mb-8">
        <img
          className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
          src={user.photo}
          alt="Profile"
        />
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <div className="space-y-4">

        <div className="p-4 border rounded-lg bg-white">
          <h3 className="font-semibold">Full Name</h3>
          <p className="text-gray-600">{user.name}</p>
        </div>

        <div className="p-4 border rounded-lg bg-white">
          <h3 className="font-semibold">Email Address</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="p-4 border rounded-lg bg-white">
          <h3 className="font-semibold">Account Type</h3>
          <p className="text-gray-600">
            {user.role === "admin" ? "Admin" : "User"}
          </p>
        </div>

      </div>
    </div>
  );
}
