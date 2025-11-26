

import React, { useState, useContext } from "react";
import { User, Lock, Mail, Loader2 } from "lucide-react";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Forgot password modal
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const validateField = (name, value) => {
    if (name === "email") {
      if (!value.trim()) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email format";
      return "";
    }
    if (name === "password") {
      if (!value.trim()) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (touched[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateAllFields = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched({ email: true, password: true });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateAllFields()) return;

    setLoading(true);

    try {
      const data = await login(form.email, form.password);

      loginUser(
        {
          userId: data.userId,
          email: data.email,
          roles: data.roles,
        },
        data.token
      );

      if (data.roles.includes("ADMIN")) {
        return navigate("/admin/dashboard");
      }

      navigate("/");
    } catch (err) {
      setApiError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setResetMessage("");

    if (!resetEmail.trim() || !resetPassword.trim()) {
      setResetMessage("Both fields are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setResetMessage("Invalid email address");
      return;
    }

    if (resetPassword.length < 6) {
      setResetMessage("Password must be at least 6 characters");
      return;
    }

    setResetLoading(true);

    try {
      await axiosInstance.post("/api/v1/users/reset-password", {
        email: resetEmail,
        newPassword: resetPassword,
      });

      setResetMessage("Password reset successfully!");
    } catch (err) {
      setResetMessage("Failed to reset password");
    } finally {
      setResetLoading(false);
    }
  };

  const closeResetModal = () => {
    setShowResetModal(false);
    setResetEmail("");
    setResetPassword("");
    setResetMessage("");
  };

  const getResetMessageColor = () => {
    if (resetMessage.includes("success")) {
      return "text-green-600";
    }
    return "text-red-500";
  };

  const getInputClass = (fieldName) => {
    let baseClass = "w-full pl-10 pr-4 py-3 border rounded-lg focus:ring focus:ring-blue-300";
    if (errors[fieldName] && touched[fieldName]) {
      baseClass += " border-red-500";
    }
    return baseClass;
  };

  const getButtonClass = (isLoading) => {
    let baseClass = "w-full py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2";
    if (isLoading) {
      baseClass += " bg-gray-400 cursor-not-allowed";
    } else {
      baseClass += " bg-blue-600 hover:bg-blue-700";
    }
    return baseClass;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Login
        </h2>

        {apiError && (
          <p className="text-red-500 text-center mb-2">{apiError}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass("email")}
              />
            </div>
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass("password")}
              />
            </div>
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={getButtonClass(loading)}
          >
            {loading && <Loader2 className="animate-spin" size={20} />}
            {loading ? "Processing..." : "Login"}
          </button>

          {/* Forgot Password */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="text-blue-600 font-medium hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <p className="text-center text-gray-600">
  Don't have an account?{" "}
  <a
    href="/register"
    className="text-blue-600 font-medium hover:underline"
  >
    Register
  </a>
</p>

        </form>
      </div>

      {/* RESET PASSWORD MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg space-y-4">
            <h2 className="text-xl font-semibold">Reset Password</h2>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="New Password"
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg"
              />
            </div>

            {resetMessage && (
              <p className={"text-center text-sm " + getResetMessageColor()}>
                {resetMessage}
              </p>
            )}

            <button
              onClick={handleResetPassword}
              disabled={resetLoading}
              className={getButtonClass(resetLoading)}
            >
              {resetLoading && <Loader2 className="animate-spin" size={20} />}
              {resetLoading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              onClick={closeResetModal}
              className="w-full bg-gray-300 text-black py-3 rounded-lg hover:bg-gray-400 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}