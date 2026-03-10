import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DonorDashboard from "../components/dashboards/DonorDashboard";
import ReceiverDashboard from "../components/dashboards/ReceiverDashboard";
import AdminDashboard from "../components/dashboards/AdminDashboard";
import VolunteerDashboard from "../components/dashboards/VolunteerDashboard";
import "./dashboardpage.css";

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="container py-4">
      {user?.role === "donor" && <DonorDashboard />}
      {user?.role === "ngo" && <ReceiverDashboard />}
      {user?.role === "admin" && <AdminDashboard />}
      {user?.role === "volunteer" && <VolunteerDashboard />}
    </div>
  );
};

export default DashboardPage;