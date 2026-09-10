import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  FileText,
  Home,
  LogOut,
  Menu,
  Plus,
  User,
  X,
  Layers,
} from "lucide-react";

interface SurveyProLayoutProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  backTo?: string;
}

const navItems = [
  { label: "Dashboard", icon: Home, to: "/customer/dashboard" },
  { label: "My Bookings", icon: CalendarDays, to: "/customer/bookings" },
  { label: "Reports", icon: FileText, to: "/customer/reports" },
  { label: "Book a Survey", icon: Plus, to: "/customer/book" },
  { label: "My Profile", icon: User, to: "/customer/profile" },
];

export const SurveyProLayout = ({
  children,
  title,
  subtitle,
  backTo,
}: SurveyProLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isRouteActive = (to: string) => {
    if (to === "/customer/dashboard") {
      return location.pathname === "/customer/dashboard";
    }
    if (to === "/customer/bookings") {
      return (
        location.pathname === "/customer/bookings" ||
        location.pathname.startsWith("/customer/bookings/")
      );
    }
    return location.pathname === to;
  };

  return (
    <div className="min-h-screen flex bg-[#EAEAEA] font-body text-[#242424]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-[#083F3C] text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Logo & Close for Mobile */}
        <div className="flex items-center justify-between px-6 h-[76px] border-b border-white/10">
          <Link
            to="/customer/dashboard"
            className="flex items-center gap-2.5 focus:outline-none"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#37E49E]">
              <Layers size={18} strokeWidth={2.2} />
            </div>
            <span className="font-display text-[20px] font-semibold text-white tracking-tight">
              SurveyPro
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

        {/* Nav list */}
        <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
          {navItems.map(({ label, icon: Icon, to }) => {
            const active = isRouteActive(to);
            return (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#0e4e4a] text-white shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon
                  size={18}
                  className={active ? "text-white" : "text-white/70"}
                  strokeWidth={2}
                />
                <span>{label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <Link
            to="/customer/login"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut size={18} className="text-white/70" />
            <span>Logout</span>
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

      {/* Main Container */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 min-h-[76px] bg-white border-b border-[#D3D3D3] flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 gap-3">
          {/* Left Title / Back & Mobile hamburger */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              className="lg:hidden p-2 -ml-1 text-[#242424] hover:bg-[#EAEAEA] rounded-md transition-colors shrink-0"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar menu"
            >
              <Menu size={22} />
            </button>

            {backTo && (
              <button
                type="button"
                onClick={() => navigate(backTo)}
                className="p-1.5 -ml-1 text-[#242424] hover:bg-[#EAEAEA] rounded-md transition-colors shrink-0"
                aria-label="Go back"
              >
                <ArrowLeft size={20} />
              </button>
            )}

            <div className="min-w-0">
              {title && (
                <h1 className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-[#242424] leading-tight truncate">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-xs sm:text-sm text-[#505050] truncate mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right actions: Notifications & User Avatar */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D3D3D3] bg-white flex items-center justify-center text-[#505050] hover:text-[#242424] hover:border-[#989898] transition-colors"
              aria-label="View notifications"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#37E49E] ring-2 ring-white" />
            </button>
            <Link
              to="/customer/profile"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#D1FAE5] text-[#083F3C] font-semibold text-xs sm:text-sm flex items-center justify-center hover:opacity-90 transition-opacity"
              title="John Smith"
            >
              JS
            </Link>
          </div>
        </header>

        {/* Body content */}
        <main className="flex-1 w-full max-w-[1440px] mx-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SurveyProLayout;