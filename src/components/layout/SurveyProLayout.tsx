import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  FileText,
  Home,
  LogOut,
  Menu,
  Plus,
  User,
  X,
} from "lucide-react";

interface SurveyProLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: "Dashboard", icon: Home, to: "/customer/dashboard" },
  { label: "My Bookings", icon: CalendarDays, to: "/customer/bookings" },
  { label: "Reports", icon: FileText, to: "/customer/reports" },
  { label: "Book a Survey", icon: Plus, to: "/customer/book" },
  { label: "My Profile", icon: User, to: "/customer/profile" },
];

export const SurveyProLayout = ({ children }: SurveyProLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) => {
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
    <div className="min-h-screen flex bg-[#EAEAEA] font-body">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[260px] bg-primary text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 h-[72px] border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-display text-lg font-semibold text-white">
            SurveyPro
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive: linkActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(to) || linkActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-6 border-t border-white/10">
          <Link
            to="/customer/login"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-w-0">
        {/* Top header */}
        <header className="h-[72px] bg-white border-b border-border flex items-center justify-end px-6 lg:px-8 gap-4">
          <button
            type="button"
            className="lg:hidden p-2 text-[#505050]"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <button
            type="button"
            className="relative p-2 text-[#505050] hover:bg-[#EAEAEA] rounded-full transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#37E49E]" />
          </button>
          <div className="w-9 h-9 rounded-full bg-[#37E49E] flex items-center justify-center text-primary font-semibold text-sm">
            JS
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};

export default SurveyProLayout;