import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, Settings } from "lucide-react";
import { EngineerLayout } from "@/components/engineer/EngineerLayout";

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
      icon: Clock,
    },
    {
      title: "Westfield Wind",
      time: "14:00-15:30",
      region: "North",
      status: "Scheduled",
      icon: MapPin,
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
      icon: Clock,
    },
  ],
  5: [
    {
      title: "Coastal Solar",
      time: "11:00-12:30",
      region: "West",
      status: "Scheduled",
      icon: Clock,
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
  const [weekOffset, setWeekOffset] = useState(0);

  const weekLabel = `2025-01-${20 + weekOffset * 7}`;

  return (
    <EngineerLayout title="My Weekly Schedule" subtitle="January 20 - January 26, 2025">
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-5 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#242424] mb-2">
                Region
              </label>
              <div className="relative">
                <select className="w-full h-11 appearance-none rounded-lg border border-[#D3D3D3] bg-white pl-3 pr-10 text-sm text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#0A3D3A] cursor-pointer">
                  <option>All Regions</option>
                  <option>North England</option>
                  <option>South England</option>
                  <option>East England</option>
                  <option>West England</option>
                  <option>Wales</option>
                  <option>Scotland</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronLeft size={16} className="rotate-[-90deg] text-[#989898]" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#242424] mb-2">
                Status
              </label>
              <div className="relative">
                <select className="w-full h-11 appearance-none rounded-lg border border-[#D3D3D3] bg-white pl-3 pr-10 text-sm text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#0A3D3A] cursor-pointer">
                  <option>All Status</option>
                  <option>Scheduled</option>
                  <option>Completed</option>
                  <option>Not Feasible</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronLeft size={16} className="rotate-[-90deg] text-[#989898]" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#242424] mb-2">
                Week
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={weekLabel}
                  readOnly
                  className="w-full h-11 rounded-lg border border-[#D3D3D3] bg-white pl-3 pr-10 text-sm text-[#242424] focus:outline-none"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Clock size={16} className="text-[#989898]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden">
          <div className="grid grid-cols-7 border-b border-[#E0E0E0]">
            {days.map((d, i) => (
              <div key={i} className="p-3 sm:p-4 text-center border-r border-[#E0E0E0] last:border-r-0">
                <p className="font-semibold text-[#242424] text-xs sm:text-sm">{d.day}</p>
                <p className="text-xs text-[#989898] mt-1">{d.date}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 min-h-[320px] sm:min-h-[400px]">
            {days.map((d, i) => (
              <div
                key={i}
                className="p-2 sm:p-3 border-r border-[#E0E0E0] last:border-r-0 min-h-[320px] sm:min-h-[400px] bg-white"
              >
                <div className="space-y-2">
                  {jobs[i]?.map((job, j) => (
                    <div
                      key={j}
                      className={`rounded-lg border p-2 sm:p-3 text-left ${
                        job.status === "Not Feasible"
                          ? "border-[#F59E0B] bg-[#FFFBF0]"
                          : "border-[#E0E0E0] bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <h4 className="font-semibold text-[#0A3D3A] text-xs sm:text-sm leading-tight">
                          {job.title}
                        </h4>
                        {job.alert && (
                          <span className="text-[#F59E0B] shrink-0">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                          </span>
                        )}
                        {!job.alert && job.icon && <job.icon size={14} className="text-[#989898] shrink-0" />}
                      </div>
                      <p className="text-xs text-[#505050]">{job.time}</p>
                      <span
                        className={`inline-block mt-2 text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full ${
                          job.status === "Completed"
                            ? "bg-[#E8F6F3] text-[#0A3D3A]"
                            : job.status === "Not Feasible"
                            ? "bg-[#FEE2E2] text-[#DC2626]"
                            : "bg-[#E8F6F3] text-[#0A3D3A]"
                        }`}
                      >
                        {job.status}
                      </span>
                      {job.region && (
                        <p className="text-[10px] sm:text-xs text-[#989898] mt-1">{job.region}</p>
                      )}
                      {job.detail && (
                        <p className="text-[10px] sm:text-xs text-[#505050] mt-1">{job.detail}</p>
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