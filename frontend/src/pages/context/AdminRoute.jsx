import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = () => {
  const { user } = useContext(AuthContext);

  console.log("User in AdminRoute:", user); // Debugging

  if (user === null) return <p>Loading...</p>; // Prevents early redirection
  return user && user.role === "admin" ? <Outlet /> : <Navigate to="/404" />;
};

export default AdminRoute;
