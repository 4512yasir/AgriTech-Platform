import FarmerDashboard from './farmerdashboard';
import BuyerDashboard from './buyerdashboard';
import AgentDashboard from './agentdashboard';
import AdminDashboard from './AdminDashboard';

export default function RoleBasedDashboard() {
  const role = localStorage.getItem('role');

  switch (role) {
    case 'farmer':
      return <FarmerDashboard />;
    case 'buyer':
      return <BuyerDashboard />;
    case 'agent':
      return <AgentDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <div>Unauthorized Access</div>;
  }
}
