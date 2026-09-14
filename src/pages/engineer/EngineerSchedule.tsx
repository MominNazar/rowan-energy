import { useMemo, useState, type LucideIcon } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Settings,
  AlertTriangle,
  Cloud,
  Zap,
  CalendarDays,
} from "lucide-react";
import { addDays, format } from "date-fns";
import { EngineerLayout } from "@/components/engineer/EngineerLayout";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";

type JobStatus = "Scheduled" | "Completed" | "Not Feasible";

interface ScheduleJob {
  title: string;
  time: string;
  region: string;
  status: JobStatus;
  icon?: LucideIcon;
  alert?: boolean;
  detail?: string;
  action?: boolean;
}

const baseWeekStart = new Date(2025, 0, 20);

const initialJobs: Record<number, ScheduleJob[]> = {
  0: [
    {
      title: "Westfield Wind",
      time: "09:00-10:30",
      region: "North",
      status: "Scheduled",
      icon: AlertTriangle,
      alert: true,
    },
    {
      title: "Westfield Wind",
      time: "14:00-15:30",
      region: "North",
      status: "Scheduled",
      icon: Cloud,
    },
  ],
  2: [
    {
      title: "Greenfield Solar",
      time: "10:00-11:30",
      region: "South",
      status: "Scheduled",
      icon: Settings,
    },
  ],
  4: [
    {
      title: "Hillside Wind",
      time: "08:30-10:00",
      region: "Wales",
      status: "Completed",
      icon: Cloud,
    },
  ],
  5: [
    {
      title: "Coastal Solar",
      time: "11:00-12:30",
      region: "West",
      status: "Scheduled",
      icon: Zap,
      alert: true,
    },
    {
      title: "Weather Alert",
      time: "Temperature: 12C",
      region: "Wind: 25 mph",
      status: "Not Feasible",
      icon: MapPin,
      detail: "Storm chance: 90%",
      action: true,
    },
  ],
};

const regionFilterMap: Record<string, string> = {
  north: "North",
  south: "South",
  east: "East",
  west: "West",
  wales: "Wales",
  scotland: "Scotland",
};

const statusFilterMap: Record<string, JobStatus> = {
  scheduled: "Scheduled",
  completed: "Completed",
  "not-feasible": "Not Feasible",
};

