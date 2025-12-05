
import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { UserAPI } from "../api/userApi";
import UserDetailDrawer from "./UserDetailDrawer";
import { Search, Eye, Users, UserCheck, UserX } from "lucide-react";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const loadUsers = async () => {
    const res = await UserAPI.getAllUsers(page, 50);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    const data = res.data;
    setUsers(data?.content || []);
    setTotalPages(data?.totalPages || 1);
  };

  useEffect(() => {
    loadUsers();
  }, [page]);

  // FIXED SEARCH (name = firstName + lastName)
  const filtered = users.filter((u) => {
    const full = `${u.firstName || ""} ${u.lastName || ""} ${u.email || ""} ${u.roles?.join(", ")}`;
    return full.toLowerCase().includes(search.toLowerCase());
  });

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: "bg-purple-100 text-purple-700 border-purple-200",
      customer: "bg-blue-100 text-blue-700 border-blue-200",
      user: "bg-orange-100 text-orange-700 border-orange-200",
    };
    return colors[role?.toLowerCase()] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const countUsersWithRole = (role) =>
    users.filter((u) => u.roles?.map((r) => r.toLowerCase()).includes(role.toLowerCase())).length;

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Users Management</h1>
            <p className="text-gray-600">Manage user accounts and permissions</p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600">Total: {users.length}</span>
            <span className="text-gray-600">Filtered: {filtered.length}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <UserCheck className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-gray-900">
                  {countUsersWithRole("ADMIN")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserX className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Customers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {countUsersWithRole("CUSTOMER")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search users by name, email or role..."
            className="w-full pl-12 pr-4 px-8 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">User</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                  <th className="px-6 py-4 text-left font-semibold">Roles</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filtered.map((user) => (
                  <tr key={user.userId} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {(user.firstName?.charAt(0) || user.email?.charAt(0)).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">ID: {user.userId}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">{user.email}</td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {user.roles?.map((role) => (
                          <span
                            key={role}
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(role)}`}
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg border border-blue-200"
                      >
                        <Eye size={16} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="p-12 text-center text-gray-500">No users found</div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="text-sm text-gray-600">
              Page {page + 1} of {totalPages}
            </div>

            <div className="flex items-center gap-3">
              <button
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-40"
              >
                Previous
              </button>

              <button
                disabled={page === totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Drawer */}
      {selectedUser && (
        <UserDetailDrawer
          user={selectedUser}
          refresh={loadUsers}
          close={() => setSelectedUser(null)}
        />
      )}
    </AdminLayout>
  );
}
