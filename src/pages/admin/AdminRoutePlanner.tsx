import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  CalendarDays,
  Download,
  GripVertical,
  Map,
  MapPin,
  Sparkles,
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
import { showSuccess, showError } from "@/utils/toast";

type RegionKey = "north" | "south" | "west" | "wales";

type RouteStop = {
  code: string;
  time: string;
  job: string;
  site: string;
  region: string;
  regionKey: RegionKey;
  warning: string | null;
  badgeClass: string;
};

const engineers = [
  { id: "alex", name: "Alex Khan", region: "North England", initials: "AK" },
  { id: "fatima", name: "Fatima Ali", region: "South England", initials: "FA" },
  { id: "owen", name: "Owen Williams", region: "Wales", initials: "OW" },
  { id: "sarah", name: "Sarah Mitchell", region: "East Midlands", initials: "SM" },
];

const initialStops: RouteStop[] = [
  {
    code: "A",
    time: "09:00 - 10:30",
    job: "#1052",
    site: "Greenfield Solar Farm",
    region: "Reading, North England",
    regionKey: "north",
    warning: null,
    badgeClass: "bg-[#37E49E] text-[#0A3D3A]",
  },
  {
    code: "B",
    time: "11:30 - 13:00",
    job: "#1050",
    site: "SolarMax Distribution",
    region: "Bath, South England",
    regionKey: "south",
    warning: null,
    badgeClass: "bg-[#9CA3AF] text-white",
  },
  {
    code: "C",
    time: "14:00 - 15:30",
    job: "#1054",
    site: "EnergyTech Hub",
    region: "Swindon, West England",
    regionKey: "west",
    warning: "95km from previous stop",
    badgeClass: "bg-[#0A3D3A] text-white",
  },
];

const CODE_BADGES: Record<string, string> = {
  A: "bg-[#37E49E] text-[#0A3D3A]",
  B: "bg-[#9CA3AF] text-white",
  C: "bg-[#0A3D3A] text-white",
};

const selectTrigger =
  "h-10 w-full min-w-0 border-[#D3D3D3] rounded-lg text-sm focus:ring-[#0A3D3A] focus:ring-offset-0 bg-white";
const outlineBtn =
  "h-10 w-full sm:w-auto px-3 sm:px-4 border-[#0A3D3A] text-[#0A3D3A] hover:bg-[#0A3D3A]/5 hover:text-[#0A3D3A] rounded-lg text-xs sm:text-sm font-semibold gap-2 bg-white";

