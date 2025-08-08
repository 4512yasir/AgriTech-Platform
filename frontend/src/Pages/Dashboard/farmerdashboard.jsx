import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSeedling, FaTractor, FaCloudSun, FaBookReader } from "react-icons/fa";
import "./dashboard.css";

export default function FarmerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="farmer-dashboard">
      <header className="farmer-banner">
        <h1>Welcome, Farmer!</h1>
        <p>Grow smarter. Sell faster. Learn better.</p>
      </header>

      <section className="features-grid">
        <div className="feature-card">
          <FaSeedling className="feature-icon" />
          <h3>My Farm Products</h3>
          <p>Manage your product listings and track market visibility.</p>
          <button onClick={() => navigate("/products")}>Manage Products</button>
        </div>

        <div className="feature-card">
          <FaTractor className="feature-icon" />
          <h3>Microloans</h3>
          <p>Apply for quick loans to boost your agricultural productivity.</p>
          <button onClick={() => navigate("/loans")}>Request Loan</button>
        </div>

        <div className="feature-card">
          <FaBookReader className="feature-icon" />
          <h3>Training Hub</h3>
          <p>Access tutorials and guides for modern farming practices.</p>
          <button onClick={() => navigate("/training")}>Start Learning</button>
        </div>

        <div className="feature-card">
          <FaCloudSun className="feature-icon" />
          <h3>Weather Updates</h3>
          <p>Stay ahead with accurate weather forecasts for your region.</p>
          <button onClick={() => navigate("/weather")}>Check Forecast</button>
        </div>
      </section>
    </div>
  );
}
