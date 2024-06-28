import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/api/logout");
      localStorage.clear();
      console.log("Logout successful");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userId = localStorage.getItem("userId");
  if (!userId) {
    return null;
  }

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
