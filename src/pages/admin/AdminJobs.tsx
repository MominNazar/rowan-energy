import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Calendar,
  Check,
  Eye,
  FileText,
  Filter,
  Grid2X2,
  List,
  MapPin,
  RefreshCw,
  User,
  X,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { jobs as initialJobs, type JobDetail } from "@/data/adminJobs";
import { showError, showSuccess } from "@/utils/toast";

const engineerMap: Record<string, { name: string; initials: string }> = {
  alex: { name: "Alex Khan", initials: "AK" },
  fatima: { name: "Fatima Ahmed", initials: "FA" },
  owen: { name: "Owen Williams", initials: "OW" },
  sarah: { name: "Sarah Mitchell", initials: "SM" },
};

const normalizeStatus = (status: string) =>
  status.toLowerCase().replace(/\s+/g, "");

const AdminJobs = () => {
  const [jobs, setJobs] = useState<JobDetail[]>(() => structuredClone(initialJobs));
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("week");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [uploadFilter, setUploadFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [newEngineer, setNewEngineer] = useState("");
  const [note, setNote] = useState("");
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});

  const selectedJobData = selectedJob ? jobs.find((j) => j.id === selectedJob) : null;

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const hay = `${j.id} ${j.site} ${j.region} ${j.engineer} ${j.status}`.toLowerCase();
      if (query && !hay.includes(query.toLowerCase())) return false;

      if (statusFilter !== "all" && normalizeStatus(j.status) !== statusFilter) return false;

      if (regionFilter !== "all") {
        const regionKey = regionFilter === "north" ? "north" : regionFilter === "west" ? "west" : regionFilter;
        if (!j.region.toLowerCase().includes(regionKey)) return false;
      }

      if (periodFilter === "week") {
        // Demo: all current jobs are in-week (Jul dates); keep all
      }

      if (uploadFilter !== "all" && j.upload.toLowerCase() !== uploadFilter) return false;

      return true;
    });
  }, [jobs, query, statusFilter, regionFilter, periodFilter, uploadFilter]);

  const confirmEngineerChange = () => {
    if (!newEngineer || !selectedJob) {
      showError("Please select a new engineer");
      return;
    }
    const eng = engineerMap[newEngineer];
    if (!eng) {
      showError("Please select a new engineer");
      return;
    }
    setJobs((prev) =>
      prev.map((j) =>
        j.id === selectedJob
          ? { ...j, engineer: eng.name, engineerInitials: eng.initials }
          : j
      )
    );
    showSuccess(`Engineer updated to ${eng.name}${note ? ` — ${note}` : ""}`);
    setSelectedJob(null);
    setNewEngineer("");
    setNote("");
  };

  const secondaryActionToast = (job: JobDetail) => {
    if (job.status === "Completed") showSuccess(`Opening report for ${job.id}`);
    else if (job.status === "Revisit Needed") showSuccess(`Revisit scheduled for ${job.id}`);
    else if (job.status === "Scheduled") showSuccess(`Calendar opened for ${job.id}`);
    else showSuccess(`Map opened for ${job.id}`);
  };

  const statusDisplay = (job: JobDetail) =>
    job.status === "Revisit Needed" ? (
      <span className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FEE2E2] px-3 py-1.5 text-xs font-semibold text-[#DC2626]">
        <AlertTriangle size={14} className="shrink-0" />
        Revisit Needed
      </span>
    ) : (
      <Badge
        className={`text-[10px] w-fit ${
          job.status === "Completed"
            ? "bg-[#E8F6F3] text-[#0A3D3A]"
            : job.status === "In Progress"
              ? "bg-[#FEF3C7] text-[#92400E]"
              : "bg-[#E8F6F3] text-[#0A3D3A]"
        }`}
      >
        {job.status}
      </Badge>
    );

  const rowActions = (job: JobDetail) => (
    <div className="flex items-center gap-1">
      <Link to={`/admin/jobs/${job.id.replace("#", "")}`} className="p-1.5 text-[#505050] hover:text-[#0A3D3A]">
        <Eye size={14} />
      </Link>
      <button
        type="button"
        className="p-1.5 text-[#505050] hover:text-[#0A3D3A]"
        onClick={() => secondaryActionToast(job)}
        aria-label="Secondary action"
      >
        {job.status === "Completed" ? (
          <FileText size={14} />
        ) : job.status === "Revisit Needed" ? (
          <RefreshCw size={14} />
        ) : job.status === "Scheduled" ? (
          <Calendar size={14} />
        ) : (
          <MapPin size={14} />
        )}
      </button>
      <button
        type="button"
        className="p-1.5 text-[#505050] hover:text-[#0A3D3A]"
        onClick={() => {
          setSelectedJob(job.id);
          setNewEngineer("");
          setNote("");
        }}
        aria-label="Change Engineer"
      >
        <User size={14} />
      </button>
    </div>
  );

  return (
    <AdminLayout title="All Survey Jobs" subtitle="Manage and track all survey jobs across regions">
      <div className="space-y-5">
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-3 sm:p-5 min-w-0 max-w-full">
          <div className="flex flex-col lg:flex-row lg:items-center flex-wrap gap-3 min-w-0 max-w-full">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Job ID, site name"
              className="h-10 flex-1 min-w-0 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-10 w-full lg:w-44 min-w-0">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="revisitneeded">Revisit Needed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="h-10 w-full lg:w-44 min-w-0">
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">North England</SelectItem>
                <SelectItem value="west">West Midlands</SelectItem>
              </SelectContent>
            </Select>
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="h-10 w-full lg:w-40 min-w-0">
                <SelectValue placeholder="This Week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
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
              <Select value={uploadFilter} onValueChange={setUploadFilter}>
                <SelectTrigger className="h-10 w-full sm:w-44">
                  <SelectValue placeholder="Upload Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Uploads</SelectItem>
                  <SelectItem value="uploaded">Uploaded</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="missing">Missing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden">
          <div className="p-4 border-b border-[#E0E0E0] flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold text-[#242424]">
              All Jobs <span className="text-[#989898] font-normal">({filtered.length})</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={`p-2 ${viewMode === "list" ? "text-[#0A3D3A]" : "text-[#505050] hover:text-[#242424]"}`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <List size={16} />
              </button>
              <button
                type="button"
                className={`p-2 ${viewMode === "grid" ? "text-[#0A3D3A]" : "text-[#505050] hover:text-[#242424]"}`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <Grid2X2 size={16} />
              </button>
            </div>
          </div>

          {viewMode === "list" ? (
            <div className="overflow-x-auto">
              <div className="min-w-[960px]">
                <div className="grid grid-cols-[56px_0.7fr_1.2fr_1fr_1fr_1.2fr_0.8fr_0.7fr_0.9fr] items-center gap-3 px-4 py-3 border-b border-[#E0E0E0] text-[10px] font-medium text-[#989898]">
                  <span></span>
                  <span>JOB ID</span>
                  <span>SITE NAME</span>
                  <span>REGION</span>
                  <span>ENGINEER</span>
                  <span>TIME SLOT</span>
                  <span>STATUS</span>
                  <span>UPLOAD</span>
                  <span>ACTIONS</span>
                </div>
                <div className="divide-y divide-[#E0E0E0]">
                  {filtered.map((job) => (
                    <div
                      key={job.id}
                      className="grid grid-cols-[56px_0.7fr_1.2fr_1fr_1fr_1.2fr_0.8fr_0.7fr_0.9fr] items-center gap-3 px-4 py-3 text-sm"
                    >
                      <label className="flex justify-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-[#0A3D3A] cursor-pointer"
                          checked={!!selectedIds[job.id]}
                          onChange={() =>
                            setSelectedIds((prev) => ({ ...prev, [job.id]: !prev[job.id] }))
                          }
                        />
                      </label>
                      <span className="font-medium text-[#242424]">{job.id}</span>
                      <div className="min-w-0">
                        <p className="font-medium text-[#242424] truncate">{job.site}</p>
                        <p className="text-xs text-[#989898]">{job.region}</p>
                      </div>
                      <span className="text-[#505050] text-xs">{job.region}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#D1FAE5] text-[#0A3D3A] text-[10px] font-semibold flex items-center justify-center">
                          {job.engineerInitials ||
                            job.engineer
                              .split(" ")
                              .map((p) => p[0])
                              .join("")
                              .slice(0, 2)}
                        </div>
                        <span className="text-[#505050] text-xs">{job.engineer}</span>
                      </div>
                      <span className="text-[#505050] text-xs">{job.time}</span>
                      {statusDisplay(job)}
                      <span
                        className={`text-xs font-medium ${
                          job.upload === "Uploaded"
                            ? "text-[#0A3D3A]"
                            : job.upload === "Missing"
                              ? "text-[#EF4444]"
                              : "text-[#505050]"
                        }`}
                      >
                        {job.upload}
                      </span>
                      {rowActions(job)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((job) => (
                <div key={job.id} className="border border-[#E0E0E0] rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-[#242424] text-sm">{job.id}</p>
                      <p className="text-sm text-[#242424] mt-0.5">{job.site}</p>
                      <p className="text-xs text-[#989898] mt-1">{job.region}</p>
                    </div>
                    {statusDisplay(job)}
                  </div>
                  <div className="text-xs text-[#505050] space-y-1">
                    <p>Engineer: {job.engineer}</p>
                    <p>{job.time}</p>
                    <p>Upload: {job.upload}</p>
                  </div>
                  {rowActions(job)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedJobData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl border border-[#E0E0E0] w-full max-w-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#E0E0E0]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#E8F6F3] flex items-center justify-center">
                  <User size={14} className="text-[#0A3D3A]" />
                </div>
                <h3 className="font-display text-sm font-semibold text-[#242424]">
                  Change Engineer for Job {selectedJobData.id}
                </h3>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-[#989898] hover:text-[#242424] p-1">
                <X size={16} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-[#F5F5F5] rounded-lg p-3 space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-[#989898] shrink-0" />
                  <span className="text-[#505050]">Site:</span>
                  <span className="font-medium text-[#242424]">{selectedJobData.site}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={12} className="text-[#989898] shrink-0" />
                  <span className="text-[#505050]">Scheduled:</span>
                  <span className="font-medium text-[#242424]">{selectedJobData.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-[#989898] shrink-0" />
                  <span className="text-[#505050]">Region:</span>
                  <span className="font-medium text-[#242424]">{selectedJobData.region}</span>
                </div>
              </div>
              <div>
                <Label className="text-xs font-medium text-[#242424]">Select New Engineer</Label>
                <Select value={newEngineer} onValueChange={setNewEngineer}>
                  <SelectTrigger className="h-10 mt-1">
                    <SelectValue placeholder="Choose available engineer..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alex">Alex Khan</SelectItem>
                    <SelectItem value="fatima">Fatima Ahmed</SelectItem>
                    <SelectItem value="owen">Owen Williams</SelectItem>
                    <SelectItem value="sarah">Sarah Mitchell</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="border border-[#E0E0E0] rounded-lg p-3 space-y-2 text-xs">
                <p className="font-medium text-[#242424]">Availability Summary</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#505050]">Time Free?</span>
                  <span className="text-[#0A3D3A] font-medium flex items-center gap-1">
                    <Check size={12} /> Yes
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#505050]">Other jobs that day:</span>
                  <span className="font-medium text-[#242424]">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#505050]">Regions matched:</span>
                  <span className="text-[#0A3D3A] font-medium flex items-center gap-1">
                    <Check size={12} /> Yes
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <FileText size={12} className="text-[#989898]" />
                  <Label className="text-xs font-medium text-[#242424]">Optional Note (reason for reassignment)</Label>
                </div>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g., Alex unavailable - reassigning to Fatima"
                  rows={3}
                  className="border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-[#E0E0E0]">
              <Button
                variant="outline"
                onClick={() => setSelectedJob(null)}
                className="h-10 px-4 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmEngineerChange}
                className="h-10 px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold"
              >
                Confirm Change
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminJobs;
