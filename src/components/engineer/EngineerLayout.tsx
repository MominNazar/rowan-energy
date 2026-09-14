import { ReactNode, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  Home,
  Layers,
  Map,
  Menu,
  Route,
  Settings,
  User,
  X,
} from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface EngineerLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
}

const navItems = [
  { label: "Dashboard", icon: Home, to: "/engineer/dashboard" },
  { label: "My Schedule", icon: Route, to: "/engineer/schedule" },
  { label: "Route Planner", icon: Map, to: "/engineer/route-planner" },
  { label: "Job Details", icon: User, to: "/engineer/job-details" },
  { label: "My Availability", icon: Settings, to: "/engineer/availability" },
];

const mockNotifications = [
  {
    id: "1",
    title: "Risk assessment due",
    body: "Job #1029 risk assessment has not been submitted.",
  },
  {
    id: "2",
    title: "Schedule update",
    body: "Westfield Wind Farm start time moved to 2:00 PM.",
  },
];

const backLabelFromPath = (path: string) => {
  if (path.includes("/dashboard")) return "Back to Dashboard";
  if (path.includes("/schedule")) return "Back to Schedule";
  if (path.includes("/job-details")) return "Back to Job Details";
  if (path.includes("/checklist")) return "Back to Checklist";
  if (path.includes("/upload")) return "Back to Upload";
  if (path.includes("/availability")) return "Back to Availability";
  if (path.includes("/route-planner")) return "Back to Route Planner";
  return "Back";
};

export const EngineerLayout = ({
  children,
  title,
  subtitle,
  backTo,
  backLabel,
}: EngineerLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("engineerAuth");
    sessionStorage.removeItem("engineerAuth");
    setIsSidebarOpen(false);
    navigate("/engineer/login");
    showSuccess("Logged out");
  };

  const handleBellClick = () => {
    setNotificationsOpen((open) => {
      const next = !open;
      if (next && mockNotifications.length === 0) {
        showSuccess("No new notifications");
      }
      return next;
    });
  };

  const resolvedBackLabel =
    backLabel || (backTo ? backLabelFromPath(backTo) : "Back");

  return (
    <div className="min-h-screen flex bg-[#F5F5F5] min-w-0 w-full">
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
                (location.pathname.startsWith("/engineer/job-details") ||
                  location.pathname.startsWith("/engineer/upload") ||
                  location.pathname.startsWith("/engineer/checklist")));
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
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
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
          </button>
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
      <div className="flex-1 flex flex-col min-w-0 w-full lg:ml-[260px]">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 min-h-[76px] bg-white border-b border-[#E0E0E0] flex items-center justify-between px-3 sm:px-6 lg:px-8 py-3 gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <button
              type="button"
              className="lg:hidden p-2 -ml-1 text-[#242424] hover:bg-[#F5F5F5] rounded-md transition-colors shrink-0"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar menu"
            >
              <Menu size={22} />
            </button>

            <div className="min-w-0 flex-1">
              {backTo && (
                <Link
                  to={backTo}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#505050] hover:text-[#242424] transition-colors mb-1.5 max-w-full"
                >
                  <ArrowLeft size={14} className="shrink-0" />
                  <span className="truncate">{resolvedBackLabel}</span>
                </Link>
              )}
              <h1 className="font-display text-base sm:text-lg md:text-2xl font-semibold text-[#242424] leading-tight break-words line-clamp-2">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-[#505050] break-words mt-0.5 line-clamp-2">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <div className="relative hidden sm:block" ref={notificationsRef}>
              <button
                type="button"
                onClick={handleBellClick}
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center text-[#505050] hover:text-[#242424] hover:border-[#989898] transition-colors"
                aria-label="View notifications"
              >
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#37E49E] ring-2 ring-white" />
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-1.5rem)] rounded-xl border border-[#E0E0E0] bg-white shadow-lg z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#E0E0E0]">
                    <p className="text-sm font-semibold text-[#242424]">
                      Notifications
                    </p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {mockNotifications.map((n) => (
                      <div
                        key={n.id}
                        className="px-4 py-3 border-b border-[#E0E0E0] last:border-0 hover:bg-[#F5F5F5]"
                      >
                        <p className="text-sm font-medium text-[#242424]">
                          {n.title}
                        </p>
                        <p className="text-xs text-[#505050] mt-0.5">{n.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0A3D3A] text-white font-semibold text-[10px] flex items-center justify-center shrink-0">
              AJ
            </div>
          </div>
        </header>

        {/* Page Content — min-w-0 (not overflow-x-hidden) so Select/focus rings aren't clipped under sticky header */}
        <main className="flex-1 w-full min-w-0 max-w-[1440px] mx-auto p-3 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default EngineerLayout;
