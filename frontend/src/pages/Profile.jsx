import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch User Orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders); // Ensure it matches the API response structure
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      fetchOrders();
    }
  }, [user, token]);
  
  // ✅ Handle Profile Update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile/update",
        { username, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Failed to update profile");
    }
  };

  // ✅ Handle Password Update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile/update-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Failed to update password");
    }
  };

  // ✅ Prevent rendering when user is undefined
  if (!user) {
    return <p className="text-center text-lg">Loading user data...</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}

      {/* Profile Update Form */}
      <form onSubmit={handleProfileUpdate} className="mb-6 p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Update Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username} // Fixed issue here
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder={user.email}
            value={email} // Fixed issue here
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Update Profile
        </button>
      </form>

      {/* Password Update Form */}
      <form onSubmit={handlePasswordUpdate} className="mb-6 p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Update Password</h2>
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

      {/* Order List */}
      {loading ? (
        <p className="text-center text-lg">Loading orders...</p>
      ) : orders.length > 0 ? (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Order ID</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
              <th className="p-2">Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-2">{order._id}</td>
                <td className="p-2">${order.totalAmount.toFixed(2)}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">
                  <table className="w-full border mt-2">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2">Product</th>
                        <th className="p-2">Quantity</th>
                        <th className="p-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.cartItems.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-2">{item.name}</td> {/* Fixed field name */}
                          <td className="p-2">{item.quantity}</td>
                          <td className="p-2">${item.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-lg">No orders found</p>
      )}
    </div>
  );
};

export default Profile;
