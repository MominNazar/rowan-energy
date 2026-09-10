import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Bell,
  CalendarDays,
  FileText,
  Home,
  Layers,
  Map,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";

interface EngineerLayoutProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const navItems = [
  { label: "Dashboard", icon: Home, to: "/engineer/dashboard" },
  { label: "My Schedule", icon: CalendarDays, to: "/engineer/schedule" },
  { label: "Route Planner", icon: Map, to: "/engineer/route-planner" },
  { label: "Job Details", icon: FileText, to: "/engineer/job-details" },
  { label: "My Availability", icon: Settings, to: "/engineer/availability" },
];

export const EngineerLayout = ({
  children,
  sidebarOpen,
  setSidebarOpen,
}: EngineerLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-[#EAEAEA] font-body text-[#242424]">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[220px] bg-[#083F3C] text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/10">
          <Link
            to="/engineer/dashboard"
            className="flex items-center gap-2.5 focus:outline-none"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Layers size={18} className="text-[#37E49E]" />
            </div>
            <span className="font-display text-[20px] font-semibold text-white tracking-tight">
              Hover Lens
            </span>
          </Link>
          <button
            type="button"
            className="lg:hidden p-1.5 text-white/70 hover:text-white rounded-md hover:bg-white/10"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
          {navItems.map(({ label, icon: Icon, to }) => {
            const active = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#0e5049] text-white shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={18} className={active ? "text-white" : "text-white/70"} />
                <span>{label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link
            to="/engineer/login"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Bell size={18} className="text-white/70" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex-1 lg:ml-[220px] flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
};

export default EngineerLayout;