import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreHorizontal,
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

type JobStatus = "Scheduled" | "In Progress" | "Completed" | "Revisit Needed";

type CalendarJob = {
  id: string;
  title: string;
  time: string;
  region: string;
  engineer: number;
  status: JobStatus;
  start: number;
  end: number;
  revisit?: boolean;
};

const engineers = [
  {
    name: "Alex Khan",
    initials: "AK",
    region: "North England",
    color: "#D1FAE5",
    text: "#0A3D3A",
  },
  {
    name: "Fatima Ahmed",
    initials: "FA",
    region: "West Midlands",
    color: "#FFEDD5",
    text: "#9A3412",
  },
  {
    name: "Owen Williams",
    initials: "OW",
    region: "East Midlands",
    color: "#DBEAFE",
    text: "#1D4ED8",
  },
  {
    name: "Sarah Mitchell",
    initials: "SM",
    region: "London",
    color: "#EDE9FE",
    text: "#6D28D9",
  },
];

const calendarJobs: CalendarJob[] = [
  {
    id: "#1052",
    title: "Greenfield Solar",
    time: "08:00-09:30",
    region: "North England",
    engineer: 0,
    status: "Scheduled",
    start: 8,
    end: 9.5,
  },
  {
    id: "#1051",
    title: "WindTech Industrial",
    time: "09:00-10:30",
    region: "West Midlands",
    engineer: 1,
    status: "In Progress",
    start: 9,
    end: 10.5,
  },
  {
    id: "#1054",
    title: "EnergyTech Hub",
    time: "09:30-11:00",
    region: "East Midlands",
    engineer: 2,
    status: "Scheduled",
    start: 9.5,
    end: 11,
  },
  {
    id: "#1050",
    title: "SolarMax Distribution",
    time: "11:00-12:30",
    region: "East Midlands",
    engineer: 2,
    status: "Completed",
    start: 11,
    end: 12.5,
  },
  {
    id: "#1049",
    title: "EcoEnergy Plant",
    time: "13:00-14:30",
    region: "London",
    engineer: 3,
    status: "Revisit Needed",
    start: 13,
    end: 14.5,
    revisit: true,
  },
  {
    id: "#1053",
    title: "PowerGrid Station",
    time: "14:00-15:30",
    region: "West Midlands",
    engineer: 1,
    status: "Scheduled",
    start: 14,
    end: 15.5,
  },
];

const unassignedJobs = [
  { id: "#1055", title: "Solar City", when: "Jul 25, 16:00-17:30" },
  { id: "#1056", title: "Wind Valley", when: "Jul 26, 09:00-10:30" },
];

const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16];
const HOUR_HEIGHT = 72;
const DAY_START = 8;
const WEEK_BASE = new Date(2025, 6, 22); // July 22, 2025

const statusStyles: Record<
  JobStatus,
  { bg: string; text: string; border: string }
> = {
  Scheduled: {
    bg: "#F3F4F6",
    text: "#374151",
    border: "1px solid #E5E7EB",
  },
  "In Progress": {
    bg: "#DBEAFE",
    text: "#1E40AF",
    border: "1px solid #93C5FD",
  },
  Completed: {
    bg: "#0A3D3A",
    text: "#FFFFFF",
    border: "1px solid #0A3D3A",
  },
  "Revisit Needed": {
    bg: "#FEF2F2",
    text: "#B91C1C",
    border: "1.5px dashed #EF4444",
  },
};

const selectTrigger =
  "h-9 w-full min-w-0 sm:w-[140px] border-[#D3D3D3] rounded-lg text-sm focus:ring-[#0A3D3A] focus:ring-offset-0 bg-white";

