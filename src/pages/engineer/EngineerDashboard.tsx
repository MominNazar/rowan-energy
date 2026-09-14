import { useNavigate, Link } from "react-router-dom";
import {
  CalendarDays,
  ChevronRight,
  Clock,
  FileText,
  Map,
  MapPin,
  Navigation,
  Settings,
  Upload,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EngineerLayout } from "@/components/engineer/EngineerLayout";
import { showSuccess } from "@/utils/toast";

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
  { label: "Upload Survey", icon: Upload, to: "/engineer/upload" },
  { label: "Set Availability", icon: Settings, to: "/engineer/availability" },
];

const EngineerDashboard = () => {
  const navigate = useNavigate();

  const handleStartNavigation = (jobTitle: string) => {
    showSuccess(`Navigation started for ${jobTitle}`);
    navigate("/engineer/route-planner");
  };

  return (
    <EngineerLayout title="Good morning, Alex" subtitle="You have 2 jobs scheduled today in North England">
      <div className="space-y-5 sm:space-y-6 min-w-0 w-full">
        <div className="bg-[#FEF3C7] border border-[#F59E0B] rounded-lg px-3 sm:px-5 py-3 flex items-start gap-2.5 sm:gap-3 min-w-0">
          <FileText size={18} className="text-[#B45309] shrink-0 mt-0.5" />
          <p className="text-sm text-[#92400E] min-w-0 break-words">
            Reminder: Risk Assessment for Job #1029 not yet submitted.
          </p>
        </div>

        <section className="min-w-0">
          <div className="flex items-center gap-2 mb-4 min-w-0">
            <MapPin size={20} className="text-[#0A3D3A] shrink-0" />
            <h2 className="font-display text-lg font-semibold text-[#242424]">
              Today&apos;s Jobs
            </h2>
          </div>
          <div className="space-y-4">
            {todayJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 min-w-0"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3 mb-3">
                  <h3 className="font-display text-base font-semibold text-[#0A3D3A] min-w-0 break-words">
                    {job.title}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-[#E8F6F3] text-[#0A3D3A] border-0 text-xs font-medium shrink-0"
                  >
                    {job.status}
                  </Badge>
                </div>
                <p className="text-sm text-[#505050] mb-3 break-words">{job.address}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#989898] mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="shrink-0" />
                    Time: {job.time}
                  </span>
                  <span>Region: {job.region}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-2.5">
                  <Button
                    asChild
                    className="h-9 w-full sm:w-auto px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-xs font-semibold"
                  >
                    <Link to={`/engineer/job-details/${job.id}`}>
                      View Job Details
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleStartNavigation(job.title)}
                    className="h-9 w-full sm:w-auto px-4 border-[#0A3D3A] text-[#0A3D3A] hover:bg-[#E8F6F3] rounded-lg text-xs font-semibold"
                  >
                    <Navigation size={14} className="mr-1.5 shrink-0" />
                    Start Navigation
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="min-w-0">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={20} className="text-[#0A3D3A] shrink-0" />
            <h2 className="font-display text-lg font-semibold text-[#242424]">
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {quickActions.map((action) => (
              <Link key={action.label} to={action.to} className="min-w-0 w-full">
                <button
                  type="button"
                  className="w-full bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 flex flex-col items-center gap-3 hover:border-[#0A3D3A] hover:shadow-sm transition-all"
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

        <section className="min-w-0">
          <div className="flex items-center gap-2 mb-4 min-w-0">
            <CalendarDays size={20} className="text-[#0A3D3A] shrink-0" />
            <h2 className="font-display text-base sm:text-lg font-semibold text-[#242424] min-w-0 break-words">
              Upcoming Jobs (Next 3 Days)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {upcomingJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 min-w-0"
              >
                <h3 className="font-display text-base font-semibold text-[#0A3D3A] mb-2 break-words">
                  {job.title}
                </h3>
                <p className="text-sm text-[#989898] mb-4 break-words">
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
