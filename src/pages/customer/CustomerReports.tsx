import { useState } from "react";
import {
  ChevronDown,
  Download,
  FileText,
  Search,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SurveyProLayout } from "@/components/layout/SurveyProLayout";

const reports = [
  {
    id: "1",
    title: "Building Condition Report",
    site: "Downtown Office Complex",
    date: "Feb 28, 2025",
    type: "PDF",
  },
  {
    id: "2",
    title: "Equipment Inventory",
    site: "Manufacturing Plant A",
    date: "Feb 15, 2025",
    type: "CSV",
  },
  {
    id: "3",
    title: "Structural Assessment",
    site: "Riverside Warehouse",
    date: "Jan 30, 2025",
    type: "PDF",
  },
  {
    id: "4",
    title: "Site Photos Collection",
    site: "Tech Campus Building",
    date: "Jan 20, 2025",
    type: "ZIP",
  },
  {
    id: "5",
    title: "Safety Compliance Report",
    site: "Industrial Complex",
    date: "Jan 10, 2025",
    type: "PDF",
  },
  {
    id: "6",
    title: "Energy Audit Data",
    site: "Corporate Headquarters",
    date: "Dec 28, 2024",
    type: "CSV",
  },
];

const CustomerReports = () => {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [fileType, setFileType] = useState("all");

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <SurveyProLayout
      title="Reports"
      subtitle="Access and download your completed survey reports"
    >
      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#D3D3D3] p-4 sm:p-5 lg:p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 min-w-0">
            <label className="block text-xs sm:text-sm font-semibold text-[#242424] mb-2">
              Search Reports
            </label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#989898] pointer-events-none"
              />
              <Input
                type="text"
                placeholder="Search by site name or report title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 pl-9 border-[#D3D3D3] rounded-lg text-sm text-[#242424] focus-visible:ring-[#083F3C] w-full"
              />
            </div>
          </div>

          {/* Date Range */}
          <div className="w-full lg:w-48">
            <label className="block text-xs sm:text-sm font-semibold text-[#242424] mb-2">
              Date Range
            </label>
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full h-11 appearance-none rounded-lg border border-[#D3D3D3] bg-white pl-3 pr-10 text-sm text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#083F3C] cursor-pointer"
              >
                <option value="all">All Time</option>
                <option value="last30">Last 30 Days</option>
                <option value="last90">Last 90 Days</option>
                <option value="lastYear">Last Year</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#989898] pointer-events-none"
              />
            </div>
          </div>

          {/* File Type */}
          <div className="w-full lg:w-48">
            <label className="block text-xs sm:text-sm font-semibold text-[#242424] mb-2">
              File Type
            </label>
            <div className="relative">
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="w-full h-11 appearance-none rounded-lg border border-[#D3D3D3] bg-white pl-3 pr-10 text-sm text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#083F3C] cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="PDF">PDF</option>
                <option value="CSV">CSV</option>
                <option value="ZIP">ZIP</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#989898] pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-xl border border-[#D3D3D3] p-5 sm:p-6 flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <FileText size={24} className="text-[#989898]" />
              <span className="text-xs font-semibold text-[#989898] bg-[#EAEAEA] px-2 py-0.5 rounded">
                {report.type}
              </span>
            </div>
            <h3 className="font-display text-base font-semibold text-[#242424] mb-1">
              {report.title}
            </h3>
            <p className="text-sm text-[#505050] mb-1">{report.site}</p>
            <p className="text-xs text-[#989898] mb-5">
              Survey Date: {report.date}
            </p>
            <div className="mt-auto flex gap-2">
              <Button className="flex-1 h-9 bg-[#083F3C] hover:bg-[#083F3C]/90 text-white rounded-lg text-xs sm:text-sm font-semibold">
                <Eye size={14} className="mr-1.5" />
                View
              </Button>
              <Button
                variant="outline"
                className="h-9 w-9 px-0 border-[#D3D3D3] text-[#505050] hover:bg-[#EAEAEA] rounded-lg"
                aria-label="Download"
              >
                <Download size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12 text-[#989898] text-sm">
          No reports found matching your search.
        </div>
      )}
    </SurveyProLayout>
  );
};

export default CustomerReports;