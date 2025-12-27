import React from "react";
import Sidebar from "../Shared/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../Shared/Header";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <div className="sm:w-[15%]">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <Header className="sticky top-0 z-50 " />
        <Outlet />
      </div>
    </div>
  );
}
