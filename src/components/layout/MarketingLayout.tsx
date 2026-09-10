import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export const MarketingLayout = ({ children }: MarketingLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col font-body">
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-[22px] font-semibold text-primary tracking-tight">
              Hover Lens
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-[#505050] hover:text-primary"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/#services"
              className="text-sm font-medium text-[#505050] hover:text-primary transition-colors"
            >
              Services
            </NavLink>
            <NavLink
              to="/#how-it-works"
              className="text-sm font-medium text-[#505050] hover:text-primary transition-colors"
            >
              How It Works
            </NavLink>
            <NavLink
              to="/#contact"
              className="text-sm font-medium text-[#505050] hover:text-primary transition-colors"
            >
              Contact
            </NavLink>
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white rounded-md px-5 h-10 text-sm font-semibold"
            >
              Login
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-white rounded-md px-5 h-10 text-sm font-semibold"
            >
              Instant Quote
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-primary"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-4">
            <NavLink
              to="/"
              end
              onClick={toggleMenu}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-[#505050] hover:text-primary"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink to="/#services" onClick={toggleMenu} className="text-sm font-medium text-[#505050] hover:text-primary">
              Services
            </NavLink>
            <NavLink to="/#how-it-works" onClick={toggleMenu} className="text-sm font-medium text-[#505050] hover:text-primary">
              How It Works
            </NavLink>
            <NavLink to="/#contact" onClick={toggleMenu} className="text-sm font-medium text-[#505050] hover:text-primary">
              Contact
            </NavLink>
            <div className="flex gap-3 pt-2 border-t border-border">
              <Button
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary hover:text-white rounded-md h-10 text-sm font-semibold"
              >
                Login
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-md h-10 text-sm font-semibold">
                Instant Quote
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default MarketingLayout;