import { useMemo, useState } from "react";
import {
  Briefcase,
  Eye,
  Filter,
  Grid2X2,
  List,
  Mail,
  MoreHorizontal,
  Phone,
  RefreshCw,
  Search,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";

type Lead = {
  name: string;
  email: string;
  source: string;
  region: string;
  status: string;
  jobId: string;
  followUp: string;
  date: string;
};

const initialLeads: Lead[] = [
  { name: "Sarah Daniels", email: "sarah.daniels@gmail.com", source: "Chatbot", region: "South England", status: "New", jobId: "-", followUp: "Yes", date: "Jul 23, 2025 - 10:14 AM" },
  { name: "Michael Thompson", email: "m.thompson@business.co.uk", source: "Form", region: "North England", status: "Qualified", jobId: "-", followUp: "Yes", date: "Jul 23, 2025 - 09:32 AM" },
  { name: "Emma Wilson", email: "+44 7700 900123", source: "Phone", region: "West Midlands", status: "Converted", jobId: "#1089", followUp: "No", date: "Jul 23, 2025 - 08:45 AM" },
  { name: "James Rodriguez", email: "james.j@gmail.com", source: "Chatbot", region: "East Midlands", status: "Abandoned", jobId: "-", followUp: "No", date: "Jul 22, 2025 - 16:20 PM" },
  { name: "Lisa Chen", email: "lisachen@techcorp.com", source: "Form", region: "London", status: "Qualified", jobId: "-", followUp: "Yes", date: "Jul 22, 2025 - 14:15 PM" },
];

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<"all" | "chatbot" | "form" | "phone">("all");
  const [period, setPeriod] = useState<"week" | "month" | "all">("week");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "New" | "Qualified" | "Converted" | "Abandoned">("all");
  const [highlightNew, setHighlightNew] = useState(false);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const haystack = `${lead.name} ${lead.email} ${lead.source} ${lead.region} ${lead.status}`.toLowerCase();
      if (query && !haystack.includes(query.toLowerCase())) return false;

      if (source !== "all" && lead.source.toLowerCase() !== source) return false;

      if (period === "week") {
        const inWeek = lead.date.includes("Jul 22") || lead.date.includes("Jul 23");
        if (!inWeek) return false;
      }

      if (statusFilter !== "all" && lead.status !== statusFilter) return false;

      return true;
    });
  }, [leads, query, source, period, statusFilter]);

  const toggleSelected = (name: string) => {
    setSelectedIds((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const exportCsv = () => {
    const headers = ["Name", "Email", "Source", "Region", "Status", "Job ID", "Follow-up", "Date Received"];
    const rows = filteredLeads.map((l) =>
      [l.name, l.email, l.source, l.region, l.status, l.jobId, l.followUp, l.date]
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads-export.csv";
    a.click();
    URL.revokeObjectURL(url);
    showSuccess(`Exported ${filteredLeads.length} leads to CSV`);
  };

  const handlePrimaryAction = (lead: Lead) => {
    if (lead.status === "Converted") {
      showSuccess(`Opening job ${lead.jobId} for ${lead.name}`);
      return;
    }
    if (lead.status === "Abandoned") {
      setLeads((prev) =>
        prev.map((l) => (l.name === lead.name ? { ...l, status: "New" } : l))
      );
      showSuccess(`Recovered ${lead.name} — status set to New`);
      return;
    }
    showSuccess(`Calling ${lead.name}...`);
  };

  const renderActions = (lead: Lead) => (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className="p-1.5 text-[#505050] hover:text-[#0A3D3A] transition-colors"
        aria-label="View"
        onClick={() => showSuccess(`Viewing ${lead.name}`)}
      >
        <Eye size={14} />
      </button>
      <button
        type="button"
        className="p-1.5 text-[#505050] hover:text-[#0A3D3A] transition-colors"
        aria-label={lead.status === "Converted" ? "View Job" : lead.status === "Abandoned" ? "Recover" : "Call"}
        onClick={() => handlePrimaryAction(lead)}
      >
        {lead.status === "Converted" ? (
          <Briefcase size={14} />
        ) : lead.status === "Abandoned" ? (
          <RefreshCw size={14} />
        ) : (
          <Phone size={14} />
        )}
      </button>
      <button
        type="button"
        className="p-1.5 text-[#505050] hover:text-[#0A3D3A] transition-colors"
        aria-label="More"
        onClick={() => showSuccess(`More actions for ${lead.name}`)}
      >
        <MoreHorizontal size={14} />
      </button>
    </div>
  );

  const statusBadge = (status: string) => (
    <Badge
      className={`text-[10px] w-fit ${
        status === "New"
          ? "bg-[#E8F6F3] text-[#0A3D3A]"
          : status === "Qualified"
            ? "bg-[#E8F6F3] text-[#0A3D3A]"
            : status === "Converted"
              ? "bg-[#0A3D3A] text-white"
              : "bg-[#F3F4F6] text-[#505050]"
      }`}
    >
      {status}
    </Badge>
  );

  return (
    <AdminLayout title="Leads Management" subtitle="Track and manage all incoming leads">
      <div className="space-y-5">
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-3 sm:p-5 min-w-0 max-w-full">
          <div className="flex flex-col lg:flex-row lg:items-center flex-wrap gap-3 min-w-0 max-w-full">
            <div className="relative flex-1 min-w-0 max-w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#989898]" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, email, phone, or site..."
                className="h-10 pl-9 pr-3 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A] w-full min-w-0"
              />
            </div>
            <Select value={source} onValueChange={(v) => setSource(v as typeof source)}>
              <SelectTrigger className="h-10 w-full flex-1 lg:w-44 min-w-0">
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="chatbot">Chatbot</SelectItem>
                <SelectItem value="form">Form</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>
            <Select value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
              <SelectTrigger className="h-10 w-full flex-1 lg:w-40 min-w-0">
                <SelectValue placeholder="This Week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="h-10 px-3 gap-2 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold"
              onClick={() => setShowMoreFilters((v) => !v)}
            >
              <Filter size={14} /> More Filters
            </Button>
          </div>

          {showMoreFilters && (
            <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-3 mt-3 pt-3 border-t border-[#E0E0E0] min-w-0 max-w-full">
              <Select
                value={statusFilter}
                onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}
              >
                <SelectTrigger className="h-10 w-full sm:w-44">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Converted">Converted</SelectItem>
                  <SelectItem value="Abandoned">Abandoned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex flex-col items-center gap-2 mt-4 sm:flex-row sm:items-start sm:gap-2 sm:justify-start">
            <Button
              className="h-9 w-full sm:w-auto px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-xs font-semibold"
              onClick={() => {
                const count = filteredLeads.filter((l) => l.status === "New").length;
                setHighlightNew(true);
                showSuccess(`Calling ${count} new lead${count === 1 ? "" : "s"}`);
                setTimeout(() => setHighlightNew(false), 2000);
              }}
            >
              <Phone size={13} className="mr-1.5" />
              Call All New Leads
            </Button>
            <Button
              variant="outline"
              className="h-9 w-full sm:w-auto px-4 border-[#0A3D3A] text-[#0A3D3A] hover:bg-[#E8F6F3] rounded-lg text-xs font-semibold"
              onClick={() => {
                const count = filteredLeads.filter((l) => l.status === "Qualified").length;
                showSuccess(`Calling ${count} qualified lead${count === 1 ? "" : "s"}`);
              }}
            >
              <Phone size={13} className="mr-1.5" />
              Call All Qualified Leads
            </Button>
            <Button
              variant="outline"
              className="h-9 w-full sm:w-auto px-4 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-xs font-semibold"
              onClick={exportCsv}
            >
              <Mail size={14} className="mr-1.5" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden">
          <div className="p-4 border-b border-[#E0E0E0] flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold text-[#242424]">
              All Leads <span className="text-[#989898] font-normal">({filteredLeads.length})</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={`p-2 transition-colors ${viewMode === "list" ? "text-[#0A3D3A]" : "text-[#505050] hover:text-[#242424]"}`}
                aria-label="Table view"
                onClick={() => setViewMode("list")}
              >
                <List size={16} />
              </button>
              <button
                type="button"
                className={`p-2 transition-colors ${viewMode === "grid" ? "text-[#0A3D3A]" : "text-[#505050] hover:text-[#242424]"}`}
                aria-label="Card view"
                onClick={() => setViewMode("grid")}
              >
                <Grid2X2 size={16} />
              </button>
            </div>
          </div>

          {viewMode === "list" ? (
            <div className="overflow-x-auto">
              <div className="min-w-[880px]">
                <div className="grid grid-cols-[56px_1.7fr_0.8fr_1fr_0.9fr_0.7fr_1.2fr_0.7fr_0.9fr] items-center gap-3 px-4 py-3 border-b border-[#E0E0E0] text-[10px] font-medium text-[#989898]">
                  <span></span>
                  <span>NAME</span>
                  <span>SOURCE</span>
                  <span>REGION</span>
                  <span>STATUS</span>
                  <span>JOB ID</span>
                  <span>FOLLOW-UP</span>
                  <span>DATE RECEIVED</span>
                  <span>ACTIONS</span>
                </div>
                <div className="divide-y divide-[#E0E0E0]">
                  {filteredLeads.map((lead) => (
                    <div
                      key={lead.name}
                      className={`grid grid-cols-[56px_1.7fr_0.8fr_1fr_0.9fr_0.7fr_1.2fr_0.7fr_0.9fr] items-center gap-3 px-4 py-3 text-sm ${
                        highlightNew && lead.status === "New" ? "bg-[#E8F6F3]/60" : ""
                      }`}
                    >
                      <label className="flex justify-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-[#0A3D3A] cursor-pointer"
                          checked={!!selectedIds[lead.name]}
                          onChange={() => toggleSelected(lead.name)}
                        />
                      </label>
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[#D1FAE5] text-[#0A3D3A] text-xs font-semibold flex items-center justify-center shrink-0">
                          {lead.name
                            .split(" ")
                            .map((p) => p[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-[#242424] truncate">{lead.name}</p>
                          <p className="text-xs text-[#989898] truncate">{lead.email}</p>
                        </div>
                      </div>
                      <span className="text-[#505050] text-xs">{lead.source}</span>
                      <span className="text-[#505050] text-xs">{lead.region}</span>
                      {statusBadge(lead.status)}
                      <span className="text-[#505050] text-xs">{lead.jobId}</span>
                      <span
                        className={`text-xs ${lead.followUp === "Yes" ? "text-[#0A3D3A] font-medium" : "text-[#989898]"}`}
                      >
                        {lead.followUp}
                      </span>
                      <span className="text-[#505050] text-xs">{lead.date}</span>
                      {renderActions(lead)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.name}
                  className={`border border-[#E0E0E0] rounded-lg p-4 space-y-3 ${
                    highlightNew && lead.status === "New" ? "bg-[#E8F6F3]/60 border-[#0A3D3A]" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#0A3D3A] cursor-pointer shrink-0"
                        checked={!!selectedIds[lead.name]}
                        onChange={() => toggleSelected(lead.name)}
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-[#242424] text-sm truncate">{lead.name}</p>
                        <p className="text-xs text-[#989898] truncate">{lead.email}</p>
                      </div>
                    </div>
                    {statusBadge(lead.status)}
                  </div>
                  <div className="text-xs text-[#505050] space-y-1">
                    <p>Source: {lead.source}</p>
                    <p>Region: {lead.region}</p>
                    <p>{lead.date}</p>
                  </div>
                  {renderActions(lead)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLeads;
