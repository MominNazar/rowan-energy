import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Home,
  Layers,
  Map,
  CalendarDays,
  Settings,
  Users,
  FileText,
  Briefcase,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showNotification?: boolean;
}

const navItems = [
  { label: "Dashboard", icon: Home, to: "/admin/dashboard" },
  { label: "Leads", icon: Users, to: "/admin/leads" },
  { label: "Jobs", icon: Briefcase, to: "/admin/jobs" },
  { label: "Job Calendar", icon: CalendarDays, to: "/admin/calendar" },
  { label: "Route Planner", icon: Map, to: "/admin/route-planner" },
  { label: "Engineers", icon: Users, to: "/admin/engineers" },
  { label: "Reports", icon: FileText, to: "/admin/reports" },
  { label: "Settings", icon: Settings, to: "/admin/settings" },
];

export const AdminLayout = ({
  children,
  title,
  subtitle,
  showNotification = false,
}: AdminLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-[#EBEBEB]">
      <aside className="w-60 shrink-0 bg-[#083F3C] flex flex-col">
        <div className="flex items-center gap-2.5 px-5 h-16">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
            <Layers size={20} className="text-white" />
          </div>
          <div>
            <p className="font-display text-[17px] font-semibold text-white leading-tight">
              SolarAdmin
            </p>
            <p className="text-[10px] text-white/60 leading-tight">
              Management System
            </p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 h-10 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#0F5C56] text-[#37E49E]"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 h-10 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
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
            {showNotification && (
              <button
                type="button"
                className="relative w-10 h-10 rounded-lg border border-[#E0E0E0] bg-white flex items-center justify-center text-[#505050] hover:text-[#242424] hover:border-[#989898] transition-colors"
                aria-label="View notifications"
              >
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EF4444] ring-2 ring-white" />
              </button>
            )}
            <button
              type="button"
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg border border-transparent hover:bg-[#F5F5F5] transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[#D1FAE5] text-[#0A3D3A] font-semibold text-sm flex items-center justify-center">
                D
              </div>
              <span className="text-sm font-medium text-[#242424]">David</span>
              <ChevronDown size={14} className="text-[#989898]" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
