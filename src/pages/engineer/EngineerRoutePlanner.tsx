import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Download,
  MapPin,
  Navigation,
  Plus,
  Route,
  Share2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EngineerLayout } from "@/components/engineer/EngineerLayout";

const routeJobs = [
  {
    id: "1",
    title: "Hightower Solar Farm",
    time: "09:00 - 10:30",
    region: "North England",
    status: "Scheduled",
  },
  {
    id: "2",
    title: "Westfield Wind Farm",
    time: "12:00 - 13:30",
    region: "North England",
    status: "Scheduled",
  },
  {
    id: "3",
    title: "Greenfield Solar",
    time: "15:00 - 16:30",
    region: "South England",
    status: "Scheduled",
  },
];

const EngineerRoutePlanner = () => {
  const [traffic, setTraffic] = useState<"light" | "clear">("light");

  return (
    <EngineerLayout title="My Route Planner" subtitle="Optimize your daily travel route">
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 border-[#E0E0E0] bg-white text-[#505050] hover:bg-[#F5F5F5]"
              aria-label="Previous day"
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="outline"
              className="h-9 px-4 border-[#E0E0E0] bg-white text-[#242424] hover:bg-[#F5F5F5] rounded-lg text-sm font-medium"
            >
              Today - January 22, 2025
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 border-[#E0E0E0] bg-white text-[#505050] hover:bg-[#F5F5F5]"
              aria-label="Next day"
            >
              <ChevronRight size={16} />
            </Button>
            <select className="h-9 rounded-lg border border-[#E0E0E0] bg-white px-3 text-sm text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#0A3D3A] cursor-pointer">
              <option>Daily View</option>
              <option>Weekly View</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="h-9 rounded-lg border border-[#E0E0E0] bg-white px-3 text-sm text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#0A3D3A] cursor-pointer">
              <option>All Regions</option>
              <option>North England</option>
              <option>South England</option>
            </select>
            <select className="h-9 rounded-lg border border-[#E0E0E0] bg-white px-3 text-sm text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#0A3D3A] cursor-pointer">
              <option>All Status</option>
              <option>Scheduled</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        {/* Map + Route List */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-4">
          {/* Map Panel */}
          <div className="relative min-h-[420px] lg:min-h-[520px] rounded-xl overflow-hidden border border-[#E0E0E0] bg-[#E9F9DC]">
            <div className="absolute inset-0 opacity-70">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(10,61,58,0.08)_1px,transparent_0)] bg-[size:28px_28px]" />
              <div className="absolute left-[18%] top-[32%] h-[3px] w-[28%] bg-[#0A3D3A]/70 rotate-[24deg]" />
              <div className="absolute left-[43%] top-[42%] h-[3px] w-[26%] bg-[#0A3D3A]/70 rotate-[-12deg]" />
              <div className="absolute left-[64%] top-[48%] h-[3px] w-[20%] bg-[#0A3D3A]/70 rotate-[20deg]" />
            </div>

            <div className="absolute left-4 top-4 bg-white rounded-full border border-[#E0E0E0] px-3 py-2 text-xs text-[#505050] shadow-sm">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#37E49E]" />
                {traffic === "light" ? "Light Traffic" : "Clear"}
              </span>
            </div>

            <div className="absolute right-4 top-4 flex flex-col gap-2">
              <button className="w-9 h-9 rounded-lg bg-white border border-[#E0E0E0] text-[#505050] hover:bg-[#F5F5F5] flex items-center justify-center shadow-sm" aria-label="Zoom in">
                <Plus size={16} />
              </button>
              <button className="w-9 h-9 rounded-lg bg-white border border-[#E0E0E0] text-[#505050] hover:bg-[#F5F5F5] flex items-center justify-center shadow-sm" aria-label="Zoom out">
                <span className="text-lg leading-none">−</span>
              </button>
              <button className="w-9 h-9 rounded-lg bg-white border border-[#E0E0E0] text-[#0A3D3A] hover:bg-[#F5F5F5] flex items-center justify-center shadow-sm" aria-label="Navigate">
                <Navigation size={16} />
              </button>
              <button className="w-9 h-9 rounded-lg bg-white border border-[#E0E0E0] text-[#505050] hover:bg-[#F5F5F5] flex items-center justify-center shadow-sm" aria-label="Share route">
                <Share2 size={16} />
              </button>
            </div>

            {/* Route markers */}
            <div className="absolute left-[16%] top-[65%]">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-[#0A3D3A] shadow-sm flex items-center justify-center text-[#0A3D3A] text-xs font-semibold">
                  1
                </div>
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-[#0A3D3A] text-white text-xs font-medium rounded-md px-3 py-2 whitespace-nowrap shadow-sm">
                  Hightower Solar
                  <span className="block text-[10px] text-white/80 font-normal">09:00 - 10:30</span>
                </div>
              </div>
            </div>
            <div className="absolute left-[42%] top-[35%]">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-[#0A3D3A] shadow-sm flex items-center justify-center text-[#0A3D3A] text-xs font-semibold">
                  2
                </div>
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-[#0A3D3A] text-white text-xs font-medium rounded-md px-3 py-2 whitespace-nowrap shadow-sm">
                  Westfield Wind
                  <span className="block text-[10px] text-white/80 font-normal">12:00 - 13:30</span>
                </div>
              </div>
            </div>
            <div className="absolute right-[14%] top-[52%]">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-[#0A3D3A] shadow-sm flex items-center justify-center text-[#0A3D3A] text-xs font-semibold">
                  3
                </div>
                <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-[#0A3D3A] text-white text-xs font-medium rounded-md px-3 py-2 whitespace-nowrap shadow-sm">
                  Greenfield Solar
                  <span className="block text-[10px] text-white/80 font-normal">15:00 - 16:30</span>
                </div>
              </div>
            </div>
            <div className="absolute left-[8%] top-[72%] text-xs font-medium text-[#242424] bg-white rounded-md px-2 py-1 shadow-sm">
              Start
            </div>
            <div className="absolute right-[6%] top-[66%] text-xs font-medium text-[#242424] bg-white rounded-md px-2 py-1 shadow-sm">
              End
            </div>

            {/* Route Summary */}
            <div className="absolute left-4 bottom-4 w-[260px] max-w-[calc(100%-2rem)] bg-white rounded-xl border border-[#E0E0E0] p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Route size={18} className="text-[#0A3D3A]" />
                <h2 className="font-display font-semibold text-[#242424]">Route Summary</h2>
              </div>
              <div className="space-y-1.5 text-sm text-[#505050]">
                <p>Total Distance: <span className="font-medium text-[#242424]">47.2 miles</span></p>
                <p>Drive Time: <span className="font-medium text-[#242424]">1h 15m</span></p>
                <p>Total Jobs: <span className="font-medium text-[#242424]">3 sites</span></p>
              </div>
              <Button className="w-full mt-4 h-10 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold">
                <Navigation size={15} className="mr-2" />
                Start Route
              </Button>
            </div>
          </div>

          {/* Route List */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display font-semibold text-[#242424]">Today&apos;s Route</h2>
                  <p className="text-xs text-[#989898] mt-0.5">3 jobs scheduled</p>
                </div>
                <Compass size={18} className="text-[#989898]" />
              </div>
              <div className="space-y-3">
                {routeJobs.map((job, index) => (
                  <div key={job.id} className="rounded-lg border border-[#E0E0E0] p-3">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#0A3D3A] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                        {index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-[#242424] text-sm truncate">{job.title}</h3>
                        <div className="grid grid-cols-3 gap-1 mt-2 text-[10px] text-[#989898]">
                          <div>
                            <p>Time</p>
                            <p className="text-[#242424] truncate">{job.time}</p>
                          </div>
                          <div>
                            <p>Region</p>
                            <p className="text-[#242424] truncate">{job.region}</p>
                          </div>
                          <div>
                            <p>Status</p>
                            <p className="text-[#0A3D3A] font-medium truncate">{job.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button className="flex-1 h-9 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-xs font-semibold">
                        <Navigation size={13} className="mr-1.5" />
                        Start Nav
                      </Button>
                      <Button variant="outline" className="flex-1 h-9 border-[#0A3D3A] text-[#0A3D3A] hover:bg-[#E8F6F3] rounded-lg text-xs font-semibold">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full h-11 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold">
              <Zap size={15} className="mr-2" />
              Optimize Route
            </Button>
            <Button variant="outline" className="w-full h-11 border-[#0A3D3A] text-[#0A3D3A] hover:bg-[#E8F6F3] rounded-lg text-sm font-semibold">
              <Download size={15} className="mr-2" />
              Export Route
            </Button>
          </div>
        </div>
      </div>
    </EngineerLayout>
  );
};

export default EngineerRoutePlanner;