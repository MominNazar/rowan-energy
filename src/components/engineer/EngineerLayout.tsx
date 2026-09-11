import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  Home,
  Layers,
  Map,
  Menu,
  Route,
  Settings,
  User,
  X,
} from "lucide-react";

interface EngineerLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  backTo?: string;
}

const navItems = [
  { label: "Dashboard", icon: Home, to: "/engineer/dashboard" },
  { label: "My Schedule", icon: Route, to: "/engineer/schedule" },
  { label: "Route Planner", icon: Map, to: "/engineer/route-planner" },
  { label: "Job Details", icon: User, to: "/engineer/job-details" },
  { label: "My Availability", icon: Settings, to: "/engineer/availability" },
];

export const EngineerLayout = ({
  children,
  title,
  subtitle,
  backTo,
}: EngineerLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-[#083F3C] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Logo & Close for Mobile */}
        <div className="flex items-center justify-between px-6 h-[76px] border-b border-white/10">
          <Link
            to="/engineer/dashboard"
            className="flex items-center gap-2.5 focus:outline-none"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#37E49E]">
              <Layers size={18} strokeWidth={2.2} />
            </div>
            <span className="font-display text-[20px] font-semibold text-white tracking-tight">
              Hover Lens
            </span>
          </Link>
          <button
            type="button"
            className="lg:hidden p-1.5 text-white/70 hover:text-white rounded-md hover:bg-white/10"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.to ||
              (item.to === "/engineer/job-details" &&
                location.pathname.startsWith("/engineer/job-details"));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#0e4e4a] text-white shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-white" : "text-white/70"}
                  strokeWidth={2}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <Link
            to="/"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </Link>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-[260px]">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 min-h-[76px] bg-white border-b border-[#E0E0E0] flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              className="lg:hidden p-2 -ml-1 text-[#242424] hover:bg-[#F5F5F5] rounded-md transition-colors shrink-0"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar menu"
            >
              <Menu size={22} />
            </button>

            <div className="min-w-0">
                          <h1 className="font-display text-base sm:text-lg md:text-2xl font-semibold text-[#242424] leading-tight break-words">
                            {title}
                          </h1>
                          {subtitle && (
                            <p className="text-xs sm:text-sm text-[#505050] break-words mt-0.5">
                              {subtitle}
                            </p>
                          )}
                        </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                      <button
                        type="button"
                        className="hidden sm:flex relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center text-[#505050] hover:text-[#242424] hover:border-[#989898] transition-colors"
                        aria-label="View notifications"
                      >
                        <Bell size={18} />
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#37E49E] ring-2 ring-white" />
                      </button>
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0A3D3A] text-white font-semibold text-[10px] flex items-center justify-center">
                        AJ
                      </div>
                    </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 w-full max-w-[1440px] mx-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default EngineerLayout;