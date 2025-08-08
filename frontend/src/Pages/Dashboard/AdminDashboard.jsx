import "./dashboard.css";


export default function AdminDashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <p className="dashboard-subtitle">
          Manage platform users, oversee operations, and monitor system activities.
        </p>

        <div className="summary-cards">
          <div className="summary-card">
            <h3>200+</h3>
            <p>Registered Users</p>
          </div>
          <div className="summary-card">
            <h3>120</h3>
            <p>Farmers</p>
          </div>
          <div className="summary-card">
            <h3>50</h3>
            <p>Buyers</p>
          </div>
          <div className="summary-card">
            <h3>30</h3>
            <p>Agents</p>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Admin Tools</h3>
          <div className="quick-buttons">
            <button className="dashboard-btn">Manage Users</button>
            <button className="dashboard-btn">Approve Listings</button>
            <button className="dashboard-btn">Review Orders</button>
            <button className="dashboard-btn">View Reports</button>
            <button className="dashboard-btn">Configure Roles</button>
            <button className="dashboard-btn">System Settings</button>
            <button className="dashboard-btn">Platform Logs</button>
            <button className="dashboard-btn">Support Requests</button>
          </div>
        </div>
      </div>
    </div>
  );
}
