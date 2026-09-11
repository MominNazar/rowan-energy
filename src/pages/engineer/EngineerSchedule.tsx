import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Settings,
  AlertTriangle,
  Cloud,
  Zap,
  CalendarDays,
  Calendar,
  Navigation,
} from "lucide-react";
import { format } from "date-fns";
import { EngineerLayout } from "@/components/engineer/EngineerLayout";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const days = [
  { day: "Monday", date: "Jan 20" },
  { day: "Tuesday", date: "Jan 21" },
  { day: "Wednesday", date: "Jan 22" },
  { day: "Thursday", date: "Jan 23" },
  { day: "Friday", date: "Jan 24" },
  { day: "Saturday", date: "Jan 25" },
  { day: "Sunday", date: "Jan 26" },
];

const jobs: Record<string, any[]> = {
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

const EngineerSchedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2025, 0, 20));
  const [weekOffset, setWeekOffset] = useState(0);

  const weekStart = selectedDate || new Date(2025, 0, 20);
  const weekLabel = format(weekStart, "MMM d, yyyy");
  const subtitleLabel = format(weekStart, "MMM d") + " - " + format(new Date(weekStart.getTime() + 6 * 86400000), "MMM d, yyyy");

  return (
    <EngineerLayout title="My Weekly Schedule" subtitle={subtitleLabel}>
      <div className="space-y-4 sm:space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-3 sm:p-5 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* Region */}
            <div>
              <label className="block text-sm font-medium text-[#242424] mb-2">
                Region
              </label>
              <div className="relative">
                <Select>
                  <SelectTrigger className="w-full h-11">
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
            </div>
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-[#242424] mb-2">
                Status
              </label>
              <div className="relative">
                <Select>
                  <SelectTrigger className="w-full h-11">
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
            </div>
            {/* Week */}
            <div>
              <label className="block text-sm font-medium text-[#242424] mb-2">
                Week
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-11 justify-between text-left font-normal px-3"
                  >
                    <span className="text-sm text-[#242424]">{weekLabel}</span>
                    <CalendarDays size={16} className="text-[#989898]" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      if (date) {
                        const diff = Math.round((date.getTime() - new Date(2025, 0, 20).getTime()) / 86400000);
                        setWeekOffset(Math.round(diff / 7));
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Calendar Grid - Desktop */}
        <div className="hidden md:block bg-white rounded-xl border border-[#E0E0E0] overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Header Row */}
              <div className="grid grid-cols-7 border-b border-[#E0E0E0]">
                {days.map((d, i) => (
                  <div key={i} className="p-3 text-center border-r border-[#E0E0E0] last:border-r-0">
                    <p className="font-semibold text-[#242424] text-sm">{d.day}</p>
                    <p className="text-xs text-[#989898] mt-1">{d.date}</p>
                  </div>
                ))}
              </div>
              {/* Jobs Grid */}
              <div className="grid grid-cols-7">
                {days.map((d, i) => (
                  <div
                    key={i}
                    className="border-r border-[#E0E0E0] last:border-r-0 p-2 min-h-[320px] bg-white"
                  >
                    <div className="space-y-2">
                      {jobs[i]?.map((job, j) => (
                        <div
                          key={j}
                          className={`rounded-lg border p-2 text-left ${
                            job.status === "Not Feasible"
                              ? "border-[#F59E0B] bg-[#FFFBF0]"
                              : "border-[#E0E0E0] bg-white"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1 mb-1">
                            <h4 className="font-semibold text-[#0A3D3A] text-xs leading-tight">
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
                          <p className="text-xs text-[#505050]">{job.time}</p>
                          <span
                            className={`inline-block mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${
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
                            <p className="text-[10px] text-[#989898] mt-1">{job.region}</p>
                          )}
                          {job.detail && (
                            <p className="text-[10px] text-[#505050] mt-1">{job.detail}</p>
                          )}
                          {job.status === "Not Feasible" && (
                            <p className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#DC2626]">
                              <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                              Not Feasible
                            </p>
                          )}
                          {job.action && (
                            <button className="mt-2 w-full h-8 bg-[#0A3D3A] text-white text-xs font-medium rounded-md hover:bg-[#0A3D3A]/90 transition-colors">
                              Reschedule Job
                            </button>
                          )}
                        </div>
                      ))}
                      {!jobs[i]?.length && (
                        <p className="text-xs text-[#989898] text-center mt-4">No jobs</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Day Cards */}
        <div className="md:hidden space-y-3">
          {days.map((d, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden">
              <div className="px-4 py-3 bg-[#F5F5F5] border-b border-[#E0E0E0]">
                <p className="font-semibold text-[#242424] text-sm">{d.day}</p>
                <p className="text-xs text-[#989898]">{d.date}</p>
              </div>
              <div className="p-3 space-y-2">
                {jobs[i]?.map((job, j) => (
                  <div
                    key={j}
                    className={`rounded-lg border p-3 text-left ${
                      job.status === "Not Feasible"
                        ? "border-[#F59E0B] bg-[#FFFBF0]"
                        : "border-[#E0E0E0] bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <h4 className="font-semibold text-[#0A3D3A] text-sm leading-tight">
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
                    <p className="text-xs text-[#505050]">{job.time}</p>
                    <span
                      className={`inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${
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
                      <p className="text-xs text-[#989898] mt-1">{job.region}</p>
                    )}
                    {job.detail && (
                      <p className="text-xs text-[#505050] mt-1">{job.detail}</p>
                    )}
                    {job.status === "Not Feasible" && (
                      <p className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#DC2626]">
                        <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                        Not Feasible
                      </p>
                    )}
                    {job.action && (
                      <button className="mt-2 w-full h-8 bg-[#0A3D3A] text-white text-xs font-medium rounded-md hover:bg-[#0A3D3A]/90 transition-colors">
                        Reschedule Job
                      </button>
                    )}
                  </div>
                ))}
                {!jobs[i]?.length && (
                  <p className="text-xs text-[#989898] text-center py-4">No jobs</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Summary */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6 lg:p-8">
          <h2 className="font-display text-lg font-semibold text-[#242424] mb-6">
            Weekly Summary
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Total Jobs", value: "6" },
              { label: "Completed", value: "1" },
              { label: "Scheduled", value: "5" },
              { label: "Regions", value: "4" },
            ].map((item) => (
              <div key={item.label} className="text-center">
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
