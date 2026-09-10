import { Link } from "react-router-dom";
import {
  CalendarDays,
  Download,
  FileText,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SurveyProLayout } from "@/components/layout/SurveyProLayout";

const CustomerDashboard = () => {
  return (
    <SurveyProLayout>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-8 lg:py-10">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-semibold text-[#242424]">
            Dashboard
          </h1>
          <p className="text-sm text-[#989898] mt-1">
            Overview of your survey activities
          </p>
        </div>

        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold text-[#242424]">
            Hi, John Smith
          </h2>
          <p className="text-sm text-[#989898] mt-1">
            Here's what's happening with your surveys today
          </p>
        </div>

        {/* Top cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {/* Next Scheduled Survey */}
          <div className="bg-white rounded-xl border border-border p-6 flex items-center gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-base font-semibold text-[#242424]">
                  Next Scheduled Survey
                </h3>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#EAEAEA] text-primary whitespace-nowrap">
                  Scheduled
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-[#989898]">Site Name</span>
                  <span className="text-[#242424] font-medium">
                    Downtown Office Complex
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#989898]">Date &amp; Time</span>
                  <span className="text-[#242424] font-medium">
                    March 15, 2025 at 10:00 AM
                  </span>
                </div>
              </div>
            </div>
            <Button className="h-10 text-sm font-semibold whitespace-nowrap">
              View Details
            </Button>
          </div>

          {/* Recent Report Available */}
          <div className="bg-white rounded-xl border border-border p-6 flex items-center gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-base font-semibold text-[#242424]">
                  Recent Report Available
                </h3>
                <FileText size={20} className="text-[#989898] shrink-0" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-[#989898]">File Name</span>
                  <span className="text-[#242424] font-medium truncate">
                    Survey_Report_Building_A.pdf
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#989898]">Survey Site</span>
                  <span className="text-[#242424] font-medium">
                    Riverside Commercial Center
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="h-10 text-sm font-semibold whitespace-nowrap border-primary text-primary"
            >
              <Download size={15} /> Download Report
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <h3 className="font-display text-lg font-semibold text-[#242424] mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <Link to="/customer/book" className="block">
            <div className="bg-white rounded-xl border border-border p-6 text-center hover:border-primary transition-colors group">
              <div className="w-10 h-10 rounded-full bg-[#EAEAEA] flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-colors">
                <Plus size={18} className="text-primary group-hover:text-white" />
              </div>
              <h4 className="font-display text-base font-semibold text-[#242424] mb-1">
                Book New Survey
              </h4>
              <p className="text-sm text-[#989898]">Schedule a new survey for your property</p>
            </div>
          </Link>
          <Link to="/customer/bookings" className="block">
            <div className="bg-white rounded-xl border border-border p-6 text-center hover:border-primary transition-colors group">
              <div className="w-10 h-10 rounded-full bg-[#EAEAEA] flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-colors">
                <CalendarDays size={18} className="text-primary group-hover:text-white" />
              </div>
              <h4 className="font-display text-base font-semibold text-[#242424] mb-1">
                View All Bookings
              </h4>
              <p className="text-sm text-[#989898]">Manage your scheduled surveys</p>
            </div>
          </Link>
          <Link to="/customer/reports" className="block">
            <div className="bg-white rounded-xl border border-border p-6 text-center hover:border-primary transition-colors group">
              <div className="w-10 h-10 rounded-full bg-[#EAEAEA] flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-colors">
                <FileText size={18} className="text-primary group-hover:text-white" />
              </div>
              <h4 className="font-display text-base font-semibold text-[#242424] mb-1">
                View Reports
              </h4>
              <p className="text-sm text-[#989898]">Access your completed survey reports</p>
            </div>
          </Link>
        </div>
      </div>
    </SurveyProLayout>
  );
};

export default CustomerDashboard;