const formatDisplayDate = (iso: string) => {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const applyStopCodes = (list: RouteStop[]): RouteStop[] => {
  const codes = ["A", "B", "C", "D", "E", "F"];
  return list.map((stop, index) => {
    const code = codes[index] ?? String(index + 1);
    return {
      ...stop,
      code,
      badgeClass: CODE_BADGES[code] ?? "bg-[#9CA3AF] text-white",
      warning: null,
    };
  });
};

const AdminRoutePlanner = () => {
  const navigate = useNavigate();
  const [engineerId, setEngineerId] = useState("alex");
  const [date, setDate] = useState("2025-07-25");
  const [region, setRegion] = useState("all");
  const [stops, setStops] = useState<RouteStop[]>(initialStops);

  const engineer =
    engineers.find((e) => e.id === engineerId) ?? engineers[0];

  const visibleStops = useMemo(() => {
    if (region === "all") return stops;
    return stops.filter((s) => s.regionKey === region);
  }, [stops, region]);

  const hasWarnings = visibleStops.some((s) => s.warning);

  const handleOptimize = () => {
    setStops((prev) => {
      const order = ["#1052", "#1050", "#1054"];
      const sorted = [...prev].sort((a, b) => {
        const ai = order.indexOf(a.job);
        const bi = order.indexOf(b.job);
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      });
      return applyStopCodes(sorted);
    });
    showSuccess("Routes optimized");
  };

  const handleExport = () => {
    try {
      const rows = [
        ["code", "time", "job", "site", "region"],
        ...visibleStops.map((s) => [s.code, s.time, s.job, s.site, s.region]),
      ];
      const csv = rows
        .map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
        )
        .join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "route-stops.csv";
      link.click();
      URL.revokeObjectURL(url);
      showSuccess("Route exported");
    } catch {
      showError("Failed to export route");
    }
  };

  const handleOpenCalendar = () => {
    navigate("/admin/calendar");
    showSuccess("Opened calendar");
  };

  const handleOpenJob = (job: string) => {
    const jobNumber = job.replace("#", "");
    navigate(`/admin/jobs/${jobNumber}`);
  };

  const moveStopUp = (job: string) => {
    setStops((prev) => {
      const index = prev.findIndex((s) => s.job === job);
      if (index <= 0) return prev;
      const next = [...prev];
      const [item] = next.splice(index, 1);
      next.splice(index - 1, 0, item);
      return applyStopCodes(next);
    });
    showSuccess("Reordered");
  };

  return (
    <AdminLayout
      title="Engineer Route Planner"
      subtitle="Geographic view of scheduled jobs with optimized routes"
      header={
        <div className="flex items-start gap-2.5 min-w-0">
          <div className="mt-0.5 hidden min-[380px]:flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F5F3] text-[#0A3D3A]">
            <Map size={18} />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-lg sm:text-[20px] font-semibold text-[#242424] leading-tight">
              Engineer Route Planner
            </h1>
            <p className="text-[11px] sm:text-xs text-[#989898] mt-0.5 leading-relaxed">
              Geographic view of scheduled jobs with optimized routes
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-3.5 sm:space-y-5 min-w-0 max-w-full">
        {/* Filter bar */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-3 sm:p-4 shadow-sm min-w-0 max-w-full">
          <div className="flex flex-col xl:flex-row xl:items-center flex-wrap gap-2.5 sm:gap-3 min-w-0 max-w-full">
            <div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-2.5 sm:gap-3 flex-1 min-w-0 max-w-full">
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-10 w-full min-w-0 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0"
              />
              <Select value={engineerId} onValueChange={setEngineerId}>
                <SelectTrigger className={selectTrigger}>
                  <SelectValue placeholder="Select engineer" />
                </SelectTrigger>
                <SelectContent>
                  {engineers.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className={selectTrigger}>
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">North England</SelectItem>
                  <SelectItem value="south">South England</SelectItem>
                  <SelectItem value="west">West England</SelectItem>
                  <SelectItem value="wales">Wales</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col min-[480px]:flex-row flex-wrap items-stretch min-[480px]:items-center gap-2 xl:ml-auto shrink-0">
              <Button
                className="h-10 w-full min-[480px]:w-auto px-3 sm:px-4 bg-[#0A3D3A] hover:bg-[#083F3C] text-white rounded-lg text-xs sm:text-sm font-semibold gap-2"
                onClick={handleOptimize}
              >
                <Sparkles size={15} />
                Auto Optimize Routes
              </Button>
              <Button
                variant="outline"
                className={outlineBtn}
                onClick={handleExport}
              >
                <Download size={15} />
                Export Route
              </Button>
              <Button
                variant="outline"
                className={outlineBtn}
                onClick={handleOpenCalendar}
              >
                <CalendarDays size={15} />
                Open in Calendar
              </Button>
            </div>
          </div>
        </div>

        {/* Map + side panel */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-3.5 sm:gap-5 min-w-0">
          {/* Map */}
          <div className="relative bg-[#E8F8E0] border border-[#DDEFCB] rounded-xl overflow-hidden min-h-[340px] sm:min-h-[420px] xl:min-h-[560px] order-1">
            {/* Legend */}
            <div className="absolute top-3 left-3 right-3 sm:right-auto z-10 bg-white/95 rounded-lg border border-[#E0E0E0] p-2.5 sm:p-3 shadow-sm space-y-1.5 text-[11px] sm:text-xs text-[#242424] max-w-[200px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#37E49E] shrink-0" />
                Start Point
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9CA3AF] shrink-0" />
                Route Stop
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0A3D3A] shrink-0" />
                End Point
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-0.5 bg-[#9CA3AF] shrink-0" />
                Route Path
              </div>
            </div>

            {/* Map lines decoration */}
            <div className="absolute inset-0 opacity-[0.14] pointer-events-none">
              <svg
                viewBox="0 0 800 500"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,80 C120,120 180,60 300,100 S500,180 620,140 760,180 800,160"
                  fill="none"
                  stroke="#0A3D3A"
                  strokeWidth="2"
                />
                <path
                  d="M0,240 C140,200 240,280 380,240 S560,180 680,240 760,260 800,240"
                  fill="none"
                  stroke="#0A3D3A"
                  strokeWidth="2"
                />
                <path
                  d="M0,400 C120,360 260,420 400,380 S600,320 800,380"
                  fill="none"
                  stroke="#0A3D3A"
                  strokeWidth="2"
                />
                <path
                  d="M160,0 C180,120 140,240 180,360 S200,440 180,500"
                  fill="none"
                  stroke="#0A3D3A"
                  strokeWidth="2"
                />
                <path
                  d="M400,0 C420,140 380,260 420,380 S440,440 420,500"
                  fill="none"
                  stroke="#0A3D3A"
                  strokeWidth="2"
                />
                <path
                  d="M640,0 C660,120 620,260 660,380 S680,440 660,500"
                  fill="none"
                  stroke="#0A3D3A"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Center placeholder */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 pb-16 sm:pb-20">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-white/80 flex items-center justify-center mb-3 shadow-sm">
                  <MapPin size={24} className="text-[#0A3D3A]" />
                </div>
                <p className="font-display font-semibold text-[#0A3D3A] text-sm sm:text-base">
                  Interactive Map View
                </p>
                <p className="text-[11px] sm:text-xs text-[#505050] mt-1 leading-relaxed">
                  Route visualization for {engineer.name} –{" "}
                  {formatDisplayDate(date)}
                </p>
              </div>
            </div>

            {/* Warning banner */}
            {hasWarnings && (
              <div className="absolute left-3 right-3 sm:left-4 sm:right-auto bottom-3 sm:bottom-4 z-10 sm:max-w-md">
                <div className="bg-[#FFFBEB] border border-[#F59E0B] rounded-lg p-2.5 sm:p-3 shadow-sm text-[11px] sm:text-xs text-[#92400E]">
                  <div className="flex gap-2 items-start">
                    <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      <strong>Route Warning:</strong> Job C is 95km from Job B.
                      Consider reassigning.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right panel */}
          <div className="space-y-3.5 sm:space-y-5 order-2 min-w-0">
            {/* Engineer summary */}
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-3.5 sm:p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#D1FAE5] text-[#0A3D3A] text-xs font-semibold flex items-center justify-center shrink-0">
                  {engineer.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-sm text-[#242424] truncate">
                    {engineer.name}
                  </p>
                  <p className="text-xs text-[#989898]">{engineer.region}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {[
                  { value: String(visibleStops.length), label: "Total Jobs" },
                  { value: "96km", label: "Route Distance" },
                  { value: "2h 15m", label: "Drive Time" },
                  { value: "2", label: "Regions" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white border border-[#E0E0E0] rounded-lg p-2.5 sm:p-3 min-w-0"
                  >
                    <p className="font-display text-base sm:text-lg font-semibold text-[#242424] leading-tight">
                      {stat.value}
                    </p>
                    <p className="text-[10px] text-[#989898] mt-0.5 leading-snug">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Route stops */}
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-3.5 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                <h3 className="font-display font-semibold text-sm text-[#242424]">
                  Route Stops
                </h3>
                <span className="text-[10px] text-[#989898] shrink-0">
                  Click grip to move up
                </span>
              </div>
              <div className="space-y-2.5">
                {visibleStops.length === 0 ? (
                  <p className="text-xs text-[#989898] py-2">
                    No stops in this region.
                  </p>
                ) : (
                  visibleStops.map((stop) => (
                    <div
                      key={stop.job}
                      className="border border-[#E0E0E0] rounded-lg p-3 flex gap-2.5 sm:gap-3 min-w-0"
                    >
                      <div
                        className={`w-7 h-7 shrink-0 rounded-full text-[11px] font-semibold flex items-center justify-center ${stop.badgeClass}`}
                      >
                        {stop.code}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-medium text-[#242424] leading-snug">
                            {stop.time}{" "}
                            <span className="text-[#989898]">|</span> {stop.job}
                          </p>
                          <button
                            type="button"
                            className="text-[#989898] hover:text-[#505050] shrink-0 -mt-0.5"
                            aria-label="Move stop up"
                            onClick={() => moveStopUp(stop.job)}
                          >
                            <GripVertical size={16} />
                          </button>
                        </div>
                        <p className="text-xs font-semibold text-[#242424] mt-1.5 leading-snug">
                          {stop.site}
                        </p>
                        <p className="text-[11px] text-[#989898] mt-0.5 leading-snug">
                          {stop.region}
                        </p>
                        {stop.warning && (
                          <div className="mt-2 flex items-start gap-1 text-[#DC2626] text-[11px] leading-snug">
                            <AlertTriangle
                              size={12}
                              className="shrink-0 mt-0.5"
                            />
                            <span>{stop.warning}</span>
                          </div>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 mt-2.5 text-xs border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-md w-full sm:w-auto"
                          onClick={() => handleOpenJob(stop.job)}
                        >
                          Open Job
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminRoutePlanner;
