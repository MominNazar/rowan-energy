import {
  AlertTriangle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Filter,
  MapPin,
  MoreHorizontal,
  Plus,
  RefreshCcw,
  Users,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const engineers = [
  { name: "Alex Khan", initials: "AK", color: "#D1FAE5", text: "#0A3D3A" },
  { name: "Fatima Ahmed", initials: "FA", color: "#FFEDD5", text: "#9A3412" },
  { name: "Owen Williams", initials: "OW", color: "#E0E7FF", text: "#3730A3" },
  { name: "Sarah Mitchell", initials: "SM", color: "#EDE9FE", text: "#6B21A8" },
];

const calendarJobs = [
  { day: 22, start: 9, end: 10, engineer: 0, title: "Greenfield Solar", region: "North England", status: "Scheduled", color: "#D1FAE5", textColor: "#0A3D3A" },
  { day: 23, start: 10, end: 11, engineer: 1, title: "WindTech Industrial", region: "West Midlands", status: "In Progress", color: "#FEF3C7", textColor: "#92400E" },
  { day: 23, start: 13, end: 14, engineer: 1, title: "EcoEnergy Plant", region: "London", status: "Revisit Needed", color: "#FEE2E2", textColor: "#DC2626" },
  { day: 24, start: 14, end: 15, engineer: 2, title: "SolarMax Distribution", region: "East Midlands", status: "Scheduled", color: "#D1FAE5", textColor: "#0A3D3A" },
  { day: 25, start: 10, end: 11, engineer: 3, title: "Powerfield Station", region: "West Midlands", status: "Scheduled", color: "#E0E7FF", textColor: "#3730A3" },
];

const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

const AdminCalendar = () => {
  return (
    <AdminLayout title="Weekly Job Calendar View" subtitle="Visual schedule management across all engineers">
      <div className="space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9 border-[#E0E0E0] text-[#505050] hover:bg-[#F5F5F5]"><ChevronLeft size={16} /></Button>
            <Button variant="outline" className="h-9 px-4 border-[#E0E0E0] text-[#242424] hover:bg-[#F5F5F5] rounded-lg text-sm font-medium">July 22 - 28, 2025</Button>
            <Button variant="outline" size="icon" className="h-9 w-9 border-[#E0E0E0] text-[#505050] hover:bg-[#F5F5F5]"><ChevronRight size={16} /></Button>
            <div className="h-6 w-px bg-[#E0E0E0] mx-1" />
            <Select value="week">
              <SelectTrigger className="h-9 w-32 border-[#E0E0E0] text-sm">
                <SelectValue placeholder="Weekly" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Weekly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
              </SelectContent>
            </Select>
            <Select value="all">
              <SelectTrigger className="h-9 w-32 border-[#E0E0E0] text-sm">
                <SelectValue placeholder="All Engineers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Engineers</SelectItem>
                <SelectItem value="alex">Alex Khan</SelectItem>
                <SelectItem value="fatima">Fatima Ahmed</SelectItem>
              </SelectContent>
            </Select>
            <Select value="all">
              <SelectTrigger className="h-9 w-32 border-[#E0E0E0] text-sm">
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">North England</SelectItem>
                <SelectItem value="london">London</SelectItem>
              </SelectContent>
            </Select>
            <Select value="all">
              <SelectTrigger className="h-9 w-32 border-[#E0E0E0] text-sm">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-9 px-3 gap-2 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold ml-auto">
              <Filter size={14} /> Export
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden">
          <div className="grid grid-cols-[96px_repeat(4,1fr)] border-b border-[#E0E0E0]">
            <div className="p-3 border-r border-[#E0E0E0] text-xs text-[#989898]">Time</div>
            {engineers.map((eng) => (
              <div key={eng.name} className="p-3 border-r border-[#E0E0E0] last:border-r-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold" style={{ background: eng.color, color: eng.text }}>{eng.initials}</div>
                  <div>
                    <p className="text-xs font-semibold text-[#242424] leading-tight">{eng.name}</p>
                    <p className="text-[10px] text-[#989898]">2 jobs</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative min-h-[480px]">
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-[96px_repeat(4,1fr)] border-b border-[#E0E0E0]">
                <div className="h-16 px-2 py-2 text-[10px] text-[#989898] border-r border-[#E0E0E0]">{hour}:00</div>
                {engineers.map((_, i) => <div key={`${hour}-${i}`} className="h-16 border-r border-[#E0E0E0] last:border-r-0" />)}
              </div>
            ))}
            {calendarJobs.map((job, index) => {
              const eng = engineers[job.engineer];
              const top = (job.start - 9) * 64;
              const height = Math.max(44, (job.end - job.start) * 64 - 8);
              return (
                <div key={`${job.title}-${index}`} style={{ position: "absolute", left: "calc(12.5% + 8px)", width: "calc(87.5% - 16px)", top: `${top}px`, height, background: job.color, color: job.textColor, borderRadius: 8, border: "1px solid rgba(10,61,58,0.12)", padding: 6 }} className="shadow-sm overflow-hidden">
                  <p className="text-[10px] font-semibold leading-tight">{job.title}</p>
                  <p className="text-[9px] leading-tight mt-0.5 opacity-90">{job.region}</p>
                  <div className="mt-1 flex items-center justify-between gap-1">
                    <Badge className="text-[9px] bg-white/80 border-0">{job.status}</Badge>
                    <MoreHorizontal size={13} className="opacity-70" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
            <h3 className="font-display text-sm font-semibold text-[#242424] mb-4">Workload Summary</h3>
            <div className="space-y-3 text-sm">
              {engineers.map((eng) => <div key={eng.name} className="flex items-center justify-between"><span className="text-[#505050]">{eng.name}</span><span className="font-medium text-[#242424]">2 jobs</span></div>)}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
            <h3 className="font-display text-sm font-semibold text-[#242424] mb-4">Unassigned Jobs</h3>
            <div className="space-y-2">
              {["#1055 Solar City", "#1054 Wind Valley"].map((job) => <div key={job} className="rounded-lg border border-[#E0E0E0] p-3"><p className="text-sm font-medium text-[#242424]">{job}</p><p className="text-[10px] text-[#989898] mt-1">Jul 26, 09:00 - 10:30</p></div>)}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
            <h3 className="font-display text-sm font-semibold text-[#242424] mb-4">Alerts</h3>
            <div className="rounded-lg bg-[#FEF3C7] border border-[#FDE68A] p-3 text-xs text-[#92400E] flex gap-2">
              <span className="mt-0.5"><AlertTriangle size={14} /></span>
              <p>Job #1049 needs revisit - Upload missing for RGB Photos</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCalendar;
