import {
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  Home,
  MapPin,
  MoreHorizontal,
  Users,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Leads Today", value: "12", change: "+2 from yesterday", positive: true, icon: Home },
  { label: "Jobs Scheduled Today", value: "8", change: "-1 from yesterday", positive: false, icon: CalendarDays },
  { label: "Jobs Completed", value: "5", change: "+2 from yesterday", positive: true, icon: CheckCircle2 },
  { label: "Engineers Available", value: "4", change: "Same as yesterday", positive: true, icon: Users },
];

const todayJobs = [
  { id: "1", title: "Hightower Solar Farm", region: "North England", time: "09:00 - 10:30 AM", engineer: "Alex Khan", status: "In Progress" },
  { id: "2", title: "GreenTech Office", region: "West Midlands", time: "10:00 - 11:45 AM", engineer: "Fatima Patel", status: "Completed" },
  { id: "3", title: "Riverside Panels", region: "South England", time: "12:30 - 14:00 PM", engineer: "Owen Williams", status: "Scheduled" },
  { id: "4", title: "Leeds City Hall", region: "North England", time: "15:00 - 17:00 PM", engineer: "Alex Khan", status: "Scheduled" },
  { id: "5", title: "Sunnyvale Residences", region: "East Midlands", time: "16:30 - 18:00 PM", engineer: "Fatima Patel", status: "Running Late" },
];

const funnel = [
  { label: "Chatbot", value: 65, color: "bg-[#37E49E]" },
  { label: "Form", value: 25, color: "bg-[#0A3D3A]" },
  { label: "Phone", value: 10, color: "bg-[#989898]" },
];

const statusBreakdown = [
  { label: "New", value: 8, color: "bg-[#37E49E]" },
  { label: "Qualified", value: 6, color: "bg-[#37E49E]" },
  { label: "Converted", value: 4, color: "bg-[#37E49E]" },
  { label: "Abandoned", value: 2, color: "bg-[#989898]" },
];

const workload = [
  { name: "Alex Khan", initials: "AK", status: "In Progress", jobs: 3, next: "12:30 - Leeds" },
  { name: "Fatima Patel", initials: "FP", status: "Available", jobs: 1, next: "15:00 - York" },
  { name: "Owen Williams", initials: "OW", status: "Fully Free", jobs: 0, next: "-" },
  { name: "Sarah Johnson", initials: "SJ", status: "Fully Loaded", jobs: 4, next: "14:15 - Manchester" },
];

const AdminDashboard = () => {
  return (
    <AdminLayout title="Welcome, David 👋" subtitle="Wednesday, July 23, 2025" showNotification>
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-xl border border-[#E0E0E0] p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-[#505050] font-medium">{s.label}</p>
                    <p className="font-display text-3xl font-semibold text-[#242424] mt-1">{s.value}</p>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-[#E8F6F3] flex items-center justify-center">
                    <Icon size={18} className="text-[#0A3D3A]" />
                  </div>
                </div>
                <p className={`text-xs font-medium ${s.positive ? "text-[#0A3D3A]" : "text-[#EF4444]"}`}>
                  {s.positive ? "↑" : "↓"} {s.change}
                </p>
                <div className="h-1 bg-[#EAEAEA] rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-[#0A3D3A] rounded-full" style={{ width: `${Math.min(s.value === "12" ? 80 : s.value === "8" ? 60 : s.value === "5" ? 70 : 50, 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-base font-semibold text-[#242424]">Today&apos;s Jobs</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-[#989898] hover:text-[#242424]">
                  <MoreHorizontal size={16} />
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              {todayJobs.map((job) => (
                <div key={job.id} className="rounded-lg border border-[#E0E0E0] p-3 hover:border-[#0A3D3A] transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-[#242424] text-sm">{job.title}</h3>
                    <Badge
                      className={`text-[10px] ${
                        job.status === "Completed"
                          ? "bg-[#E8F6F3] text-[#0A3D3A]"
                          : job.status === "In Progress"
                          ? "bg-[#FEF3C7] text-[#92400E]"
                          : job.status === "Running Late"
                          ? "bg-[#FEE2E2] text-[#DC2626]"
                          : "bg-[#E8F6F3] text-[#0A3D3A]"
                      }`}
                    >
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#989898] mt-1">{job.region}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-[#505050]">{job.time}</span>
                    <span className="text-xs text-[#505050]">{job.engineer}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 h-10 border-[#0A3D3A] text-[#0A3D3A] hover:bg-[#E8F6F3] rounded-lg text-sm font-semibold">
              View All Jobs <ChevronRight size={14} className="ml-1" />
            </Button>
          </div>

          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-base font-semibold text-[#242424]">Lead Funnel Overview</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-[#989898] hover:text-[#242424]">
                <MoreHorizontal size={16} />
              </Button>
            </div>
            <p className="text-xs text-[#505050] mb-4">Lead Source Breakdown</p>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#EAEAEA" strokeWidth="4" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#37E49E" strokeWidth="4" strokeDasharray="65, 100" />
                </svg>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {funnel.map((f) => (
                <span key={f.label} className="text-xs bg-[#F5F5F5] px-2 py-1 rounded-md text-[#242424]">
                  {f.value}% {f.label}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#505050] mb-3">Lead Status Breakdown</p>
            <div className="space-y-3">
              {statusBreakdown.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#242424]">{s.label}</span>
                    <span className="font-medium text-[#242424]">{s.value}</span>
                  </div>
                  <div className="h-1.5 bg-[#EAEAEA] rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full`} style={{ width: `${(s.value / 8) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-base font-semibold text-[#242424]">Engineer Workload Snapshot</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-[#989898] hover:text-[#242424]">
                <MoreHorizontal size={16} />
              </Button>
            </div>
            <div className="space-y-3">
              {workload.map((w) => (
                <div key={w.name} className="rounded-lg border border-[#E0E0E0] p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#D1FAE5] text-[#0A3D3A] text-xs font-semibold flex items-center justify-center">
                        {w.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#242424]">{w.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${w.status === "Fully Loaded" ? "bg-[#EF4444]" : "bg-[#37E49E]"}`} />
                          <span className="text-[10px] text-[#505050]">{w.status}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-[#0A3D3A] hover:bg-[#E8F6F3]">
                      {w.jobs > 0 ? "View Route" : "+ Assign Job"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs">
                    <span className="text-[#505050]">Jobs Today</span>
                    <span className="font-medium text-[#242424]">{w.jobs}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span className="text-[#989898]">Next: {w.next}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
