import DashboardLayout from "../components/layouts/Dashboard/DashboardLayout";
import { Settings } from "lucide-react";

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-slate-700 flex items-center gap-2 mb-6">
        <Settings size={22} className="text-gray-600" /> System Settings
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <p className="text-gray-600">No settings available yet.</p>
        {/* Add settings form if needed */}
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
