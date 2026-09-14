import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Flag,
  Layers,
  MapPin,
  Minus,
  Navigation,
  Play,
  Plus,
  Route,
  Sparkles,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EngineerLayout } from "@/components/engineer/EngineerLayout";
import { showSuccess } from "@/utils/toast";

type RouteJob = {
  id: string;
  letter: string;
  title: string;
  shortTitle: string;
  time: string;
  region: string;
  regionKey: string;
  status: "Scheduled" | "In Progress" | "Completed";
  mapPos: string;
};

const INITIAL_JOBS: RouteJob[] = [
  {
    id: "1",
    letter: "A",
    title: "Hightower Solar Farm",
    shortTitle: "Hightower Solar",
    time: "09:00 - 10:30",
    region: "North England",
    regionKey: "north",
    status: "Scheduled",
    mapPos: "left-[18%] top-[28%] sm:left-[20%] sm:top-[30%]",
  },
  {
    id: "2",
    letter: "B",
    title: "Westfield Wind Farm",
    shortTitle: "Westfield Wind",
    time: "12:00 - 13:30",
    region: "North England",
    regionKey: "north",
    status: "Scheduled",
    mapPos: "left-[42%] top-[38%] sm:left-[45%] sm:top-[40%]",
  },
  {
    id: "3",
    letter: "C",
    title: "Greenfield Solar",
    shortTitle: "Greenfield Solar",
    time: "15:00 - 16:30",
    region: "South England",
    regionKey: "south",
    status: "Scheduled",
    mapPos: "right-[14%] top-[46%] sm:right-[18%] sm:top-[48%]",
  },
];

const formatDayLabel = (date: Date, isToday: boolean) => {
  const formatted = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return isToday ? `Today - ${formatted}` : formatted;
};

const selectTrigger =
  "h-9 w-full min-w-0 rounded-lg border-[#E0E0E0] bg-white text-sm text-[#242424] focus:ring-2 focus:ring-[#0A3D3A] focus:ring-offset-0";

