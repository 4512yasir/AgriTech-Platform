import "./dashboard.css"; 

export default function AgentDashboard() {
  return (
    <div className="dashboard">
      
      <div className="dashboard-content">
        <h2 className="dashboard-title">Agent Dashboard</h2>
        <p className="dashboard-subtitle">
          Empower farmers, connect buyers, and manage logistics effectively.
        </p>

        <div className="summary-cards">
          <div className="summary-card">
            <h3>20+</h3>
            <p>Products Assisted</p>
          </div>
          <div className="summary-card">
            <h3>15</h3>
            <p>Farmers Supported</p>
          </div>
          <div className="summary-card">
            <h3>30</h3>
            <p>Orders Tracked</p>
          </div>
          <div className="summary-card">
            <h3>12</h3>
            <p>Loans Facilitated</p>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="quick-buttons">
            <button className="dashboard-btn">Upload Product for Farmer</button>
            <button className="dashboard-btn">View All Listings</button>
            <button className="dashboard-btn">Track Buyer Orders</button>
            <button className="dashboard-btn">Access Training Materials</button>
            <button className="dashboard-btn">Initiate Microloan</button>
            <button className="dashboard-btn">Farmer Onboarding</button>
            <button className="dashboard-btn">Send Message to Farmer</button>
            <button className="dashboard-btn">View Help Requests</button>
          </div>
        </div>
      </div>
    </div>
  );
}
