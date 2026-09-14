import { Link } from "react-router-dom";
import {
  Download,
  FileText,
  Folder,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SurveyProLayout } from "@/components/layout/SurveyProLayout";
import { showSuccess } from "@/utils/toast";

const downloadRecentReport = () => {
  const content = [
    "Survey Report: Survey_Report_Building_A.pdf",
    "Site: Riverside Commercial Center",
    "",
    "This is a demo download. No backend report file is attached.",
  ].join("\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Survey_Report_Building_A.txt";
  a.click();
  URL.revokeObjectURL(url);
  showSuccess("Report downloaded");
};

const CustomerDashboard = () => {
  return (
    <SurveyProLayout
      title="Dashboard"
      subtitle="Overview of your survey activities"
    >
      <div className="min-w-0 max-w-full space-y-6 sm:space-y-8">
        {/* Greeting — matches Figma */}
        <div className="min-w-0">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#242424] leading-tight">
            Hi, John Smith
          </h2>
          <p className="text-sm text-[#989898] mt-1 leading-relaxed">
            Here&apos;s what&apos;s happening with your surveys today
          </p>
        </div>

        {/* Status cards — stack on mobile, 2-col from md */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 min-w-0">
          {/* Next Scheduled Survey */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-5 lg:p-6 flex flex-col min-w-0 shadow-sm">
            <div className="flex items-start justify-between gap-2 mb-4">
              <h3 className="font-display text-sm sm:text-base font-semibold text-[#242424] leading-snug min-w-0">
                Next Scheduled Survey
              </h3>
              <span className="shrink-0 text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full bg-[#DBEAFE] text-[#1D4ED8]">
                Scheduled
              </span>
            </div>

            <div className="space-y-3 text-sm flex-1 min-w-0">
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-0.5">Site Name</p>
                <p className="text-[#242424] font-medium break-words">
                  Downtown Office Complex
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-0.5">Date &amp; Time</p>
                <p className="text-[#242424] font-medium break-words">
                  March 15, 2025 at 10:00 AM
                </p>
              </div>
            </div>

            <Button
              asChild
              className="mt-5 h-10 w-full sm:w-auto self-stretch sm:self-start px-5 bg-[#0A3D3A] hover:bg-[#083F3C] text-white rounded-lg text-sm font-semibold"
            >
              <Link to="/customer/bookings/1">View Details</Link>
            </Button>
          </div>

          {/* Recent Report Available */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-5 lg:p-6 flex flex-col min-w-0 shadow-sm">
            <div className="flex items-start justify-between gap-2 mb-4">
              <h3 className="font-display text-sm sm:text-base font-semibold text-[#242424] leading-snug min-w-0">
                Recent Report Available
              </h3>
              <FileText size={18} className="text-[#989898] shrink-0 mt-0.5" />
            </div>

            <div className="space-y-3 text-sm flex-1 min-w-0">
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-0.5">File Name</p>
                <p className="text-[#242424] font-medium break-all sm:break-words">
                  Survey_Report_Building_A.pdf
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-0.5">Survey Site</p>
                <p className="text-[#242424] font-medium break-words">
                  Riverside Commercial Center
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="mt-5 h-10 w-full sm:w-auto self-stretch sm:self-start px-5 border-[#0A3D3A] text-[#0A3D3A] hover:bg-[#E8F6F3] rounded-lg text-sm font-semibold gap-2"
              onClick={downloadRecentReport}
            >
              <Download size={15} />
              Download Report
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="min-w-0">
          <h3 className="font-display text-base sm:text-lg font-semibold text-[#242424] mb-3 sm:mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            <Link to="/customer/book" className="block min-w-0 h-full">
              <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 text-center h-full hover:border-[#0A3D3A] transition-colors group flex flex-col items-center justify-center shadow-sm">
                <div className="w-11 h-11 rounded-lg bg-[#F3F4F6] flex items-center justify-center mb-3 group-hover:bg-[#0A3D3A] transition-colors">
                  <Plus
                    size={20}
                    className="text-[#0A3D3A] group-hover:text-white"
                  />
                </div>
                <h4 className="font-display text-sm sm:text-base font-semibold text-[#242424] mb-1">
                  Book New Survey
                </h4>
                <p className="text-xs sm:text-sm text-[#989898] leading-relaxed px-1">
                  Schedule a new survey for your property
                </p>
              </div>
            </Link>

            <Link to="/customer/bookings" className="block min-w-0 h-full">
              <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 text-center h-full hover:border-[#0A3D3A] transition-colors group flex flex-col items-center justify-center shadow-sm">
                <div className="w-11 h-11 rounded-lg bg-[#F3F4F6] flex items-center justify-center mb-3 group-hover:bg-[#0A3D3A] transition-colors">
                  <Folder
                    size={20}
                    className="text-[#0A3D3A] group-hover:text-white"
                  />
                </div>
                <h4 className="font-display text-sm sm:text-base font-semibold text-[#242424] mb-1">
                  View All Bookings
                </h4>
                <p className="text-xs sm:text-sm text-[#989898] leading-relaxed px-1">
                  Manage your scheduled surveys
                </p>
              </div>
            </Link>

            <Link
              to="/customer/reports"
              className="block min-w-0 h-full sm:col-span-2 lg:col-span-1"
            >
              <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 text-center h-full hover:border-[#0A3D3A] transition-colors group flex flex-col items-center justify-center shadow-sm">
                <div className="w-11 h-11 rounded-lg bg-[#F3F4F6] flex items-center justify-center mb-3 group-hover:bg-[#0A3D3A] transition-colors">
                  <FileText
                    size={20}
                    className="text-[#0A3D3A] group-hover:text-white"
                  />
                </div>
                <h4 className="font-display text-sm sm:text-base font-semibold text-[#242424] mb-1">
                  View Reports
                </h4>
                <p className="text-xs sm:text-sm text-[#989898] leading-relaxed px-1">
                  Access your completed survey reports
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </SurveyProLayout>
  );
};

export default CustomerDashboard;
