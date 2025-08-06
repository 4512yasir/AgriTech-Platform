import React from 'react';
import { Link } from 'react-router-dom';

const FarmerDashboard = () => {
  const recentActivities = [
    'Requested microloan - 2 Aug',
    'Updated crop listing - 1 Aug',
    'Joined training session - 30 Jul',
  ];

  const quickLinks = [
    { name: 'Marketplace', path: '/farmer/marketplace' },
    { name: 'My Profile', path: '/farmer/profile' },
    { name: 'My Loans', path: '/farmer/loans' },
    { name: 'Training', path: '/farmer/training' },
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-green-50 to-green-200">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Farmer Dashboard</h1>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-lg font-semibold">Crops Listed</h2>
          <p className="text-2xl text-green-600 font-bold">12</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-lg font-semibold">Pending Loans</h2>
          <p className="text-2xl text-green-600 font-bold">1</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-lg font-semibold">Training Hours</h2>
          <p className="text-2xl text-green-600 font-bold">5 hrs</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold text-green-700 mb-3">Recent Activity</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {recentActivities.map((activity, idx) => (
            <li key={idx}>{activity}</li>
          ))}
        </ul>
      </div>

      {/* Quick Links */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-green-700 mb-3">Quick Links</h2>
        <div className="flex flex-wrap gap-4">
          {quickLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className="bg-green-100 text-green-700 font-medium px-4 py-2 rounded-lg hover:bg-green-200 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
