import React from "react";
import { Link } from "react-router-dom";

const AgentDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Agent Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Farmers Managed</h3>
          <p className="text-2xl font-bold text-green-600">18</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Tasks Completed</h3>
          <p className="text-2xl font-bold text-green-600">47</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Pending Requests</h3>
          <p className="text-2xl font-bold text-green-600">5</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Activity</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>✅ Approved 2 farmer profiles</li>
          <li>📅 Scheduled a field visit</li>
          <li>📤 Submitted report for buyer</li>
        </ul>
      </div>

      {/* Quick Links */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Quick Links</h3>
        <ul className="space-y-2">
          <li><Link to="/farmers" className="text-green-600 hover:underline">View Farmers</Link></li>
          <li><Link to="/reports" className="text-green-600 hover:underline">Reports</Link></li>
          <li><Link to="/tasks" className="text-green-600 hover:underline">Manage Tasks</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default AgentDashboard;
