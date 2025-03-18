import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://mern-project-1-9nl5.onrender.com/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      login(response.data.token); // Update auth context state
      navigate("/home"); // Redirect to home page after login
    } catch (error) {
      setError(error.response?.data?.error || "Login failed. Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring focus:ring-green-300 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring focus:ring-green-300 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-2 text-center">
          You don't have an account? 
          <span onClick={() => navigate("/register")} className="text-green-500 hover:underline cursor-pointer"> Register Now</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
