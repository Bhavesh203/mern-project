import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://mern-project-1-9nl5.onrender.com/api/auth/register", formData);
      alert("Registration successful! Please log in.");
      window.location.href = "/login";
    } catch (error) {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="flex grad-bg justify-center items-center h-[calc(100vh_-128px)] bg-gray-100">
      <form
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm"
        onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h1>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            User Name
          </label>
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring focus:ring-green-300 focus:outline-none"
          />
        </div>
        <div className="mb-4">
        <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enail
          </label>
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring focus:ring-green-300 focus:outline-none"
          />
        </div>
        <div className="mb-4">
        <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring focus:ring-green-300 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Register
        </button>
        <p className="mt-2 text-center">
          Allready have an account? <span onClick={()=> navigate('/login')} className="text-green-500 hover:underline cursor-pointer">Login Now</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
