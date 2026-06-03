import React from "react";
import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import ServicePage from "../pages/Services";
import PortfolioPage from "../pages/Portfolio";
import GaleryPage from "../pages/Galery";
import ContactPage from "../pages/Contact";
import DetailPortfolioPage from "../pages/DetailPortfolio";
import ServiceDetailPage from "../pages/ServicesDetailPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import PortfolioManagement from "../pages/ManagementPortfolio";
import GaleryManagement from "../pages/ManagementGalery";
import UserManagement from "../pages/ManagementUsers";
import SettingsPage from "../pages/SettingsPage";
import ServiceManagement from "../pages/ManagementService";
import ServiceForm from "../components/forms/ServiceForm";
import PortfolioForm from "../components/forms/PortfolioForm";
import ProfilePage from "../pages/ProfilePage";
import ProfileForm from "../components/forms/ProfileForm";
import ProtectedRoute from "./protectedRoute";
import UserForm from "../components/forms/UserForm";
import AttendanceManagement from "../pages/AttendancePage";
import AttendanceDetail from "../components/forms/DetailInfoAttendance";
import EmployeeDashboardPage from "../pages/DashboardEmployee";
import EmployeeAttendancePage from "../pages/EmployeeAttendancePage";
import AttendanceRecapSummary from "../pages/AttendanceRecapPage";
import NotFound from "../pages/NotFound";

export interface AppRoute {
  path: string;
  element: React.ReactNode;
}

const adminRoles = ["admin"];
const employeeRoles = ["employee"];
const userRoles = ["admin", "employee"];

const routes: AppRoute[] = [
  { path: "*", element: <NotFound /> },
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/services", element: <ServicePage /> },
  { path: "/services/:slug", element: <ServiceDetailPage /> },
  { path: "/portfolio", element: <PortfolioPage /> },
  { path: "/portfolio/:id", element: <DetailPortfolioPage /> },
  { path: "/article", element: <GaleryPage /> },
  { path: "/contact", element: <ContactPage /> },

  { path: "/admin-java", element: <LoginPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/profile/edit", element: <ProfileForm /> },

  // Dashboard diakses oleh employee
  {
    path: "/dashboard/employee",
    element: (
      <ProtectedRoute roles={employeeRoles}>
        <EmployeeDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employee/attendance",
    element: (
      <ProtectedRoute roles={employeeRoles}>
        <EmployeeAttendancePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "employe/attendance/detail/:attendanceId",
    element: (
      <ProtectedRoute roles={employeeRoles}>
        <AttendanceDetail />
      </ProtectedRoute>
    ),
  },

  // Dashboard diakses oleh adminRoles
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/layanan",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <ServiceManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/layanan/create",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <ServiceForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/layanan/edit/:id",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <ServiceForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/layanan/detail/:id",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <ServiceForm />
      </ProtectedRoute>
    ),
  },

  {
    path: "/dashboard/portfolio",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <PortfolioManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/portfolio/create",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <PortfolioForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/portfolio/edit/:id",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <PortfolioForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/portfolio/detail/:id",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <PortfolioForm />
      </ProtectedRoute>
    ),
  },

  {
    path: "/dashboard/galeri",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <GaleryManagement />
      </ProtectedRoute>
    ),
  },

  {
    path: "/dashboard/employee/acc",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <EmployeeDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employee/attendance/acc",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <EmployeeAttendancePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/attendance",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <AttendanceManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/attendance/recap",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <AttendanceRecapSummary />
      </ProtectedRoute>
    ),
  },
  {
    path: "/attendance/detail/:attendanceId",
    element: (
      <ProtectedRoute roles={userRoles}>
        <AttendanceDetail />
      </ProtectedRoute>
    ),
  },

  {
    path: "/dashboard/users",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <UserManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/create",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <UserForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/edit/:id",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <UserForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/detail/:id",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <UserForm />
      </ProtectedRoute>
    ),
  },

  {
    path: "/dashboard/settings",
    element: (
      <ProtectedRoute roles={adminRoles}>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
];

export default routes;
