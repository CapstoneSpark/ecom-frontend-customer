
import React, { useEffect, useState, useContext } from "react";
import { getProfile, updateProfile, changePassword, deleteAccount } from "../services/authService";
import { User, Phone, Mail, Lock, Trash2, Loader2 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});


  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const updated = await updateProfile(profile);
      setProfile(updated);
      setMessage("Profile updated successfully.");
    } catch {
      setMessage("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };


const handlePasswordSave = async () => {
  setPasswordSaving(true);
  setPasswordMessage("");

  const { oldPassword, newPassword, confirmPassword } = passwordForm;

  // Frontend validation
  if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
    setPasswordMessage("All fields are required.");
    setPasswordSaving(false);
    return;
  }

  if (newPassword.length < 6) {
    setPasswordMessage("New password must be at least 6 characters.");
    setPasswordSaving(false);
    return;
  }

  if (newPassword !== confirmPassword) {
    setPasswordMessage("New password and Confirm password do not match.");
    setPasswordSaving(false);
    return;
  }

  try {
    await changePassword({ oldPassword, newPassword });
    setPasswordMessage("Password updated successfully.");

    setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
  } catch (err) {
    const msg = err.response?.data?.message || "Failed to change password.";
    setPasswordMessage(msg);
  } finally {
    setPasswordSaving(false);
  }
};


  const handleDeleteAccount = async () => {
  try {
    await deleteAccount();
  } catch (err) {
    console.error("Delete error:", err);
  } finally {
    // Always clear token and redirect, regardless of response
    // Because if we get here, user clicked delete
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    if (logoutUser) {
      logoutUser();
    }
    
    // Close modal first
    setShowDeleteModal(false);
    
    // Redirect to home
    navigate("/");
    
    // Force page reload to clear any cached state
    window.location.reload();
  }
};

  const getMessageColor = (msg) => {
    if (msg.includes("success")) return "text-green-600";
    return "text-red-500";
  };

  if (loadingProfile) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-xl text-gray-600">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header with Delete Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
          <button
  onClick={() => setShowDeleteModal(true)}
  style={{ backgroundColor: "#dc2626" }}
  className="flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
>
            <Trash2 size={18} />
            Delete Account
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left: Profile Information */}
            <div>
              <div className="text-center mb-6">
                <img
                  src="https://www.nicepng.com/png/full/933-9332131_profile-picture-default-png.png"
                  alt="Profile"
                  style={{ width: "100px", height: "100px" }}
                  className="rounded-full object-cover border-4 border-blue-100 mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800">Profile Information</h3>
                <p className="text-gray-500 text-sm">Update your personal details</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
                    placeholder="First Name"
                  />
                </div>

                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
                    placeholder="Last Name"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed text-gray-500"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={profile.phone || ""}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
                    placeholder="Phone"
                  />
                </div>

                <button
                  onClick={handleProfileSave}
                  disabled={saving}
                  className="w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-all bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {saving && <Loader2 className="animate-spin" size={20} />}
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                {message && (
                  <p className={"text-center text-sm " + getMessageColor(message)}>
                    {message}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Change Password */}
            <div className="md:border-l md:pl-8 border-gray-200">
              <div className="text-center mb-6">
                <div 
                  style={{ width: "100px", height: "100px" }}
                  className="rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4"
                >
                  <Lock className="text-blue-600" size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Change Password</h3>
                <p className="text-gray-500 text-sm">Keep your account secure</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="password"
                    name="oldPassword"
                    placeholder="Current Password"
                    value={passwordForm.oldPassword}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                </div>

                <div className="relative">
  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
  <input
    type="password"
    name="confirmPassword"
    placeholder="Confirm New Password"
    value={passwordForm.confirmPassword}
    onChange={handlePasswordChange}
    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
  />
</div>


                <button
                  onClick={handlePasswordSave}
                  disabled={passwordSaving}
                  className="w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-all bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {passwordSaving && <Loader2 className="animate-spin" size={20} />}
                  {passwordSaving ? "Updating..." : "Update Password"}
                </button>

                {passwordMessage && (
                  <p className={"text-center text-sm " + getMessageColor(passwordMessage)}>
                    {passwordMessage}
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {/* Delete Confirmation Modal */}
{showDeleteModal && (
  <div 
    className="fixed inset-0 flex items-center justify-center px-4 z-50"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
  >
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
      <div 
        style={{ width: "64px", height: "64px", backgroundColor: "#fee2e2" }}
        className="rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <Trash2 style={{ color: "#dc2626" }} size={32} />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Delete Account?</h2>
      <p className="text-gray-500 mb-6">
        This action is permanent and cannot be undone.
      </p>

      <div className="space-y-3">
        <button
          onClick={handleDeleteAccount}
          style={{ backgroundColor: "#dc2626" }}
          className="w-full text-white py-3 rounded-lg hover:opacity-90 font-semibold transition-all"
        >
          Yes, Delete My Account
        </button>

        <button
          onClick={() => setShowDeleteModal(false)}
          className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-semibold transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
      
    </div>
  );
}