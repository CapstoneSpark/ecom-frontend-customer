import React, { useState } from "react";
import { User, Lock } from "lucide-react";

export default function LoginPage({ onNavigate, setUser }) {
  const [role, setRole] = useState("user"); // "user" or "admin"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Create fake logged-in user
    const fakeUser = {
      name: role === "admin" ? "Admin User" : "Sarika",
      email,
      role,                      // <-- important, used to know admin/user
      photo: "https://i.pravatar.cc/200",
    };

    setUser(fakeUser);

    // ⭐ ROLE-BASED NAVIGATION
    if (role === "admin") {
      // Admin goes to Admin Dashboard
      onNavigate("admin-dashboard");
    } else {
      // Normal user goes to Profile page
      onNavigate("profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>

        {/* Role Selection */}
        <div className="flex gap-6 mb-6 justify-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="user"
              checked={role === "user"}
              onChange={(e) => setRole(e.target.value)}
            />
            User
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            Admin
          </label>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm">Email</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 mt-1">
              <User className="text-gray-400" size={20} />
              <input
                type="email"
                required
                className="flex-1 outline-none"
                placeholder="Type your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm">Password</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 mt-1">
              <Lock className="text-gray-400" size={20} />
              <input
                type="password"
                required
                className="flex-1 outline-none"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