const EngineerRoutePlanner = () => {
  const [dayOffset, setDayOffset] = useState(0);
  const [viewMode, setViewMode] = useState("daily");
  const [region, setRegion] = useState("all");
  const [status, setStatus] = useState("all");
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [zoom, setZoom] = useState(1);
  const [showLayers, setShowLayers] = useState(true);

  const selectedDate = useMemo(() => {
    const d = new Date(2025, 0, 22);
    d.setDate(d.getDate() + dayOffset);
    return d;
  }, [dayOffset]);

  const isToday = dayOffset === 0;

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (region !== "all" && job.regionKey !== region) return false;
      if (status !== "all" && job.status.toLowerCase().replace(" ", "-") !== status)
        return false;
      return true;
    });
  }, [jobs, region, status]);

  const distance = (filteredJobs.length * 15.7).toFixed(1);
  const driveMins = filteredJobs.length * 25;
  const driveLabel =
    driveMins >= 60
      ? `${Math.floor(driveMins / 60)}h ${driveMins % 60}m`
      : `${driveMins}m`;

  const handleOptimize = () => {
    setJobs((prev) => {
      const sorted = [...prev].sort((a, b) => a.time.localeCompare(b.time));
      return sorted.map((job, i) => ({
        ...job,
        letter: String.fromCharCode(65 + i),
      }));
    });
    showSuccess("Route optimized");
  };

  const handleExport = () => {
    const rows = [
      ["Letter", "Job", "Time", "Region", "Status"],
      ...filteredJobs.map((j) => [j.letter, j.title, j.time, j.region, j.status]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "engineer-route.csv";
    a.click();
    URL.revokeObjectURL(url);
    showSuccess("Route exported");
  };

  return (
    <EngineerLayout
      title="My Route Planner"
      subtitle="Optimize your daily travel route"
    >
      <div className="space-y-3 sm:space-y-4 min-w-0 max-w-full">
        {/* Toolbar — white card so selects aren't clipped by sticky header */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-3 sm:p-4 shadow-sm overflow-visible">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-[#E0E0E0] bg-white text-[#505050] hover:bg-[#F5F5F5] shrink-0"
                  aria-label="Previous day"
                  onClick={() => setDayOffset((o) => o - 1)}
                >
                  <ChevronLeft size={16} />
                </Button>
                <div className="h-9 px-2.5 sm:px-3 flex-1 sm:flex-none sm:min-w-[180px] min-w-0 flex items-center justify-center border border-[#E0E0E0] bg-white rounded-lg text-xs sm:text-sm font-medium text-[#242424] whitespace-nowrap truncate">
                  {formatDayLabel(selectedDate, isToday)}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-[#E0E0E0] bg-white text-[#505050] hover:bg-[#F5F5F5] shrink-0"
                  aria-label="Next day"
                  onClick={() => setDayOffset((o) => o + 1)}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className={`${selectTrigger} sm:w-[140px]`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily View</SelectItem>
                  <SelectItem value="weekly">Weekly View</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xl:flex xl:items-center xl:gap-2 min-w-0 w-full xl:w-auto">
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className={`${selectTrigger} xl:w-[150px]`}>
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">North England</SelectItem>
                  <SelectItem value="south">South England</SelectItem>
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className={`${selectTrigger} xl:w-[140px]`}>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {viewMode === "weekly" && (
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 text-sm text-[#505050]">
            Weekly overview for week of{" "}
            <span className="font-medium text-[#242424]">
              {formatDayLabel(selectedDate, false)}
            </span>
            . Switch to Daily View for map navigation.
          </div>
        )}

        {/* Map + Route List */}
        <div className="flex flex-col xl:flex-row gap-3.5 sm:gap-4 min-w-0">
          {/* Map Panel */}
          <div className="relative flex-1 min-h-[360px] sm:min-h-[420px] xl:min-h-[560px] rounded-xl overflow-hidden border border-[#E0E0E0] bg-[#E9F9DC] order-1">
            {/* Zoomable map layer — grid, route, markers, start/end scale together */}
            <div
              className="absolute inset-0 transition-transform duration-200 ease-out origin-center will-change-transform"
              style={{ transform: `scale(${zoom})` }}
            >
              <div className="absolute inset-0 opacity-70">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(10,61,58,0.08)_1px,transparent_0)] bg-[size:28px_28px]" />
              </div>

              {showLayers && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 10 75 Q 20 55 25 35 Q 35 25 50 42 Q 60 50 70 52 Q 78 60 85 72"
                    fill="none"
                    stroke="#0A3D3A"
                    strokeWidth="0.35"
                    strokeDasharray="1.2,1.2"
                    opacity="0.65"
                  />
                </svg>
              )}

              {/* Start / End */}
              <div className="absolute left-2 sm:left-3 bottom-[22%]">
                <div className="flex items-center gap-1 bg-white rounded-md px-2 py-1 shadow-sm border border-[#E0E0E0]">
                  <Play size={10} className="text-[#242424] fill-[#242424]" />
                  <span className="text-xs font-medium text-[#242424]">Start</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#242424] mt-1 ml-1" />
              </div>
              <div className="absolute right-2 sm:right-3 bottom-[22%]">
                <div className="flex items-center gap-1 bg-white rounded-md px-2 py-1 shadow-sm border border-[#E0E0E0]">
                  <Flag size={10} className="text-[#242424]" />
                  <span className="text-xs font-medium text-[#242424]">End</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#242424] mt-1 ml-1" />
              </div>

              {/* Job markers from filtered data */}
              {filteredJobs.map((job, idx) => (
                <div
                  key={job.id}
                  className={`absolute ${job.mapPos} max-w-[46vw] sm:max-w-none`}
                >
                  <div className="bg-[#0A3D3A] text-white text-xs font-medium rounded-lg px-2.5 sm:px-3 py-2 shadow-lg">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span className="truncate">{job.shortTitle}</span>
                    </div>
                    <div className="text-[10px] text-white/70 font-normal mt-0.5 pl-7">
                      {job.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Fixed UI overlays — stay put while map zooms */}
            <div className="absolute left-2 sm:left-3 top-2 sm:top-3 flex flex-wrap gap-1.5 sm:gap-2 z-10 max-w-[70%]">
              <span className="inline-flex items-center gap-1.5 bg-white rounded-full border border-[#E0E0E0] px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs text-[#505050] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#37E49E]" />
                Light Traffic
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white rounded-full border border-[#E0E0E0] px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs text-[#505050] shadow-sm">
                <Sun size={13} />
                Clear
              </span>
            </div>

            <div className="absolute right-2 sm:right-3 top-2 sm:top-3 flex flex-col gap-1.5 sm:gap-2 z-10">
              {[
                {
                  label: "Zoom in",
                  icon: Plus,
                  onClick: () => setZoom((z) => Math.min(1.4, +(z + 0.1).toFixed(1))),
                },
                {
                  label: "Zoom out",
                  icon: Minus,
                  onClick: () => setZoom((z) => Math.max(0.8, +(z - 0.1).toFixed(1))),
                },
                {
                  label: "Current location",
                  icon: Navigation,
                  onClick: () => {
                    setZoom(1);
                    showSuccess("Centered on current location (demo)");
                  },
                },
                {
                  label: "Map layers",
                  icon: Layers,
                  onClick: () => {
                    setShowLayers((v) => !v);
                    showSuccess(
                      showLayers ? "Route layer hidden" : "Route layer shown",
                    );
                  },
                },
              ].map((ctrl) => (
                <button
                  key={ctrl.label}
                  type="button"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white border border-[#E0E0E0] text-[#505050] hover:bg-[#F5F5F5] flex items-center justify-center shadow-sm"
                  aria-label={ctrl.label}
                  onClick={ctrl.onClick}
                >
                  <ctrl.icon size={16} />
                </button>
              ))}
            </div>

            {/* Route Summary — below map on mobile so it doesn't cover the route */}
            <div className="hidden xl:block absolute left-2 sm:left-3 bottom-2 sm:bottom-3 w-[min(220px,calc(100%-1rem))] bg-white rounded-xl border border-[#E0E0E0] p-3 sm:p-4 shadow-sm z-10">
              <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                <Route size={18} className="text-[#0A3D3A]" />
                <h2 className="font-display font-semibold text-sm text-[#242424]">
                  Route Summary
                </h2>
              </div>
              <div className="space-y-1 text-xs sm:text-sm text-[#505050]">
                <p>
                  Total Distance:{" "}
                  <span className="font-medium text-[#242424]">
                    {filteredJobs.length ? `${distance} miles` : "—"}
                  </span>
                </p>
                <p>
                  Drive Time:{" "}
                  <span className="font-medium text-[#242424]">
                    {filteredJobs.length ? driveLabel : "—"}
                  </span>
                </p>
                <p>
                  Total Jobs:{" "}
                  <span className="font-medium text-[#242424]">
                    {filteredJobs.length} site
                    {filteredJobs.length !== 1 ? "s" : ""}
                  </span>
                </p>
              </div>
              <Button
                className="w-full mt-3 sm:mt-4 h-10 bg-[#0A3D3A] hover:bg-[#083F3C] text-white rounded-lg text-sm font-semibold"
                onClick={() => showSuccess("Route started (demo)")}
                disabled={filteredJobs.length === 0}
              >
                <Play size={14} className="mr-2 fill-white" />
                Start Route
              </Button>
            </div>
          </div>

          {/* Mobile Route Summary — sits under the map */}
          <div className="xl:hidden bg-white rounded-xl border border-[#E0E0E0] p-4 shadow-sm order-1">
            <div className="flex items-center gap-2 mb-3">
              <Route size={18} className="text-[#0A3D3A]" />
              <h2 className="font-display font-semibold text-sm text-[#242424]">
                Route Summary
              </h2>
            </div>
            <div className="space-y-1 text-sm text-[#505050]">
              <p>
                Total Distance:{" "}
                <span className="font-medium text-[#242424]">
                  {filteredJobs.length ? `${distance} miles` : "—"}
                </span>
              </p>
              <p>
                Drive Time:{" "}
                <span className="font-medium text-[#242424]">
                  {filteredJobs.length ? driveLabel : "—"}
                </span>
              </p>
              <p>
                Total Jobs:{" "}
                <span className="font-medium text-[#242424]">
                  {filteredJobs.length} site
                  {filteredJobs.length !== 1 ? "s" : ""}
                </span>
              </p>
            </div>
            <Button
              className="w-full mt-4 h-10 bg-[#0A3D3A] hover:bg-[#083F3C] text-white rounded-lg text-sm font-semibold"
              onClick={() => showSuccess("Route started (demo)")}
              disabled={filteredJobs.length === 0}
            >
              <Play size={14} className="mr-2 fill-white" />
              Start Route
            </Button>
          </div>

          {/* Today's Route sidebar */}
          <div className="w-full xl:w-[340px] shrink-0 space-y-3 sm:space-y-4 order-2 min-w-0">
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-3.5 sm:p-5 shadow-sm">
              <div className="mb-3 sm:mb-4">
                <h2 className="font-display font-semibold text-[#242424]">
                  Today&apos;s Route
                </h2>
                <p className="text-xs text-[#989898] mt-0.5">
                  {filteredJobs.length} job
                  {filteredJobs.length !== 1 ? "s" : ""} scheduled
                </p>
              </div>

              <div className="space-y-3">
                {filteredJobs.length === 0 && (
                  <p className="text-sm text-[#989898] text-center py-6">
                    No jobs match your filters
                  </p>
                )}
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="rounded-lg border border-[#E0E0E0] p-3"
                  >
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#0A3D3A] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                        {job.letter}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="font-medium text-[#242424] text-sm leading-snug">
                            {job.title}
                          </h3>
                          <MapPin
                            size={13}
                            className="text-[#989898] shrink-0"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-1 mt-2 text-[10px] text-[#989898]">
                          <div className="min-w-0">
                            <p>Time</p>
                            <p className="text-[#242424] truncate">{job.time}</p>
                          </div>
                          <div className="min-w-0">
                            <p>Region</p>
                            <p className="text-[#242424] truncate">
                              {job.region}
                            </p>
                          </div>
                          <div className="min-w-0">
                            <p>Status</p>
                            <span className="inline-flex mt-0.5 px-1.5 py-0.5 rounded-full bg-[#DBEAFE] text-[#1D4ED8] font-medium text-[10px]">
                              {job.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col min-[360px]:flex-row gap-2 mt-3">
                      <Button
                        className="flex-1 h-9 bg-[#0A3D3A] hover:bg-[#083F3C] text-white rounded-lg text-xs font-semibold"
                        onClick={() =>
                          showSuccess(`Navigation started for ${job.title}`)
                        }
                      >
                        <Navigation size={13} className="mr-1.5" />
                        Start Nav
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 h-9 border-[#0A3D3A] text-[#0A3D3A] hover:bg-[#E8F6F3] rounded-lg text-xs font-semibold"
                        asChild
                      >
                        <Link to={`/engineer/job-details/${job.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="w-full h-11 bg-[#0A3D3A] hover:bg-[#083F3C] text-white rounded-lg text-sm font-semibold"
              onClick={handleOptimize}
            >
              <Sparkles size={15} className="mr-2" />
              Optimize Route
            </Button>
            <Button
              variant="outline"
              className="w-full h-11 border-[#0A3D3A] text-[#0A3D3A] hover:bg-[#E8F6F3] rounded-lg text-sm font-semibold"
              onClick={handleExport}
            >
              <Download size={15} className="mr-2" />
              Export Route
            </Button>
          </div>
        </div>
      </div>
    </EngineerLayout>
  );
};

export default EngineerRoutePlanner;