const getWeekLabel = (offset: number) => {
  const start = new Date(WEEK_BASE);
  start.setDate(start.getDate() + offset * 7);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);

  const startMonth = start.toLocaleDateString("en-US", { month: "long" });
  const endMonth = end.toLocaleDateString("en-US", { month: "long" });
  const year = end.getFullYear();

  if (startMonth === endMonth) {
    return `${startMonth} ${start.getDate()} - ${end.getDate()}, ${year}`;
  }
  return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${year}`;
};

const formatDayLabel = (iso: string) => {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const downloadCsv = (filename: string, rows: string[][]) => {
  const csv = rows
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

const AdminCalendar = () => {
  const [view, setView] = useState<"weekly" | "daily">("weekly");
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState("2025-07-25");
  const [region, setRegion] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredJobs = useMemo(() => {
    return calendarJobs.filter((job) => {
      if (region !== "all") {
        if (!job.region.toLowerCase().includes(region)) return false;
      }
      if (status !== "all") {
        const map: Record<string, JobStatus> = {
          scheduled: "Scheduled",
          progress: "In Progress",
          completed: "Completed",
          revisit: "Revisit Needed",
        };
        if (job.status !== map[status]) return false;
      }
      return true;
    });
  }, [region, status]);

  const dailyJobs = useMemo(
    () => [...filteredJobs].sort((a, b) => a.start - b.start),
    [filteredJobs],
  );

  const workload = engineers.map((eng, idx) => ({
    name: eng.name,
    count: filteredJobs.filter((j) => j.engineer === idx).length,
  }));

  const handleExport = () => {
    try {
      const rows = [
        ["id", "title", "time", "region", "engineer", "status"],
        ...filteredJobs.map((job) => [
          job.id,
          job.title,
          job.time,
          job.region,
          engineers[job.engineer]?.name ?? "",
          job.status,
        ]),
      ];
      downloadCsv("calendar-jobs.csv", rows);
      showSuccess("Calendar exported");
    } catch {
      showError("Failed to export calendar");
    }
  };

  return (
    <AdminLayout
      title="Weekly Job Calendar View"
      subtitle="Visual schedule management across all engineers"
      header={
        <div className="flex w-full flex-col gap-3 min-[520px]:flex-row min-[520px]:items-center min-[520px]:justify-between min-w-0">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="mt-0.5 hidden min-[380px]:flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F5F3] text-[#0A3D3A]">
              <CalendarDays size={18} />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-lg sm:text-[20px] font-semibold text-[#242424] leading-tight">
                Weekly Job Calendar View
              </h1>
              <p className="text-[11px] sm:text-xs text-[#989898] mt-0.5 leading-relaxed">
                Visual schedule management across all engineers
              </p>
            </div>
          </div>

          <div className="flex items-center rounded-lg border border-[#E0E0E0] p-0.5 bg-white shrink-0 self-start min-[520px]:self-center">
            <button
              type="button"
              onClick={() => setView("weekly")}
              className={`h-8 px-3 sm:px-3.5 text-xs font-semibold rounded-md transition-colors ${
                view === "weekly"
                  ? "bg-[#0A3D3A] text-white"
                  : "text-[#505050] hover:bg-[#F5F5F5]"
              }`}
            >
              Weekly
            </button>
            <button
              type="button"
              onClick={() => setView("daily")}
              className={`h-8 px-3 sm:px-3.5 text-xs font-semibold rounded-md transition-colors ${
                view === "daily"
                  ? "bg-[#0A3D3A] text-white"
                  : "text-[#505050] hover:bg-[#F5F5F5]"
              }`}
            >
              Daily
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-3.5 sm:space-y-5 min-w-0 max-w-full">
        {/* Control bar */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-3 sm:p-4 shadow-sm min-w-0 max-w-full">
          <div className="flex flex-col gap-3 min-w-0 max-w-full">
            <div className="flex flex-col lg:flex-row lg:items-center flex-wrap gap-2.5 sm:gap-3 min-w-0 max-w-full">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                {view === "weekly" ? (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 shrink-0 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5]"
                      aria-label="Previous week"
                      onClick={() => setWeekOffset((o) => o - 1)}
                    >
                      <ChevronLeft size={16} />
                    </Button>
                    <div className="h-9 px-3 sm:px-4 flex items-center justify-center border border-[#D3D3D3] rounded-lg text-xs sm:text-sm font-medium text-[#242424] whitespace-nowrap min-w-0 truncate">
                      {getWeekLabel(weekOffset)}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 shrink-0 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5]"
                      aria-label="Next week"
                      onClick={() => setWeekOffset((o) => o + 1)}
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <Input
                      type="date"
                      value={selectedDay}
                      onChange={(e) => setSelectedDay(e.target.value)}
                      className="h-9 w-full max-w-[180px] border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0"
                    />
                    <div className="h-9 px-3 sm:px-4 flex items-center justify-center border border-[#D3D3D3] rounded-lg text-xs sm:text-sm font-medium text-[#242424] whitespace-nowrap min-w-0 truncate">
                      {formatDayLabel(selectedDay)}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-2 lg:ml-auto lg:flex lg:items-center lg:w-auto min-w-0">
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className={selectTrigger}>
                    <SelectValue placeholder="All Regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="north">North England</SelectItem>
                    <SelectItem value="west">West Midlands</SelectItem>
                    <SelectItem value="east">East Midlands</SelectItem>
                    <SelectItem value="london">London</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className={selectTrigger}>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="revisit">Revisit Needed</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="h-9 w-full sm:w-auto px-3 gap-2 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold"
                  onClick={handleExport}
                >
                  <Download size={14} />
                  Export
                </Button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] sm:text-xs text-[#505050] pt-1 border-t border-[#F0F0F0]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB] border border-[#D1D5DB]" />
                Scheduled
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#93C5FD]" />
                In Progress
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0A3D3A]" />
                Completed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border border-dashed border-[#EF4444] bg-[#FEF2F2]" />
                Revisit Needed
              </span>
            </div>
          </div>
        </div>

        {/* Calendar grid */}
        {view === "weekly" ? (
          <div className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <div className="min-w-[780px]">
                {/* Engineer headers */}
                <div
                  className="grid border-b border-[#E0E0E0]"
                  style={{
                    gridTemplateColumns: `64px repeat(${engineers.length}, minmax(160px, 1fr))`,
                  }}
                >
                  <div className="px-2 py-3 border-r border-[#E0E0E0] text-[10px] font-semibold uppercase tracking-wide text-[#989898] flex items-end">
                    TIME
                  </div>
                  {engineers.map((eng) => (
                    <div
                      key={eng.name}
                      className="px-3 py-3 border-r border-[#E0E0E0] last:border-r-0"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0"
                          style={{ background: eng.color, color: eng.text }}
                        >
                          {eng.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[#242424] leading-tight truncate">
                            {eng.name}
                          </p>
                          <p className="text-[10px] text-[#989898] truncate">
                            {eng.region}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Body */}
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: `64px repeat(${engineers.length}, minmax(160px, 1fr))`,
                  }}
                >
                  {/* Time labels */}
                  <div className="border-r border-[#E0E0E0]">
                    {hours.map((hour) => (
                      <div
                        key={hour}
                        className="px-2 pt-2 text-[10px] text-[#989898] border-b border-[#E0E0E0]"
                        style={{ height: HOUR_HEIGHT }}
                      >
                        {String(hour).padStart(2, "0")}:00
                      </div>
                    ))}
                  </div>

                  {/* Engineer columns */}
                  {engineers.map((eng, engIdx) => {
                    const columnJobs = filteredJobs.filter(
                      (j) => j.engineer === engIdx,
                    );
                    return (
                      <div
                        key={eng.name}
                        className="relative border-r border-[#E0E0E0] last:border-r-0"
                        style={{ height: hours.length * HOUR_HEIGHT }}
                      >
                        {hours.map((hour) => (
                          <div
                            key={hour}
                            className="absolute left-0 right-0 border-b border-[#E0E0E0]"
                            style={{
                              top: (hour - DAY_START) * HOUR_HEIGHT,
                              height: HOUR_HEIGHT,
                            }}
                          />
                        ))}

                        {columnJobs.map((job) => {
                          const style = statusStyles[job.status];
                          const top =
                            (job.start - DAY_START) * HOUR_HEIGHT + 4;
                          const height = Math.max(
                            52,
                            (job.end - job.start) * HOUR_HEIGHT - 8,
                          );
                          return (
                            <div
                              key={job.id}
                              className="absolute left-1.5 right-1.5 rounded-lg shadow-sm overflow-hidden cursor-pointer z-[1] hover:z-[2]"
                              style={{
                                top,
                                height,
                                background: style.bg,
                                color: style.text,
                                border: style.border,
                                padding: "8px 10px",
                              }}
                            >
                              <div className="flex items-start justify-between gap-1">
                                <p className="text-[11px] font-bold leading-tight line-clamp-2">
                                  {job.id} {job.title}
                                </p>
                                <MoreHorizontal
                                  size={12}
                                  className="opacity-50 shrink-0 mt-0.5"
                                />
                              </div>
                              <p className="text-[10px] leading-tight mt-1 opacity-80">
                                {job.time}
                              </p>
                              <p className="text-[10px] leading-tight opacity-80 truncate">
                                {job.region}
                              </p>
                              {job.revisit && (
                                <div className="mt-1 flex items-center gap-1 text-[#DC2626]">
                                  <AlertTriangle
                                    size={11}
                                    className="shrink-0"
                                  />
                                  <span className="text-[10px] font-medium">
                                    Revisit Needed
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden shadow-sm">
            <div className="border-b border-[#E0E0E0] px-4 py-3">
              <p className="text-sm font-semibold text-[#242424]">
                Daily schedule — {formatDayLabel(selectedDay)}
              </p>
              <p className="text-xs text-[#989898] mt-0.5">
                Jobs sorted by start time
              </p>
            </div>
            <div className="divide-y divide-[#E0E0E0]">
              {dailyJobs.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-[#989898]">
                  No jobs match the current filters.
                </div>
              ) : (
                dailyJobs.map((job) => {
                  const eng = engineers[job.engineer];
                  const style = statusStyles[job.status];
                  return (
                    <div
                      key={job.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3.5"
                    >
                      <div className="w-24 shrink-0 text-xs font-semibold text-[#505050]">
                        {job.time}
                      </div>
                      <div
                        className="flex-1 min-w-0 rounded-lg px-3 py-2.5"
                        style={{
                          background: style.bg,
                          color: style.text,
                          border: style.border,
                        }}
                      >
                        <p className="text-sm font-semibold leading-snug">
                          {job.id} {job.title}
                        </p>
                        <p className="text-[11px] opacity-80 mt-1">
                          {job.region} · {eng?.name ?? "Unassigned"} ·{" "}
                          {job.status}
                        </p>
                        {job.revisit && (
                          <div className="mt-1.5 flex items-center gap-1 text-[#DC2626]">
                            <AlertTriangle size={12} className="shrink-0" />
                            <span className="text-[11px] font-medium">
                              Revisit Needed
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Bottom cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-5 shadow-sm">
            <h3 className="font-display text-sm font-semibold text-[#242424] mb-3 sm:mb-4">
              Workload Summary
            </h3>
            <div className="space-y-3 text-sm">
              {workload.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="text-[#505050] truncate">{item.name}</span>
                  <span className="font-medium text-[#242424] shrink-0">
                    {item.count} job{item.count !== 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-5 shadow-sm">
            <h3 className="font-display text-sm font-semibold text-[#242424] mb-3 sm:mb-4">
              Unassigned Jobs
            </h3>
            <div className="space-y-2.5">
              {unassignedJobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-lg border border-dashed border-[#D3D3D3] p-3"
                >
                  <p className="text-sm font-medium text-[#242424]">
                    {job.id} {job.title}
                  </p>
                  <p className="text-[11px] text-[#989898] mt-1">{job.when}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-5 shadow-sm">
            <h3 className="font-display text-sm font-semibold text-[#242424] mb-3 sm:mb-4">
              Alerts
            </h3>
            <div className="rounded-lg bg-[#FFFBEB] border border-[#FDE68A] p-3 text-xs text-[#92400E] flex gap-2">
              <AlertTriangle size={14} className="shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Job #1049 needs revisit - Upload missing for 6 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCalendar;
