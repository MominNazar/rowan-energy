import { useState } from "react";
import {
  AlertTriangle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const engineers = [
  { name: "Alex Khan", initials: "AK", region: "North England", color: "#D1FAE5", text: "#0A3D3A" },
  { name: "Fatima Ahmed", initials: "FA", region: "West Midlands", color: "#FFEDD5", text: "#9A3412" },
  { name: "Owen Williams", initials: "OW", region: "East Midlands", color: "#E0E7FF", text: "#3730A3" },
  { name: "Sarah Mitchell", initials: "SM", region: "London", color: "#EDE9FE", text: "#6B21A8" },
];

const calendarJobs = [
  { id: "#1052", title: "Greenfield Solar", time: "08:00-09:30", region: "North England", engineer: 0, status: "Scheduled", color: "#F3F4F6", textColor: "#374151", day: 22, start: 8, end: 9.5 },
  { id: "#1051", title: "WindTech Industrial", time: "09:00-10:30", region: "West Midlands", engineer: 1, status: "In Progress", color: "#DBEAFE", textColor: "#1E3A8A", day: 23, start: 9, end: 10.5 },
  { id: "#1054", title: "EnergyTech Hub", time: "09:30-11:00", region: "East Midlands", engineer: 2, status: "Scheduled", color: "#F3F4F6", textColor: "#374151", day: 23, start: 9.5, end: 11 },
  { id: "#1050", title: "SolarMax Distribution", time: "11:00-12:30", region: "East Midlands", engineer: 2, status: "Completed", color: "#0A3D3A", textColor: "#FFFFFF", day: 24, start: 11, end: 12.5 },
  { id: "#1049", title: "EcoEnergy Plant", time: "13:00-14:30", region: "London", engineer: 3, status: "Revisit Needed", color: "#FEF2F2", textColor: "#B91C1C", day: 25, start: 13, end: 14.5, revisit: true },
  { id: "#1053", title: "PowerGrid Station", time: "14:00-15:30", region: "West Midlands", engineer: 1, status: "Scheduled", color: "#F3F4F6", textColor: "#374151", day: 24, start: 14, end: 15.5 },
];

const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16];

