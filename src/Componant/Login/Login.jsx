import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!username) {
        toast.error("Username is required.");
        return;
      }

      if (!password) {
        toast.error("Password is required.");
        return;
      }

      const response = await axios.post("http://localhost:4000/api/login", {
        username,
        password,
      });
      console.log(response.data);
      const userRole = response.data.role;
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userRole", userRole);
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        if (userRole === "admin") {
          navigate("/admin");
        } else {
          navigate("/feeds");
        }
      }, 1000);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        toast.error("Incorrect username or password.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="button-group">
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
