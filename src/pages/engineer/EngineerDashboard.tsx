import { Link } from "react-router-dom";
import {
  Bell,
  CalendarDays,
  ChevronRight,
  Clock,
  FileText,
  Home,
  Layers,
  Map,
  MapPin,
  Navigation,
  Settings,
  Upload,
  User,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EngineerLayout } from "@/components/engineer/EngineerLayout";

const todayJobs = [
  {
    id: "1",
    title: "Hightower Solar Farm",
    address: "Grange Lane, Manchester M34 7TF",
    time: "09:00-10:30 AM",
    region: "North England",
    status: "Scheduled",
  },
  {
    id: "2",
    title: "Westfield Wind Farm",
    address: "Farm Road, Leeds LS15 8GB",
    time: "02:00-03:30 PM",
    region: "North England",
    status: "Scheduled",
  },
];

const upcomingJobs = [
  { id: "3", title: "Greenfield Solar", date: "Tomorrow", region: "North England" },
  { id: "4", title: "Hillside Wind", date: "Jan 24", region: "South England" },
  { id: "5", title: "Coastal Solar", date: "Jan 25", region: "West England" },
];

const quickActions = [
  { label: "View Route", icon: Map, to: "/engineer/route-planner" },
  { label: "Upload Survey", icon: Upload, to: "/engineer/job-details/upload" },
  { label: "Set Availability", icon: Settings, to: "/engineer/availability" },
];

const EngineerDashboard = () => {
  return (
    <EngineerLayout title="Good morning, Alex" subtitle="You have 2 jobs scheduled today in North England">
      <div className="space-y-6">
        <div className="bg-[#FEF3C7] border border-[#F59E0B] rounded-lg px-4 sm:px-5 py-3 flex items-start gap-3">
          <FileText size={18} className="text-[#B45309] shrink-0 mt-0.5" />
          <p className="text-sm text-[#92400E]">
            Reminder: Risk Assessment for Job #1029 not yet submitted.
          </p>
        </div>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={20} className="text-[#0A3D3A]" />
            <h2 className="font-display text-lg font-semibold text-[#242424]">
              Today&apos;s Jobs
            </h2>
          </div>
          <div className="space-y-4">
            {todayJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-display text-base font-semibold text-[#0A3D3A]">
                    {job.title}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-[#E8F6F3] text-[#0A3D3A] border-0 text-xs font-medium"
                  >
                    {job.status}
                  </Badge>
                </div>
                <p className="text-sm text-[#505050] mb-3">{job.address}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#989898] mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    Time: {job.time}
                  </span>
                  <span>Region: {job.region}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link to={`/engineer/job-details/${job.id}`}>
                    <Button className="h-10 px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold">
                      View Job Details
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="h-10 px-4 border-[#0A3D3A] text-[#0A3D3A] hover:bg-[#E8F6F3] rounded-lg text-sm font-semibold"
                  >
                    <Navigation size={15} className="mr-1.5" />
                    Start Navigation
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Zap size={20} className="text-[#0A3D3A]" />
            <h2 className="font-display text-lg font-semibold text-[#242424]">
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link key={action.label} to={action.to}>
                <button
                  type="button"
                  className="w-full bg-white rounded-xl border border-[#E0E0E0] p-6 flex flex-col items-center gap-3 hover:border-[#0A3D3A] hover:shadow-sm transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#EAEAEA] flex items-center justify-center">
                    <action.icon size={22} className="text-[#0A3D3A]" />
                  </div>
                  <span className="font-medium text-[#242424] text-sm">
                    {action.label}
                  </span>
                </button>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays size={20} className="text-[#0A3D3A]" />
            <h2 className="font-display text-lg font-semibold text-[#242424]">
              Upcoming Jobs (Next 3 Days)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6"
              >
                <h3 className="font-display text-base font-semibold text-[#0A3D3A] mb-2">
                  {job.title}
                </h3>
                <p className="text-sm text-[#989898] mb-4">
                  {job.date} - {job.region}
                </p>
                <Link
                  to={`/engineer/job-details/${job.id}`}
                  className="text-sm font-medium text-[#0A3D3A] hover:underline inline-flex items-center gap-1"
                >
                  View <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </EngineerLayout>
  );
};

export default EngineerDashboard;