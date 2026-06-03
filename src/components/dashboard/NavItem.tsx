// components/layouts/NavItem.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

const NavItem = ({ to, icon, label }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full font-medium transition duration-200 relative ${
        isActive
          ? "bg-blue-50 text-blue-700"
          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
      }`}
    >
      {isActive && (
        <span className="absolute left-0 h-full w-1 bg-blue-600 rounded-r-sm" />
      )}
      <span className="w-6 h-6">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default NavItem;