const AdminCalendar = () => {
  const [view, setView] = useState<"weekly" | "daily">("weekly");

  return (
    <AdminLayout
      header={
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <h1 className="font-display text-lg font-semibold text-[#242424] leading-tight">Weekly Job Calendar View</h1>
            <p className="text-xs text-[#989898] mt-1">Visual schedule management across all engineers</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center rounded-lg border border-[#E0E0E0] p-0.5 bg-white">
              <button
                type="button"
                onClick={() => setView("weekly")}
                className={`h-8 px-3 text-xs font-medium rounded-md transition-colors ${view === "weekly" ? "bg-[#0A3D3A] text-white" : "text-[#505050] hover:bg-[#F5F5F5]"}`}
              >
                Weekly
              </button>
              <button
                type="button"
                onClick={() => setView("daily")}
                className={`h-8 px-3 text-xs font-medium rounded-md transition-colors ${view === "daily" ? "bg-[#0A3D3A] text-white" : "text-[#505050] hover:bg-[#F5F5F5]"}`}
              >
                Daily
              </button>
            </div>
            <button className="w-9 h-9 rounded-full bg-[#D1FAE5] text-[#0A3D3A] font-semibold text-sm flex items-center justify-center shrink-0">D</button>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-[#242424]">David</span>
              <ChevronDown size={14} className="text-[#989898]" />
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-3 sm:p-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9 border-[#E0E0E0] text-[#505050] hover:bg-[#F5F5F5]"><ChevronLeft size={16} /></Button>
              <Button variant="outline" className="h-9 px-4 border-[#E0E0E0] text-[#242424] hover:bg-[#F5F5F5] rounded-lg text-sm font-medium">July 22 - 28, 2025</Button>
              <Button variant="outline" size="icon" className="h-9 w-9 border-[#E0E0E0] text-[#505050] hover:bg-[#F5F5F5]"><ChevronRight size={16} /></Button>
            </div>
            <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
              <Select value="all">
                <SelectTrigger className="h-9 w-40 border-[#E0E0E0] text-sm">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">North England</SelectItem>
                  <SelectItem value="west">West Midlands</SelectItem>
                </SelectContent>
              </Select>
              <Select value="all">
                <SelectTrigger className="h-9 w-40 border-[#E0E0E0] text-sm">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="h-9 px-3 gap-2 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold">
                <Filter size={14} /> Export
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#505050] px-1">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB]" /> Scheduled</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#DBEAFE]" /> In Progress</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0A3D3A]" /> Completed</span>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden">
          <div className="grid grid-cols-[72px_repeat(4,1fr)] border-b border-[#E0E0E0]">
            <div className="p-3 border-r border-[#E0E0E0] text-xs text-[#989898]">TIME</div>
            {engineers.map((eng) => (
              <div key={eng.name} className="p-3 border-r border-[#E0E0E0] last:border-r-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold" style={{ background: eng.color, color: eng.text }}>{eng.initials}</div>
                  <div>
                    <p className="text-xs font-semibold text-[#242424] leading-tight">{eng.name}</p>
                    <p className="text-[10px] text-[#989898]">{eng.region}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-[72px_repeat(4,1fr)] border-b border-[#E0E0E0]">
                <div className="h-16 px-2 py-2 text-[10px] text-[#989898] border-r border-[#E0E0E0] flex items-start pt-2">{hour}:00</div>
                {engineers.map((eng, engIdx) => {
                  const cellJobs = calendarJobs.filter(
                    (j) => j.engineer === engIdx && Math.floor(j.start) === hour
                  );
                  return (
                    <div key={`${hour}-${engIdx}`} className="h-16 border-r border-[#E0E0E0] last:border-r-0 relative">
                      {cellJobs.map((job) => {
                        const top = (job.start - hour) * 64;
                        const height = Math.max(44, (job.end - job.start) * 64 - 8);
                        return (
                          <div
                            key={job.id}
                            style={{
                              position: "absolute",
                              top: `${top + 2}px`,
                              height,
                              background: job.color,
                              color: job.textColor,
                              borderRadius: 8,
                              border: job.revisit ? "1.5px dashed #EF4444" : "1px solid rgba(10,61,58,0.12)",
                              padding: 8,
                            }}
                            className="shadow-sm overflow-hidden cursor-pointer"
                          >
                            <div className="flex items-center justify-between gap-1">
                              <p className="text-[11px] font-bold leading-tight">{job.id} {job.title}</p>
                              <MoreHorizontal size={12} className="opacity-60 shrink-0" />
                            </div>
                            <p className="text-[9px] leading-tight mt-0.5 opacity-80">{job.time}</p>
                            <p className="text-[9px] leading-tight opacity-80">{job.region}</p>
                            {job.revisit && (
                              <div className="mt-1 flex items-center gap-1 text-[#DC2626]">
                                <AlertTriangle size={11} />
                                <span className="text-[9px] font-medium">Revisit Needed</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
            <h3 className="font-display text-sm font-semibold text-[#242424] mb-4">Workload Summary</h3>
            <div className="space-y-3 text-sm">
              {engineers.map((eng) => {
                const count = calendarJobs.filter((j) => j.engineer === engineers.indexOf(eng)).length;
                return (
                  <div key={eng.name} className="flex items-center justify-between">
                    <span className="text-[#505050]">{eng.name}</span>
                    <span className="font-medium text-[#242424]">{count} job{count !== 1 ? "s" : ""}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
            <h3 className="font-display text-sm font-semibold text-[#242424] mb-4">Unassigned Jobs</h3>
            <div className="space-y-2.5">
              <div className="rounded-lg border border-dashed border-[#D3D3D3] p-3">
                <p className="text-sm font-medium text-[#242424]">#1055 Solar City</p>
                <p className="text-[10px] text-[#989898] mt-1">Jul 25, 16:00-17:30</p>
              </div>
              <div className="rounded-lg border border-dashed border-[#D3D3D3] p-3">
                <p className="text-sm font-medium text-[#242424]">#1056 Wind Valley</p>
                <p className="text-[10px] text-[#989898] mt-1">Jul 26, 09:00-10:30</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
            <h3 className="font-display text-sm font-semibold text-[#242424] mb-4">Alerts</h3>
            <div className="rounded-lg bg-[#FFFBEB] border border-[#FDE68A] p-3 text-xs text-[#92400E] flex gap-2">
              <span className="mt-0.5"><AlertTriangle size={14} /></span>
              <p>Job #1049 needs revisit - Upload missing for 6 hours</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCalendar;
