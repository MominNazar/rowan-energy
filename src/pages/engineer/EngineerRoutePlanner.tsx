import {
  ChevronLeft,
  ChevronRight,
  Download,
  Flag,
  Layers,
  MapPin,
  Minus,
  Navigation,
  Play,
  Plus,
  Route,
  Sun,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EngineerLayout } from "@/components/engineer/EngineerLayout";

const routeJobs = [
  {
    id: "1",
    letter: "A",
    title: "Hightower Solar Farm",
    time: "09:00 - 10:30",
    region: "North England",
    status: "Scheduled",
  },
  {
    id: "2",
    letter: "B",
    title: "Westfield Wind Farm",
    time: "12:00 - 13:30",
    region: "North England",
    status: "Scheduled",
  },
  {
    id: "3",
    letter: "C",
    title: "Greenfield Solar",
    time: "15:00 - 16:30",
    region: "South England",
    status: "Scheduled",
  },
];

const EngineerRoutePlanner = () => {
  return (
    <EngineerLayout title="My Route Planner" subtitle="Optimize your daily travel route">
      <div className="space-y-3 sm:space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Date Navigation */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 border-[#E0E0E0] bg-white text-[#505050] hover:bg-[#F5F5F5] shrink-0"
              aria-label="Previous day"
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="outline"
              className="h-9 px-3 border-[#E0E0E0] bg-white text-[#242424] hover:bg-[#F5F5F5] rounded-lg text-sm font-medium whitespace-nowrap"
            >
              Today - January 22, 2025
            </Button>
            <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-[#E0E0E0] bg-white text-[#505050] hover:bg-[#F5F5F5] shrink-0"
                          aria-label="Next day"
                        >
                          <ChevronRight size={16} />
                        </Button>
                        <Select defaultValue="daily">
                          <SelectTrigger className="h-9 rounded-lg border-[#E0E0E0] bg-white text-sm text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#0A3D3A] pr-6 w-auto">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="w-[calc(100%-1rem)] max-w-[calc(100vw-2rem)]">
                              <SelectItem value="daily">Daily View</SelectItem>
                              <SelectItem value="weekly">Weekly View</SelectItem>
                            </SelectContent>
                        </Select>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
                      <Select defaultValue="all-regions">
                        <SelectTrigger className="h-9 rounded-lg border-[#E0E0E0] bg-white text-sm text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#0A3D3A] pr-6 w-auto">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="w-[calc(100%-1rem)] max-w-[calc(100vw-2rem)]">
                            <SelectItem value="all-regions">All Regions</SelectItem>
                            <SelectItem value="north-england">North England</SelectItem>
                            <SelectItem value="south-england">South England</SelectItem>
                          </SelectContent>
                      </Select>
                      <Select defaultValue="all-status">
                        <SelectTrigger className="h-9 rounded-lg border-[#E0E0E0] bg-white text-sm text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#0A3D3A] pr-6 w-auto">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="w-[calc(100%-1rem)] max-w-[calc(100vw-2rem)]">
                            <SelectItem value="all-status">All Status</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                      </Select>
                    </div>
        </div>

        {/* Map + Route List */}
        <div className="flex flex-col xl:flex-row gap-4">
          {/* Map Panel */}
          <div className="relative flex-1 min-h-[420px] xl:min-h-[520px] rounded-xl overflow-hidden border border-[#E0E0E0] bg-[#E9F9DC]">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-70">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(10,61,58,0.08)_1px,transparent_0)] bg-[size:28px_28px]" />
            </div>

            {/* Route line SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 10 75 Q 20 55 25 35 Q 35 25 50 42 Q 60 50 70 52 Q 78 60 85 72"
                fill="none"
                stroke="#0A3D3A"
                strokeWidth="0.3"
                strokeDasharray="1,1"
                opacity="0.6"
              />
            </svg>

            {/* Traffic Toggle */}
            <div className="absolute left-3 top-3 flex gap-2 z-10">
              <span className="inline-flex items-center gap-1.5 bg-white rounded-full border border-[#E0E0E0] px-3 py-1.5 text-xs text-[#505050] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#37E49E]" />
                Light Traffic
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white rounded-full border border-[#E0E0E0] px-3 py-1.5 text-xs text-[#505050] shadow-sm">
                <Sun size={13} />
                Clear
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="absolute right-3 top-3 flex flex-col gap-2 z-10">
              <button
                className="w-9 h-9 rounded-lg bg-white border border-[#E0E0E0] text-[#505050] hover:bg-[#F5F5F5] flex items-center justify-center shadow-sm"
                aria-label="Zoom in"
              >
                <Plus size={16} />
              </button>
              <button
                className="w-9 h-9 rounded-lg bg-white border border-[#E0E0E0] text-[#505050] hover:bg-[#F5F5F5] flex items-center justify-center shadow-sm"
                aria-label="Zoom out"
              >
                <Minus size={16} />
              </button>
              <button
                className="w-9 h-9 rounded-lg bg-white border border-[#E0E0E0] text-[#0A3D3A] hover:bg-[#F5F5F5] flex items-center justify-center shadow-sm"
                aria-label="Navigate"
              >
                <Navigation size={16} />
              </button>
              <button
                className="w-9 h-9 rounded-lg bg-white border border-[#E0E0E0] text-[#505050] hover:bg-[#F5F5F5] flex items-center justify-center shadow-sm"
                aria-label="Layers"
              >
                <Layers size={16} />
              </button>
            </div>

            {/* Start Marker */}
            <div className="absolute left-3 bottom-[18%] sm:bottom-[18%] z-10">
              <div className="flex items-center gap-1 bg-white rounded-md px-2 py-1 shadow-sm border border-[#E0E0E0]">
                <Play size={10} className="text-[#242424] fill-[#242424]" />
                <span className="text-xs font-medium text-[#242424]">Start</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#242424] mt-1 ml-1" />
            </div>

            {/* End Marker */}
            <div className="absolute right-3 bottom-[18%] sm:bottom-[18%] z-10">
              <div className="flex items-center gap-1 bg-white rounded-md px-2 py-1 shadow-sm border border-[#E0E0E0]">
                <Flag size={10} className="text-[#242424]" />
                <span className="text-xs font-medium text-[#242424]">End</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#242424] mt-1 ml-1" />
            </div>

            {/* Job Marker 1 - Hightower Solar */}
            <div className="absolute left-[18%] top-[28%] sm:left-[20%] sm:top-[30%] z-10">
              <div className="bg-[#0A3D3A] text-white text-xs font-medium rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                    1
                  </span>
                  <span>Hightower Solar</span>
                </div>
                <div className="text-[10px] text-white/70 font-normal mt-0.5 pl-7">
                  09:00 - 10:30
                </div>
              </div>
            </div>

            {/* Job Marker 2 - Westfield Wind */}
            <div className="absolute left-[42%] top-[38%] sm:left-[45%] sm:top-[40%] z-10">
              <div className="bg-[#0A3D3A] text-white text-xs font-medium rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                    2
                  </span>
                  <span>Westfield Wind</span>
                </div>
                <div className="text-[10px] text-white/70 font-normal mt-0.5 pl-7">
                  12:00 - 13:30
                </div>
              </div>
            </div>

            {/* Job Marker 3 - Greenfield Solar */}
            <div className="absolute right-[14%] top-[46%] sm:right-[18%] sm:top-[48%] z-10">
              <div className="bg-[#0A3D3A] text-white text-xs font-medium rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                    3
                  </span>
                  <span>Greenfield Solar</span>
                </div>
                <div className="text-[10px] text-white/70 font-normal mt-0.5 pl-7">
                  15:00 - 16:30
                </div>
              </div>
            </div>

            {/* Route Summary */}
            <div className="absolute left-3 bottom-3 w-[220px] max-w-[calc(100%-1.5rem)] bg-white rounded-xl border border-[#E0E0E0] p-4 shadow-sm z-10">
              <div className="flex items-center gap-2 mb-3">
                <Route size={18} className="text-[#0A3D3A]" />
                <h2 className="font-display font-semibold text-[#242424]">Route Summary</h2>
              </div>
              <div className="space-y-1.5 text-sm text-[#505050]">
                <p>
                  Total Distance:{" "}
                  <span className="font-medium text-[#242424]">47.2 miles</span>
                </p>
                <p>
                  Drive Time:{" "}
                  <span className="font-medium text-[#242424]">1h 15m</span>
                </p>
                <p>
                  Total Jobs:{" "}
                  <span className="font-medium text-[#242424]">3 sites</span>
                </p>
              </div>
              <Button className="w-full mt-4 h-10 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold">
                <Play size={14} className="mr-2 fill-white" />
                Start Route
              </Button>
            </div>
          </div>

          {/* Route List */}
          <div className="w-full xl:w-[340px] shrink-0 space-y-4">
            {/* Today's Route Card */}
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display font-semibold text-[#242424]">Today&apos;s Route</h2>
                  <p className="text-xs text-[#989898] mt-0.5">3 jobs scheduled</p>
                </div>
              </div>
              <div className="space-y-3">
                {routeJobs.map((job) => (
                  <div key={job.id} className="rounded-lg border border-[#E0E0E0] p-3">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#0A3D3A] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                        {job.letter}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="font-medium text-[#242424] text-sm truncate">
                            {job.title}
                          </h3>
                          <MapPin size={13} className="text-[#989898] shrink-0" />
                        </div>
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

            {/* Action Buttons */}
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
