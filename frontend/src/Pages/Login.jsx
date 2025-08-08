// src/Pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // ✅ Match your backend keys
      const token = res.data.access_token;
      const role = res.data.user.role;

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Update app state
      onLogin();

      // ✅ Role-based redirect
      switch (role) {
        case "farmer":
          navigate("/dashboard/farmer");
          break;
        case "buyer":
          navigate("/dashboard/buyer");
          break;
        case "agent":
          navigate("/dashboard/agent");
          break;
        case "admin":
          navigate("/dashboard/admin");
          break;
        default:
          navigate("/login");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">🌱</div>
        <h1 className="login-title">Welcome Back to AgriTech!</h1>
        <p className="login-subtitle">
          Empowering farmers, agents, and buyers across Africa.
        </p>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p className="login-bottom-text">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}
