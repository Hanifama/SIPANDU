import React, { useState } from "react";
import Sidebar from "../../dashboard/Sidebar";
import Navbar from "../../dashboard/Navbar";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 font-inter overflow-hidden">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Navbar sekarang sticky */}
        <Navbar onOpen={() => setSidebarOpen(true)} />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};


export default DashboardLayout;
