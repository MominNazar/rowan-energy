import { useMemo, useState } from "react";
import {
  ChevronDown,
  Download,
  FileText,
  Search,
  Eye,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SurveyProLayout } from "@/components/layout/SurveyProLayout";
import { showSuccess } from "@/utils/toast";

type DateCategory = "last30" | "last90" | "lastYear" | "older";
type FileType = "PDF" | "CSV" | "ZIP";

type Report = {
  id: string;
  title: string;
  site: string;
  date: string;
  type: FileType;
  dateCategory: DateCategory;
  details: string;
};

const reports: Report[] = [
  {
    id: "1",
    title: "Building Condition Report",
    site: "Downtown Office Complex",
    date: "Feb 28, 2025",
    type: "PDF",
    dateCategory: "last30",
    details: "Comprehensive building condition assessment covering structure, HVAC, and electrical systems.",
  },
  {
    id: "2",
    title: "Equipment Inventory",
    site: "Manufacturing Plant A",
    date: "Feb 15, 2025",
    type: "CSV",
    dateCategory: "last90",
    details: "Asset inventory export with equipment IDs, locations, and condition ratings.",
  },
  {
    id: "3",
    title: "Structural Assessment",
    site: "Riverside Warehouse",
    date: "Jan 30, 2025",
    type: "PDF",
    dateCategory: "last90",
    details: "Structural integrity findings for load-bearing elements and roof systems.",
  },
  {
    id: "4",
    title: "Site Photos Collection",
    site: "Tech Campus Building",
    date: "Jan 20, 2025",
    type: "ZIP",
    dateCategory: "lastYear",
    details: "RGB and thermal photo package from the site survey visit.",
  },
  {
    id: "5",
    title: "Safety Compliance Report",
    site: "Industrial Complex",
    date: "Jan 10, 2025",
    type: "PDF",
    dateCategory: "lastYear",
    details: "Safety compliance checklist results and recommended corrective actions.",
  },
  {
    id: "6",
    title: "Energy Audit Data",
    site: "Corporate Headquarters",
    date: "Dec 28, 2024",
    type: "CSV",
    dateCategory: "older",
    details: "Energy consumption readings and efficiency recommendations.",
  },
];

const dateCategoryRank: Record<DateCategory, number> = {
  last30: 1,
  last90: 2,
  lastYear: 3,
  older: 4,
};

const matchesDateRange = (category: DateCategory, range: string) => {
  if (range === "all") return true;
  const selected = dateCategoryRank[range as DateCategory];
  if (!selected) return true;
  return dateCategoryRank[category] <= selected;
};

const downloadReportFile = (report: Report) => {
  const content = [
    `Report: ${report.title}`,
    `Site: ${report.site}`,
    `Survey Date: ${report.date}`,
    `Type: ${report.type}`,
    "",
    report.details,
  ].join("\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const safeName = report.title.replace(/[^\w\-]+/g, "_");
  a.download = `${safeName}.${report.type === "CSV" ? "csv" : "txt"}`;
  a.click();
  URL.revokeObjectURL(url);
  showSuccess(`Downloaded ${report.title}`);
};

const CustomerReports = () => {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [fileType, setFileType] = useState("all");
  const [viewingReport, setViewingReport] = useState<Report | null>(null);

  const filteredReports = useMemo(() => {
    const q = search.toLowerCase().trim();
    return reports.filter((report) => {
      const matchesSearch =
        !q ||
        report.title.toLowerCase().includes(q) ||
        report.site.toLowerCase().includes(q);
      const matchesType = fileType === "all" || report.type === fileType;
      const matchesDate = matchesDateRange(report.dateCategory, dateRange);
      return matchesSearch && matchesType && matchesDate;
    });
  }, [search, dateRange, fileType]);

  return (
    <SurveyProLayout
      title="Reports"
      subtitle="Access and download your completed survey reports"
    >
      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#D3D3D3] p-3 sm:p-5 lg:p-6 mb-6 min-w-0 max-w-full">
        <div className="flex flex-col lg:flex-row lg:items-center flex-wrap gap-4 min-w-0 max-w-full">
          {/* Search */}
          <div className="flex-1 min-w-0 max-w-full">
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
              <Button
                className="flex-1 h-9 bg-[#083F3C] hover:bg-[#083F3C]/90 text-white rounded-lg text-xs sm:text-sm font-semibold"
                onClick={() => {
                  setViewingReport(report);
                  showSuccess(`Viewing ${report.title}`);
                }}
              >
                <Eye size={14} className="mr-1.5" />
                View
              </Button>
              <Button
                variant="outline"
                className="h-9 w-9 px-0 border-[#D3D3D3] text-[#505050] hover:bg-[#EAEAEA] rounded-lg"
                aria-label="Download"
                onClick={() => downloadReportFile(report)}
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

      {viewingReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setViewingReport(null)}
          role="presentation"
        >
          <div
            className="bg-white rounded-xl border border-[#D3D3D3] w-full max-w-md p-5 sm:p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-modal-title"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-xs font-semibold text-[#989898] uppercase tracking-wide mb-1">
                  {viewingReport.type}
                </p>
                <h3
                  id="report-modal-title"
                  className="font-display text-lg font-semibold text-[#242424]"
                >
                  {viewingReport.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingReport(null)}
                className="p-1.5 rounded-md text-[#505050] hover:bg-[#EAEAEA]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-[#505050] mb-1">{viewingReport.site}</p>
            <p className="text-xs text-[#989898] mb-4">
              Survey Date: {viewingReport.date}
            </p>
            <p className="text-sm text-[#505050] leading-relaxed mb-5">
              {viewingReport.details}
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                className="h-9 border-[#D3D3D3] rounded-lg text-sm"
                onClick={() => setViewingReport(null)}
              >
                Close
              </Button>
              <Button
                className="h-9 bg-[#083F3C] hover:bg-[#083F3C]/90 text-white rounded-lg text-sm"
                onClick={() => downloadReportFile(viewingReport)}
              >
                <Download size={14} className="mr-1.5" />
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </SurveyProLayout>
  );
};

export default CustomerReports;
