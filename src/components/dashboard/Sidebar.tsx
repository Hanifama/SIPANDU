import {
  LayoutDashboard,
  ServerCog,
  Folder,
  Image,
  Users,
  LogOut,
  X,
  CalendarDays,
  Clock,
  ClipboardList,
} from "lucide-react";
import logo from "../../assets/logojava.png";
import NavItem from "./NavItem";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { tokenService } from "../../services/tokenService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = ({
  onClose,
  isSidebarOpen,
}: {
  onClose: () => void;
  isSidebarOpen: boolean;
}) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { logoutUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    toast.success("Logout berhasil!", {
      position: "top-right",
      autoClose: 2000,
    });
    setTimeout(() => navigate("/"), 1000);
  };

  // Ambil role user dari token
  const decoded = tokenService.decodeToken();
  const role = decoded?.role || "";

  return (
    <>
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-white border-r border-gray-100 shadow-md transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full rounded-r-3xl">
          {/* Bagian atas: Logo (fixed, tidak ikut scroll) */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
            <img src={logo} alt="Logo" className="h-10" />
            <button onClick={onClose} className="md:hidden text-gray-500">
              <X size={24} />
            </button>
          </div>

          {/* Bagian Tengah + nav scrollable */}
          <div className="flex-1 overflow-y-auto px-4 sidebar-scroll overscroll-contain">
            <nav className="mt-4 space-y-1">
              {/* Menu khusus admin */}
              {role === "admin" && (
                <>
                  {/* Group 1: Home */}
                  <div className="mt-2">
                    <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Home
                    </p>
                    <NavItem
                      to="/dashboard/employee/acc"
                      icon={<LayoutDashboard size={18} />}
                      label="Dashboard"
                    />
                    {/* <NavItem
                      to="/dashboard"
                      icon={<LayoutDashboard />}
                      label="Dashboard"
                    /> */}
                  </div>

                  {/* Group 2: Manajemen Website  */}
                  <div className="mt-6">
                    <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Manajemen Website
                    </p>
                    <NavItem
                      to="/dashboard/layanan"
                      icon={<ServerCog />}
                      label="Layanan"
                    />
                    <NavItem
                      to="/dashboard/portfolio"
                      icon={<Folder />}
                      label="Portfolio"
                    />
                    <NavItem
                      to="/dashboard/galeri"
                      icon={<Image />}
                      label="Galeri"
                    />
                  </div>

                  {/* Group 3: Absensi */}
                  <div className="mt-6">
                    <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Absensi
                    </p>
                    {/* <NavItem
                      to="/dashboard/employee/acc"
                      icon={<LayoutDashboard size={18} />}
                      label="Dashboard"
                    /> */}
                    <NavItem
                      to="/employee/attendance/acc"
                      icon={<CalendarDays size={18} />}
                      label="Absensi"
                    />
                    <NavItem
                      to="/dashboard/attendance/recap"
                      icon={<ClipboardList size={18} />}
                      label="Rekap Absensi"
                    />
                    <NavItem
                      to="/dashboard/attendance"
                      icon={<Clock size={18} />}
                      label="Histori Absensi"
                    />
                  </div>

                  {/* Group 5: Setting */}
                  <div className="mt-6">
                    <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Pengaturan
                    </p>
                    <NavItem
                      to="/dashboard/users"
                      icon={<Users />}
                      label="Karyawan"
                    />
                  </div>
                </>
              )}

              {/* Menu Khusus employee */}
              {role === "employee" && (
                <>
                  {/* Group 1: Home */}
                  <div className="mt-2">
                    <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Home
                    </p>
                    <NavItem
                      to="/dashboard/employee"
                      icon={<LayoutDashboard />}
                      label="Dashboard"
                    />
                  </div>

                  {/* Group 2: Absensi */}
                  <div className="mt-6">
                    <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Absensi
                    </p>
                    <NavItem
                      to="/employee/attendance"
                      icon={<LayoutDashboard />}
                      label="Absensi"
                    />
                  </div>
                </>
              )}
            </nav>
          </div>

          {/* Bagian bawah: Logout sticky */}
          <div className="px-6 py-4 border-t border-gray-100 shrink-0">
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-2 text-rose-500 hover:text-rose-600 font-medium transition-colors duration-200"
            >
              <LogOut size={20} />
              Keluar
            </button>
          </div>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Modal Konfirmasi Logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-9999 bg-[rgba(0,0,0,0.05)] backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">Yakin ingin logout?</h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700"
              >
                Yakin
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default Sidebar;
