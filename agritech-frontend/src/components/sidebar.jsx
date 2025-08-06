import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Sidebar = () => {
  const { user, setUser } = useAuth();

  const handleLogout = () => setUser(null);

  return (
    <aside className="w-64 h-screen bg-green-900 text-white fixed">
      <div className="p-4 text-xl font-bold">AgriTech</div>
      <nav className="flex flex-col gap-3 p-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/marketplace">Marketplace</Link>
        <Link to="/loans">Loans</Link>
        <Link to="/training">Training</Link>
        <button onClick={handleLogout} className="mt-10 text-red-300 hover:text-red-500">
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
