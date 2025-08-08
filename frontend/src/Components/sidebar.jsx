import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>☰</button>
      <nav className="sidebar-links">
        <h2 className="sidebar-title">AgriTech</h2>

        {role === "farmer" && (
          <>
            <Link to="/dashboard/farmer">Dashboard</Link>
            <Link to="/products">Products</Link>
            <Link to="/loans/farmer">Loan Requests</Link>
            <Link to="/training/farmer">Training</Link>
            <Link to="/orders/farmer">Orders</Link>
            <Link to="/profile/farmer">Profile</Link>
          </>
        )}

        {role === "buyer" && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/market">Marketplace</Link>
            <Link to="/orders">My Orders</Link>
            <Link to="/profile">Profile</Link>
          </>
        )}

        {role === "agent" && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/farmers">Manage Farmers</Link>
            <Link to="/loans">Approve Loans</Link>
            <Link to="/training">Manage Trainings</Link>
            <Link to="/profile">Agent Profile</Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link to="/dashboard">Admin Dashboard</Link>
            <Link to="/users">User Management</Link>
            <Link to="/listings">All Listings</Link>
            <Link to="/loans">All Loans</Link>
            <Link to="/reports">Reports</Link>
            <Link to="/settings">Settings</Link>
          </>
        )}

        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>
    </div>
  );
}
