import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthPage = () => {
  const [formData, setFormData] = useState({ name: "", username: "", email: "", password: "", phone: "" });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleRegister = async () => {
    console.log("Sending Data:", formData); // Check what you're sending
  
    // if (!formData.name || !formData.username || !formData.email || !formData.password || !formData.phone) {
    //   console.error("All fields are required");
    //   return;
    // }
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData, {
        headers: { "Content-Type": "application/json" }
      });
  
      console.log("Response Data:", response.data); // Log server response
      toast.success(response.data.msg);
    } catch (err) {
      console.error("Error Response:", err.response?.data || err.message);
    }
  };
  
  

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", { email: formData.email, otp });
      toast.success(response.data.msg);
    } catch (err) {
      toast.error(err.response?.data?.msg || "OTP verification failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-96 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{otpSent ? "Enter OTP" : "Register"}</h2>

        {!otpSent ? (
          <>
            <input type="text" placeholder="Name" className="w-full p-2 mb-2 border" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input type="text" placeholder="Username" className="w-full p-2 mb-2 border" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
            <input type="email" placeholder="Email" className="w-full p-2 mb-2 border" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <button onClick={handleRegister} className="w-full bg-blue-500 text-white p-2">Register</button>
          </>
        ) : (
          <>
            <input type="text" placeholder="Enter OTP" className="w-full p-2 mb-2 border" onChange={(e) => setOtp(e.target.value)} />
            <button onClick={handleVerifyOtp} className="w-full bg-green-500 text-white p-2">Verify OTP</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
