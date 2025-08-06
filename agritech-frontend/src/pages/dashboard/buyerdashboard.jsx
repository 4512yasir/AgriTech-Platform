import React from "react";
import { Link } from "react-router-dom";

const BuyerDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Buyer Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Orders Made</h3>
          <p className="text-2xl font-bold text-green-600">12</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Pending Deliveries</h3>
          <p className="text-2xl font-bold text-green-600">3</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Total Spent</h3>
          <p className="text-2xl font-bold text-green-600">KSh 150,000</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Activity</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>🛒 Ordered 50 bags of maize</li>
          <li>📩 Message from Agent John</li>
          <li>💬 Left feedback for a seller</li>
        </ul>
      </div>

      {/* Quick Links */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Quick Links</h3>
        <ul className="space-y-2">
          <li><Link to="/marketplace" className="text-green-600 hover:underline">Marketplace</Link></li>
          <li><Link to="/orders" className="text-green-600 hover:underline">My Orders</Link></li>
          <li><Link to="/support" className="text-green-600 hover:underline">Support</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default BuyerDashboard;
