import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  Home,
  Layers,
  Map,
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
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-[#083F3C] flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-6 h-16">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
            <Layers size={20} className="text-white" />
          </div>
          <span className="font-display text-[20px] font-semibold text-white tracking-tight">
            Hover Lens
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
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
                className={`flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-[#E0E0E0] flex items-center justify-between px-6">
          <div>
            <h1 className="font-display text-[20px] font-semibold text-[#242424]">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-[#989898] mt-0.5">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative w-10 h-10 rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center text-[#505050] hover:text-[#242424] hover:border-[#989898] transition-colors"
              aria-label="View notifications"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#37E49E] ring-2 ring-white" />
            </button>
            <div className="w-10 h-10 rounded-full bg-[#0A3D3A] text-white font-semibold text-sm flex items-center justify-center">
              AJ
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default EngineerLayout;