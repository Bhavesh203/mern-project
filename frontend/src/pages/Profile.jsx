import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "https://mern-project-1-9nl5.onrender.com/api/auth/profile/update",
        { username, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Failed to update profile");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "https://mern-project-1-9nl5.onrender.com/api/auth/profile/update-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Failed to update password");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      
      {message && <p className="mb-4 text-green-500">{message}</p>}

      {/* Update Profile Form */}
      <form onSubmit={handleProfileUpdate} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Update Profile
        </button>
      </form>

      {/* Update Password Form */}
      <form onSubmit={handlePasswordUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Profile;
