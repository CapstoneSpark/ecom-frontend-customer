

import React, { useState } from "react";
import { UserAPI } from "../api/userApi";
import { X, User, Mail, Phone, Shield } from "lucide-react";
import { toast } from "sonner";

export default function UserDetailDrawer({ user, close, refresh }) {
  const initialRole = user.roles?.[0] || "CUSTOMER";
  const [role, setRole] = useState(initialRole);
  const [loading, setLoading] = useState(false);

  const updateRole = async () => {
    setLoading(true);

    const res = await UserAPI.assignRoleToUser(user.userId, { roleName: role });

    if (!res.ok) {
      toast.error(res.message);
      setLoading(false);
      return;
    }

    toast.success("Role updated successfully");
    await refresh();
    close();
  };

  const roleBadge = {
    ADMIN: "bg-purple-100 text-purple-700 border-purple-300",
    CUSTOMER: "bg-blue-100 text-blue-700 border-blue-300",
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && !loading && close()}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b bg-white">
          <h2 className="text-lg font-semibold">User Details</h2>
          <button
            onClick={close}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* User Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center rounded-full font-bold text-lg">
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">
                {user.firstName} {user.lastName}
              </p>
              <span
                className={`inline-block px-3 py-0.5 mt-1 text-sm rounded-full border ${roleBadge[initialRole]}`}
              >
                {initialRole}
              </span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <div className="p-3 border border-gray-200 rounded-lg flex items-center gap-3">
              <Mail size={18} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            {user.phone && (
              <div className="p-3 border border-gray-200 rounded-lg flex items-center gap-3">
                <Phone size={18} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
            )}
          </div>

          {/* Role Update */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Shield size={18} /> Manage Role
            </h3>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
              className="w-full p-2 border rounded-lg bg-white"
            >
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <button
              disabled={loading || role === initialRole}
              onClick={updateRole}
              className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            >
              {loading ? "Updating..." : "Update Role"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
