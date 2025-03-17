import React, { useContext } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { AuthContext } from "../pages/context/AuthContext";

const Auth_Popover = ({ id, open, anchorEl, onClose }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Typography sx={{ p: 2 }}>
        <nav>
          {user ? (
            <ul>
              <li>
                <Link to="/my-account">Profile</Link>
              </li>
              {user.role === "admin" && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
              )}
              <li><button onClick={logout}>Logout</button></li>
            </ul>
          ) : (
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          )}
        </nav>
      </Typography>
    </Popover>
  );
};

export default Auth_Popover;
