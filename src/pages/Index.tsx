import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  Search,
  Shield,
  Thermometer,
  Users,
  Wind,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingLayout } from "@/components/layout/MarketingLayout";

const Index = () => {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="font-display text-4xl md:text-5xl lg:text-[52px] font-semibold text-[#242424] leading-[1.15] tracking-tight">
                Automated Drone
                <br />
                Surveys for Solar & Wind
              </h1>
              <p className="text-[#505050] text-base md:text-lg leading-relaxed max-w-xl">
                Thermal imaging, 3D scans, and AI reports for renewable energy
                sites - faster, smarter, safer.
              </p>
              <div className="pt-2">
                <Link to="/customer/book">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-md px-6 h-12 text-sm font-semibold inline-flex items-center gap-2">
                    <Search size={16} />
                    Get an Instant Quote
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-primary shrink-0" />
                  <span className="text-sm text-[#505050]">
                    AI-Powered Fault Detection
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-primary shrink-0" />
                  <span className="text-sm text-[#505050]">
                    Insurance-Compliant Reports
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-primary shrink-0" />
                  <span className="text-sm text-[#505050]">
                    Zero Manual Scanning Required
                  </span>
                </div>
              </div>
            </div>

            {/* Right Video Panel */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px] aspect-[4/3] bg-primary rounded-2xl overflow-hidden shadow-lg flex items-center justify-center group cursor-pointer">
                <div className="absolute inset-0 bg-primary/90" />
                <button
                  type="button"
                  className="relative z-10 w-16 h-16 rounded-full border-2 border-white/60 flex items-center justify-center transition-all group-hover:scale-110 group-hover:border-white"
                  aria-label="Play video"
                >
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="bg-[#EAEAEA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#242424] text-center mb-12">
            Problem & Solution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Problem Card */}
            <div className="bg-white rounded-xl border border-border p-8 lg:p-10">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                  <AlertTriangle size={22} className="text-red-500" />
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold text-[#242424] text-center mb-5">
                Manual surveys are slow & risky
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-[#505050]">
                  <X size={16} className="text-[#989898] shrink-0 mt-0.5" />
                  Time-consuming manual inspections
                </li>
                <li className="flex items-start gap-3 text-sm text-[#505050]">
                  <X size={16} className="text-[#989898] shrink-0 mt-0.5" />
                  Safety risks for technicians
                </li>
                <li className="flex items-start gap-3 text-sm text-[#505050]">
                  <X size={16} className="text-[#989898] shrink-0 mt-0.5" />
                  Human error in assessments
                </li>
              </ul>
            </div>

            {/* Solution Card */}
            <div className="bg-white rounded-xl border border-border p-8 lg:p-10">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle2 size={22} className="text-primary" />
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold text-[#242424] text-center mb-5">
                We deliver instant, AI-analyzed surveys
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-[#505050]">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  Automated drone inspections
                </li>
                <li className="flex items-start gap-3 text-sm text-[#505050]">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  AI-powered defect detection
                </li>
                <li className="flex items-start gap-3 text-sm text-[#505050]">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  Digital reports delivered instantly
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Services Section */}
      <section id="services" className="bg-[#EAEAEA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-20">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#242424] text-center mb-12">
            Our Core Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Thermal Imaging */}
            <div className="bg-white rounded-xl border border-border p-8 text-center">
              <div className="flex justify-center mb-5">
                <Thermometer size={32} className="text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#242424] mb-3">
                Thermal Imaging (Solar)
              </h3>
              <p className="text-sm text-[#505050] leading-relaxed">
                Identify hotspots and defects in solar panels with precision
                thermal imaging that detects issues invisible to the naked eye.
              </p>
            </div>

            {/* 3D Wind Turbine Scans */}
            <div className="bg-white rounded-xl border border-border p-8 text-center">
              <div className="flex justify-center mb-5">
                <Wind size={32} className="text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#242424] mb-3">
                3D Wind Turbine Scans
              </h3>
              <p className="text-sm text-[#505050] leading-relaxed">
                Comprehensive 3D modeling of wind turbines to detect structural
                issues, blade damage, and maintenance requirements.
              </p>
            </div>

            {/* Fault Reports + Compliance Docs */}
            <div className="bg-white rounded-xl border border-border p-8 text-center">
              <div className="flex justify-center mb-5">
                <FileText size={32} className="text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#242424] mb-3">
                Fault Reports + Compliance Docs
              </h3>
              <p className="text-sm text-[#505050] leading-relaxed">
                Detailed reports with AI-analyzed fault detection and
                insurance-compliant documentation for warranty claims.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Hover Lens? */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#242424] text-center mb-12 lg:mb-16">
            Why Choose Hover Lens?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Save Time */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Clock size={28} className="text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#242424] mb-2">
                Save Time
              </h3>
              <p className="text-sm text-[#505050] leading-relaxed">
                Get surveys completed in hours, not days or weeks
              </p>
            </div>

            {/* Reduce Risk */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield size={28} className="text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#242424] mb-2">
                Reduce Risk
              </h3>
              <p className="text-sm text-[#505050] leading-relaxed">
                Eliminate the need for dangerous manual inspections
              </p>
            </div>

            {/* AI Accuracy */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <line x1="9" y1="1" x2="9" y2="4" />
                  <line x1="15" y1="1" x2="15" y2="4" />
                  <line x1="9" y1="20" x2="9" y2="23" />
                  <line x1="15" y1="20" x2="15" y2="23" />
                  <line x1="20" y1="9" x2="23" y2="9" />
                  <line x1="20" y1="14" x2="23" y2="14" />
                  <line x1="1" y1="9" x2="4" y2="9" />
                  <line x1="1" y1="14" x2="4" y2="14" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold text-[#242424] mb-2">
                AI Accuracy
              </h3>
              <p className="text-sm text-[#505050] leading-relaxed">
                Machine learning algorithms detect issues humans might miss
              </p>
            </div>

            {/* No Manpower Required */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users size={28} className="text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#242424] mb-2">
                No Manpower Required
              </h3>
              <p className="text-sm text-[#505050] leading-relaxed">
                Automated systems require minimal on-site personnel
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-[#EAEAEA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#242424] text-center mb-4">
            How It Works
          </h2>
          <p className="text-center text-[#505050] text-base max-w-xl mx-auto mb-12 lg:mb-16">
            Our streamlined process delivers comprehensive drone surveys in just
            four simple steps
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 items-start">
            {/* Step 1: Inquire */}
            <div className="relative">
              <div className="bg-white rounded-xl border border-border p-6 lg:p-8 text-center">
                <div className="flex justify-center mb-5">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                    <Mail size={22} className="text-white" />
                  </div>
                </div>
                <h3 className="font-display text-lg font-semibold text-[#242424] mb-2">
                  Inquire
                </h3>
                <p className="text-sm text-[#505050] leading-relaxed">
                  Submit your project details and get an instant quote tailored to
                  your specific requirements
                </p>
              </div>
              <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 text-[#989898]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Step 2: Book */}
            <div className="relative">
              <div className="bg-white rounded-xl border border-border p-6 lg:p-8 text-center">
                <div className="flex justify-center mb-5">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-display text-lg font-semibold text-[#242424] mb-2">
                  Book
                </h3>
                <p className="text-sm text-[#505050] leading-relaxed">
                  Schedule your survey appointment and our team will coordinate
                  the optimal conditions for your site
                </p>
              </div>
              <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 text-[#989898]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Step 3: Survey */}
            <div className="relative">
              <div className="bg-white rounded-xl border border-border p-6 lg:p-8 text-center">
                <div className="flex justify-center mb-5">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                    <Search size={22} className="text-white" />
                  </div>
                </div>
                <h3 className="font-display text-lg font-semibold text-[#242424] mb-2">
                  Survey
                </h3>
                <p className="text-sm text-[#505050] leading-relaxed">
                  Automated drone conducts comprehensive thermal and visual
                  inspection of your renewable energy site
                </p>
              </div>
              <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 text-[#989898]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Step 4: Get Report */}
            <div className="relative">
              <div className="bg-white rounded-xl border border-border p-6 lg:p-8 text-center">
                <div className="flex justify-center mb-5">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                    <FileText size={22} className="text-white" />
                  </div>
                </div>
                <h3 className="font-display text-lg font-semibold text-[#242424] mb-2">
                  Get Report
                </h3>
                <p className="text-sm text-[#505050] leading-relaxed">
                  Receive AI-analyzed reports with actionable insights and
                  compliance documentation within hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#242424] text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl border border-border p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#EAEAEA] flex items-center justify-center">
                  <Users size={20} className="text-[#989898]" />
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold text-[#242424]">
                    Sarah Johnson
                  </h4>
                  <p className="text-sm text-[#989898]">Solar Farm Manager</p>
                </div>
              </div>
              <p className="text-sm text-[#505050] leading-relaxed italic">
                "Hover Lens saved us countless hours and identified issues we
                would have missed. The AI-powered reports are incredibly
                detailed."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl border border-border p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#EAEAEA] flex items-center justify-center">
                  <Users size={20} className="text-[#989898]" />
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold text-[#242424]">
                    Michael Chen
                  </h4>
                  <p className="text-sm text-[#989898]">Wind Farm Operations</p>
                </div>
              </div>
              <p className="text-sm text-[#505050] leading-relaxed italic">
                "The 3D scans of our turbines provided insights we couldn't get
                any other way. Maintenance planning is now data-driven and
                efficient."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <svg
                  width="28"
                  height="28"
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
                <span className="font-display text-xl font-semibold text-white">
                  Hover Lens
                </span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Automated drone surveys for renewable energy infrastructure.
              </p>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="font-display text-base font-semibold text-white mb-4">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <Mail size={14} className="text-white/60 shrink-0" />
                  info@hoverlens.com
                </li>
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <Phone size={14} className="text-white/60 shrink-0" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-start gap-3 text-sm text-white/80">
                  <MapPin size={14} className="text-white/60 shrink-0 mt-0.5" />
                  <span>
                    123 Drone Street, Tech City, TC
                    <br />
                    12345
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-base font-semibold text-white mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#services"
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#how-it-works"
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#contact"
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/customer/book"
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    Get a Quote
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="font-display text-base font-semibold text-white mb-4">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors"
                  aria-label="Twitter"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              &copy; 2025 Hover Lens. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </MarketingLayout>
  );
};

export default Index;