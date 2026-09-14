import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Paperclip,
  Search,
  XCircle,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";

type UploadStatus = "Uploaded" | "Partial" | "Missing";
type AssetType = "solar" | "wind";

type ReportRow = {
  id: string;
  site: string;
  region: string;
  engineer: string;
  initials: string;
  avatarClass: string;
  upload: UploadStatus;
  reportAttached: boolean;
  date: string;
  assetType: AssetType;
  weekOf: "current" | "older";
};

const INITIAL_REPORTS: ReportRow[] = [
  {
    id: "1051",
    site: "Greenfield Solar Farm",
    region: "North England",
    engineer: "Fatima Ali",
    initials: "FA",
    avatarClass: "bg-[#D1FAE5] text-[#0A3D3A]",
    upload: "Uploaded",
    reportAttached: true,
    date: "Jul 25, 2025",
    assetType: "solar",
    weekOf: "current",
  },
  {
    id: "1052",
    site: "Nova Wind Farm",
    region: "South England",
    engineer: "Alex Khan",
    initials: "AK",
    avatarClass: "bg-[#DBEAFE] text-[#1D4ED8]",
    upload: "Partial",
    reportAttached: false,
    date: "Jul 24, 2025",
    assetType: "wind",
    weekOf: "current",
  },
  {
    id: "1053",
    site: "SolarGrid Central",
    region: "Wales",
    engineer: "Owen Williams",
    initials: "OW",
    avatarClass: "bg-[#EDE9FE] text-[#6D28D9]",
    upload: "Missing",
    reportAttached: false,
    date: "Jul 23, 2025",
    assetType: "solar",
    weekOf: "current",
  },
  {
    id: "1054",
    site: "BlueGrid Energy",
    region: "East Midlands",
    engineer: "Sarah Mitchell",
    initials: "SM",
    avatarClass: "bg-[#FEF3C7] text-[#92400E]",
    upload: "Uploaded",
    reportAttached: false,
    date: "Jul 22, 2025",
    assetType: "solar",
    weekOf: "current",
  },
];

const selectTrigger =
  "h-10 w-full min-w-0 border-[#D3D3D3] rounded-lg text-sm focus:ring-[#0A3D3A] focus:ring-offset-0 bg-white";
const actionBtn =
  "h-8 px-2.5 sm:px-3 border border-[#D3D3D3] bg-white text-[#242424] hover:bg-[#F5F5F5] rounded-md text-xs font-medium shrink-0 whitespace-nowrap";

const UploadStatusCell = ({ status }: { status: UploadStatus }) => {
  if (status === "Uploaded") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-[#059669]">
        <CheckCircle2 size={15} className="shrink-0" />
        Uploaded
      </span>
    );
  }
  if (status === "Partial") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-[#D97706]">
        <AlertTriangle size={15} className="shrink-0" />
        Partial
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-[#DC2626]">
      <XCircle size={15} className="shrink-0" />
      Missing
    </span>
  );
};

type ReportActionsProps = {
  row: ReportRow;
  onView: (row: ReportRow) => void;
  onSecondary: (row: ReportRow) => void;
  onReject: (row: ReportRow) => void;
};

const ReportActions = ({
  row,
  onView,
  onSecondary,
  onReject,
}: ReportActionsProps) => {
  const secondary =
    row.upload === "Uploaded" && row.reportAttached
      ? "Approve"
      : row.upload === "Partial"
        ? "Re-upload"
        : row.upload === "Missing"
          ? "Request Upload"
          : "Add Report";

  return (
    <div className="flex flex-nowrap items-center gap-1.5">
      <Button
        variant="outline"
        className={actionBtn}
        onClick={() => onView(row)}
      >
        View
      </Button>
      <Button
        variant="outline"
        className={actionBtn}
        onClick={() => onSecondary(row)}
      >
        {secondary}
      </Button>
      <Button
        variant="outline"
        className={actionBtn}
        onClick={() => onReject(row)}
      >
        Reject
      </Button>
    </div>
  );
};