const EngineerSchedule = () => {
  const [jobs] = useState(initialJobs);
  const [regionFilter, setRegionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(baseWeekStart);

  const weekStart = addDays(baseWeekStart, weekOffset * 7);
  const weekLabel = format(weekStart, "MMM d, yyyy");
  const subtitleLabel =
    format(weekStart, "MMM d") +
    " - " +
    format(addDays(weekStart, 6), "MMM d, yyyy");

  const days = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const date = addDays(weekStart, i);
        return {
          day: format(date, "EEEE"),
          date: format(date, "MMM d"),
        };
      }),
    [weekStart]
  );

  const filteredJobs = useMemo(() => {
    const result: Record<number, ScheduleJob[]> = {};
    Object.entries(jobs).forEach(([dayKey, dayJobs]) => {
      const dayIndex = Number(dayKey);
      result[dayIndex] = dayJobs.filter((job) => {
        const matchesRegion =
          regionFilter === "all" ||
          job.region.toLowerCase().includes(
            (regionFilterMap[regionFilter] || regionFilter).toLowerCase()
          ) ||
          (regionFilterMap[regionFilter] || "").toLowerCase() ===
            job.region.toLowerCase();
        const matchesStatus =
          statusFilter === "all" || job.status === statusFilterMap[statusFilter];
        return matchesRegion && matchesStatus;
      });
    });
    return result;
  }, [jobs, regionFilter, statusFilter]);

  const summary = useMemo(() => {
    const all = Object.values(filteredJobs).flat();
    const regions = new Set(
      all
        .filter((j) => j.status !== "Not Feasible")
        .map((j) => j.region)
        .filter((r) => !r.includes("mph"))
    );
    return {
      total: all.filter((j) => j.status !== "Not Feasible" || j.action).length,
      completed: all.filter((j) => j.status === "Completed").length,
      scheduled: all.filter((j) => j.status === "Scheduled").length,
      regions: regions.size,
    };
  }, [filteredJobs]);

  const handleReschedule = (title: string) => {
    showSuccess(`Reschedule requested (demo) — ${title}`);
  };

  const renderJobCard = (job: ScheduleJob, compact = false) => (
    <div
      className={`rounded-lg border text-left min-w-0 ${
        compact ? "p-2" : "p-3"
      } ${
        job.status === "Not Feasible"
          ? "border-[#F59E0B] bg-[#FFFBF0]"
          : "border-[#E0E0E0] bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-1 mb-1 min-w-0">
        <h4
          className={`font-semibold text-[#0A3D3A] leading-tight min-w-0 break-words ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {job.title}
        </h4>
        {job.alert && (
          <span className="text-[#F59E0B] shrink-0">
            <AlertTriangle size={14} />
          </span>
        )}
        {!job.alert && job.icon && (
          <job.icon size={14} className="text-[#989898] shrink-0" />
        )}
      </div>
      <p className={`text-[#505050] ${compact ? "text-xs" : "text-xs"}`}>
        {job.time}
      </p>
      <span
        className={`inline-block mt-2 font-medium px-2 py-0.5 rounded-full ${
          compact ? "text-[10px]" : "text-xs"
        } ${
          job.status === "Completed"
            ? "bg-[#E8F6F3] text-[#0A3D3A]"
            : job.status === "Scheduled"
            ? "bg-[#E8F6F3] text-[#0A3D3A]"
            : "bg-[#FEE2E2] text-[#DC2626]"
        }`}
      >
        {job.status}
      </span>
      {job.region && (
        <p
          className={`text-[#989898] mt-1 ${
            compact ? "text-[10px]" : "text-xs"
          }`}
        >
          {job.region}
        </p>
      )}
      {job.detail && (
        <p
          className={`text-[#505050] mt-1 ${
            compact ? "text-[10px]" : "text-xs"
          }`}
        >
          {job.detail}
        </p>
      )}
      {job.status === "Not Feasible" && (
        <p className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#DC2626]">
          <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
          Not Feasible
        </p>
      )}
      {job.action && (
        <button
          type="button"
          onClick={() => handleReschedule(job.title)}
          className="mt-2 w-full h-8 bg-[#0A3D3A] text-white text-xs font-medium rounded-md hover:bg-[#0A3D3A]/90 transition-colors"
        >
          Reschedule Job
        </button>
      )}
    </div>
  );

  return (
    <EngineerLayout title="My Weekly Schedule" subtitle={subtitleLabel}>
      <div className="space-y-4 sm:space-y-6 min-w-0 w-full">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-3 sm:p-5 lg:p-6 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 min-w-0">
            {/* Region */}
            <div className="min-w-0">
              <label className="block text-sm font-medium text-[#242424] mb-2">
                Region
              </label>
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-full h-11 min-w-0">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">North England</SelectItem>
                  <SelectItem value="south">South England</SelectItem>
                  <SelectItem value="east">East England</SelectItem>
                  <SelectItem value="west">West England</SelectItem>
                  <SelectItem value="wales">Wales</SelectItem>
                  <SelectItem value="scotland">Scotland</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Status */}
            <div className="min-w-0">
              <label className="block text-sm font-medium text-[#242424] mb-2">
                Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full h-11 min-w-0">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="not-feasible">Not Feasible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Week */}
            <div className="min-w-0">
              <label className="block text-sm font-medium text-[#242424] mb-2">
                Week
              </label>
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-11 w-10 sm:w-11 shrink-0"
                  onClick={() => {
                    setWeekOffset((o) => o - 1);
                    setSelectedDate(addDays(weekStart, -7));
                  }}
                  aria-label="Previous week"
                >
                  <ChevronLeft size={16} />
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 min-w-0 h-11 justify-between text-left font-normal px-2.5 sm:px-3"
                    >
                      <span className="text-sm text-[#242424] truncate">{weekLabel}</span>
                      <CalendarDays size={16} className="text-[#989898] shrink-0 ml-1" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        if (date) {
                          const diff = Math.round(
                            (date.getTime() - baseWeekStart.getTime()) / 86400000
                          );
                          setWeekOffset(Math.round(diff / 7));
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-11 w-10 sm:w-11 shrink-0"
                  onClick={() => {
                    setWeekOffset((o) => o + 1);
                    setSelectedDate(addDays(weekStart, 7));
                  }}
                  aria-label="Next week"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Grid - Desktop */}
        <div className="hidden md:block bg-white rounded-xl border border-[#E0E0E0] min-w-0">
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              <div className="grid grid-cols-7 border-b border-[#E0E0E0]">
                {days.map((d, i) => (
                  <div
                    key={i}
                    className="p-3 text-center border-r border-[#E0E0E0] last:border-r-0"
                  >
                    <p className="font-semibold text-[#242424] text-sm">{d.day}</p>
                    <p className="text-xs text-[#989898] mt-1">{d.date}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {days.map((_, i) => (
                  <div
                    key={i}
                    className="border-r border-[#E0E0E0] last:border-r-0 p-2 min-h-[320px] bg-white"
                  >
                    <div className="space-y-2">
                      {filteredJobs[i]?.map((job, j) => (
                        <div key={j}>{renderJobCard(job, true)}</div>
                      ))}
                      {!filteredJobs[i]?.length && (
                        <p className="text-xs text-[#989898] text-center mt-4">
                          No jobs
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Day Cards */}
        <div className="md:hidden space-y-3 min-w-0">
          {days.map((d, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#E0E0E0] min-w-0"
            >
              <div className="px-3 sm:px-4 py-3 bg-[#F5F5F5] border-b border-[#E0E0E0]">
                <p className="font-semibold text-[#242424] text-sm">{d.day}</p>
                <p className="text-xs text-[#989898]">{d.date}</p>
              </div>
              <div className="p-3 space-y-2 min-w-0">
                {filteredJobs[i]?.map((job, j) => (
                  <div key={j} className="min-w-0">{renderJobCard(job)}</div>
                ))}
                {!filteredJobs[i]?.length && (
                  <p className="text-xs text-[#989898] text-center py-4">
                    No jobs
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Summary */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 lg:p-8 min-w-0">
          <h2 className="font-display text-lg font-semibold text-[#242424] mb-4 sm:mb-6">
            Weekly Summary
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { label: "Total Jobs", value: String(summary.total) },
              { label: "Completed", value: String(summary.completed) },
              { label: "Scheduled", value: String(summary.scheduled) },
              { label: "Regions", value: String(summary.regions) },
            ].map((item) => (
              <div key={item.label} className="text-center min-w-0">
                <p className="text-sm text-[#505050] mb-1">{item.label}</p>
                <p className="font-display text-2xl sm:text-3xl font-semibold text-[#0A3D3A]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </EngineerLayout>
  );
};

export default EngineerSchedule;
