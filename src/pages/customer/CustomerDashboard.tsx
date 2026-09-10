import { Link } from "react-router-dom";
import {
  CalendarDays,
  Download,
  FileText,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SurveyProLayout } from "@/components/layout/SurveyProLayout";

const CustomerDashboard = () => {
  return (
    <SurveyProLayout title="Dashboard" subtitle="Overview of your survey activities">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Top cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 mb-8">
          {/* Next Scheduled Survey */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6 flex items-center gap-5 sm:gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
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
                  <span className="text-[#242424] font-medium truncate">
                    Downtown Office Complex
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#989898]">Date &amp; Time</span>
                  <span className="text-[#242424] font-medium truncate">
                    March 15, 2025 at 10:00 AM
                  </span>
                </div>
              </div>
            </div>
            <Button className="h-10 text-sm font-semibold whitespace-nowrap shrink-0">
              View Details
            </Button>
          </div>

          {/* Recent Report Available */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6 flex items-center gap-5 sm:gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
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
                  <span className="text-[#242424] font-medium truncate">
                    Riverside Commercial Center
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="h-10 text-sm font-semibold whitespace-nowrap border-primary text-primary shrink-0"
            >
              <Download size={15} /> Download Report
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <h3 className="font-display text-lg font-semibold text-[#242424] mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          <Link to="/customer/book" className="block h-full">
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6 text-center h-full hover:border-[#0A3D3A] transition-colors group flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#EAEAEA] flex items-center justify-center mb-3 group-hover:bg-[#0A3D3A] transition-colors">
                <Plus size={18} className="text-[#0A3D3A] group-hover:text-white" />
              </div>
              <h4 className="font-display text-base font-semibold text-[#242424] mb-1">
                Book New Survey
              </h4>
              <p className="text-sm text-[#989898]">Schedule a new survey for your property</p>
            </div>
          </Link>
          <Link to="/customer/bookings" className="block h-full">
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6 text-center h-full hover:border-[#0A3D3A] transition-colors group flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#EAEAEA] flex items-center justify-center mb-3 group-hover:bg-[#0A3D3A] transition-colors">
                <CalendarDays size={18} className="text-[#0A3D3A] group-hover:text-white" />
              </div>
              <h4 className="font-display text-base font-semibold text-[#242424] mb-1">
                View All Bookings
              </h4>
              <p className="text-sm text-[#989898]">Manage your scheduled surveys</p>
            </div>
          </Link>
          <Link to="/customer/reports" className="block h-full">
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6 text-center h-full hover:border-[#0A3D3A] transition-colors group flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#EAEAEA] flex items-center justify-center mb-3 group-hover:bg-[#0A3D3A] transition-colors">
                <FileText size={18} className="text-[#0A3D3A] group-hover:text-white" />
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