const AdminReports = () => {
  const [reports, setReports] = useState<ReportRow[]>(INITIAL_REPORTS);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [engineer, setEngineer] = useState("all");
  const [period, setPeriod] = useState("week");
  const [region, setRegion] = useState("all");
  const [assetType, setAssetType] = useState("all");

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      const hay = `${r.id} ${r.site} ${r.region} ${r.engineer}`.toLowerCase();
      if (query && !hay.includes(query.toLowerCase())) return false;
      if (status !== "all" && r.upload.toLowerCase() !== status) return false;
      if (engineer !== "all") {
        const key = r.engineer.toLowerCase().split(" ")[0];
        if (key !== engineer) return false;
      }
      if (region !== "all") {
        if (!r.region.toLowerCase().includes(region)) return false;
      }
      if (period === "week" && r.weekOf !== "current") return false;
      if (assetType !== "all" && r.assetType !== assetType) return false;
      return true;
    });
  }, [reports, query, status, engineer, region, period, assetType]);

  const handleView = (row: ReportRow) => {
    showSuccess(`Viewing report for job ${row.id}`);
  };

  const handleSecondary = (row: ReportRow) => {
    if (row.upload === "Uploaded" && row.reportAttached) {
      setReports((prev) =>
        prev.map((r) =>
          r.id === row.id
            ? { ...r, upload: "Uploaded", reportAttached: true }
            : r,
        ),
      );
      showSuccess(`Job ${row.id} approved`);
      return;
    }
    if (row.upload === "Partial") {
      showSuccess(`Re-upload requested for job ${row.id}`);
      return;
    }
    if (row.upload === "Missing") {
      showSuccess(`Upload requested for job ${row.id}`);
      return;
    }
    setReports((prev) =>
      prev.map((r) =>
        r.id === row.id ? { ...r, reportAttached: true } : r,
      ),
    );
    showSuccess(`Report added for job ${row.id}`);
  };

  const handleReject = (row: ReportRow) => {
    setReports((prev) => prev.filter((r) => r.id !== row.id));
    showSuccess(`Job ${row.id} rejected and removed`);
  };

  return (
    <AdminLayout
      title="Survey Reports Management"
      subtitle="View, verify, and manage engineer survey uploads"
      header={
        <div className="flex items-start gap-2.5 min-w-0">
          <div className="mt-0.5 hidden min-[380px]:flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F5F3] text-[#0A3D3A]">
            <ClipboardCheck size={18} />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-lg sm:text-[20px] font-semibold text-[#242424] leading-tight">
              Survey Reports Management
            </h1>
            <p className="text-[11px] sm:text-xs text-[#989898] mt-0.5 leading-relaxed">
              View, verify, and manage engineer survey uploads
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-3.5 sm:space-y-5 min-w-0 max-w-full">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-3 sm:p-4 shadow-sm min-w-0 max-w-full">
          <div className="flex flex-col xl:flex-row xl:items-center flex-wrap gap-2.5 sm:gap-3 min-w-0 max-w-full">
            <div className="relative flex-1 min-w-0 max-w-full">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#989898] pointer-events-none"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by Job ID, Site N..."
                className="h-10 pl-9 pr-3 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0"
              />
            </div>
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 xl:contents gap-2.5 sm:gap-3">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className={`${selectTrigger} xl:w-[140px]`}>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="uploaded">Uploaded</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="missing">Missing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={engineer} onValueChange={setEngineer}>
                <SelectTrigger className={`${selectTrigger} xl:w-[150px]`}>
                  <SelectValue placeholder="All Engineers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Engineers</SelectItem>
                  <SelectItem value="fatima">Fatima Ali</SelectItem>
                  <SelectItem value="alex">Alex Khan</SelectItem>
                  <SelectItem value="owen">Owen Williams</SelectItem>
                  <SelectItem value="sarah">Sarah Mitchell</SelectItem>
                </SelectContent>
              </Select>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className={`${selectTrigger} xl:w-[130px]`}>
                  <SelectValue placeholder="This Week" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className={`${selectTrigger} xl:w-[140px]`}>
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">North England</SelectItem>
                  <SelectItem value="south">South England</SelectItem>
                  <SelectItem value="wales">Wales</SelectItem>
                  <SelectItem value="east">East Midlands</SelectItem>
                </SelectContent>
              </Select>
              <Select value={assetType} onValueChange={setAssetType}>
                <SelectTrigger className={`${selectTrigger} xl:w-[150px]`}>
                  <SelectValue placeholder="All Asset Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Asset Types</SelectItem>
                  <SelectItem value="solar">Solar</SelectItem>
                  <SelectItem value="wind">Wind</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {filtered.map((row) => (
            <article
              key={row.id}
              className="bg-white rounded-xl border border-[#E0E0E0] p-3.5 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-[#989898]">
                    Job ID
                  </p>
                  <p className="font-semibold text-[#242424]">{row.id}</p>
                </div>
                <UploadStatusCell status={row.upload} />
              </div>

              <div>
                <p className="font-semibold text-sm text-[#242424] leading-snug">
                  {row.site}
                </p>
                <p className="text-xs text-[#989898] mt-0.5">{row.region}</p>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full text-xs font-semibold flex items-center justify-center shrink-0 ${row.avatarClass}`}
                >
                  {row.initials}
                </div>
                <span className="text-sm text-[#242424]">{row.engineer}</span>
              </div>

              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="text-[#505050]">
                  {row.reportAttached ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Paperclip size={14} />
                      Attached
                    </span>
                  ) : (
                    <span className="text-[#989898]">—</span>
                  )}
                </div>
                <span className="text-xs text-[#989898]">{row.date}</span>
              </div>

              <ReportActions
                row={row}
                onView={handleView}
                onSecondary={handleSecondary}
                onReject={handleReject}
              />
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-8 text-center text-sm text-[#989898]">
              No reports found
            </div>
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block bg-white rounded-xl border border-[#E0E0E0] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1020px] text-left">
              <thead>
                <tr className="border-b border-[#E0E0E0]">
                  {[
                    "JOB ID",
                    "SITE NAME",
                    "ENGINEER",
                    "UPLOAD STATUS",
                    "FINAL REPORT",
                    "DATE",
                    "ACTIONS",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wide text-[#989898] whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E0E0]">
                {filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-[#FAFAFA]/60">
                    <td className="px-4 py-3.5 font-semibold text-sm text-[#242424] whitespace-nowrap">
                      {row.id}
                    </td>
                    <td className="px-4 py-3.5 min-w-[160px]">
                      <p className="font-semibold text-sm text-[#242424]">
                        {row.site}
                      </p>
                      <p className="text-xs text-[#989898] mt-0.5">
                        {row.region}
                      </p>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-full text-[11px] font-semibold flex items-center justify-center shrink-0 ${row.avatarClass}`}
                        >
                          {row.initials}
                        </div>
                        <span className="text-sm text-[#242424] whitespace-nowrap">
                          {row.engineer}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <UploadStatusCell status={row.upload} />
                    </td>
                    <td className="px-4 py-3.5 text-sm text-[#505050] whitespace-nowrap">
                      {row.reportAttached ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Paperclip size={14} className="text-[#989898]" />
                          Attached
                        </span>
                      ) : (
                        <span className="text-[#989898]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-[#505050] whitespace-nowrap">
                      {row.date}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <ReportActions
                        row={row}
                        onView={handleView}
                        onSecondary={handleSecondary}
                        onReject={handleReject}
                      />
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-10 text-center text-sm text-[#989898]"
                    >
                      No reports found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
