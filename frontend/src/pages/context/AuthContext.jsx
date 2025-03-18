import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          console.log("Fetching profile with token:", token);
          const res = await axios.get("https://mern-project-1-9nl5.onrender.com/api/auth/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log("Fetched User Data:", res.data); // Debugging
          setUser(res.data);
        } catch (error) {
          console.error("Failed to fetch user:", error.response?.data || error.message);
          localStorage.removeItem("token");
        }
      }
    };
    fetchUser();
  }, [token]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
