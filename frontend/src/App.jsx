import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/sidebar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import FarmerDashboard from "./Pages/Dashboard/farmerdashboard";
import AgentDashboard from "./Pages/Dashboard/agentdashboard";
import BuyerDashboard from "./Pages/Dashboard/buyerdashboard";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import Products from "./Pages/products/product";
import "./App.css";

// Higher-order component to protect routes based on login and role
function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    // Not logged in → send to login
    return <Navigate to="/login" />;
  }

  if (allowedRole && role !== allowedRole) {
    // Logged in but wrong role → send to correct dashboard
    return <Navigate to={`/dashboard/${role}`} />;
  }

  return children;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    setIsLoggedIn(!!token);
    setRole(role);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setRole(localStorage.getItem("role"));
  };

  return (
    <Router>
      {isLoggedIn ? <Sidebar /> : <Navbar />}

      <div className="p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to={`/dashboard/${role}`} /> : <Login onLogin={handleLogin} />}
          />
          <Route path="/register" element={<Register />} />

          {/* Role-Protected Dashboards */}
          <Route
            path="/dashboard/farmer"
            element={
              <ProtectedRoute allowedRole="farmer">
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/agent"
            element={
              <ProtectedRoute allowedRole="agent">
                <AgentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/buyer"
            element={
              <ProtectedRoute allowedRole="buyer">
                <BuyerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Products (any logged-in user) */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
