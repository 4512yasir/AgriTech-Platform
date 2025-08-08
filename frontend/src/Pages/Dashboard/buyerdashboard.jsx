import "./dashboard.css"; 


export default function BuyerDashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <h2 className="dashboard-title">Buyer Dashboard</h2>
        <p className="dashboard-subtitle">
          Browse farm produce, manage your orders, and communicate with farmers.
        </p>

        <div className="summary-cards">
          <div className="summary-card">
            <h3>--</h3>
            <p>Available Products</p>
          </div>
          <div className="summary-card">
            <h3>--</h3>
            <p>Pending Orders</p>
          </div>
          <div className="summary-card">
            <h3>--</h3>
            <p>Delivered Orders</p>
          </div>
          <div className="summary-card">
            <h3>--</h3>
            <p>Messages from Farmers</p>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="quick-buttons">
            <button className="dashboard-btn">View Marketplace</button>
            <button className="dashboard-btn">My Orders</button>
            <button className="dashboard-btn">Track Delivery</button>
            <button className="dashboard-btn">Message Farmers</button>
            <button className="dashboard-btn">Request Bulk Orders</button>
            <button className="dashboard-btn">Saved Products</button>
            <button className="dashboard-btn">Review Products</button>
            <button className="dashboard-btn">Help Center</button>
          </div>
        </div>
      </div>
    </div>
  );
}
