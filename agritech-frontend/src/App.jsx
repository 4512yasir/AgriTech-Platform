import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/Authcontext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './components/protectedroutes';

import FarmerDashboard from "./pages/dashboard/farmerdashboard";
import BuyerDashboard from "./pages/dashboard/buyerdashboard";
import AgentDashboard from "./pages/dashboard/agentdashboard";

function App() {
  const { user } = useAuth();
  const location = useLocation();

  // check if current path is a dashboard route
  const isDashboardRoute = location.pathname.startsWith("/farmer") || location.pathname.startsWith("/buyer") || location.pathname.startsWith("/agent");

  return (
    <>
      {user && isDashboardRoute ? <Sidebar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/farmer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buyer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agent/dashboard"
          element={
            <ProtectedRoute allowedRoles={["agent"]}>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
