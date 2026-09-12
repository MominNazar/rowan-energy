import { useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  Download,
  MapPin,
  MoreHorizontal,
  Navigation,
  Route,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const stops = [
  { code: "A", time: "09:00 - 10:30", job: "#1052", site: "Greenfield Solar Farm", region: "Reading, North England", distance: "0km" },
  { code: "B", time: "11:30 - 13:00", job: "#1050", site: "SolarMax Distribution", region: "Bath, South England", distance: "38km" },
  { code: "C", time: "14:00 - 15:30", job: "#1054", site: "EnergyTech Hub", region: "Swindon, West England", distance: "95km from previous stop" },
];

const AdminRoutePlanner = () => {
  const [engineer, setEngineer] = useState("Alex Khan");
  const [date, setDate] = useState("2025-07-25");

  return (
    <AdminLayout
      header={
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <h1 className="font-display text-lg font-semibold text-[#242424] leading-tight">Engineer Route Planner</h1>
            <p className="text-xs text-[#989898] mt-1">Geographic view of scheduled jobs with optimized routes</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="w-9 h-9 rounded-full bg-[#D1FAE5] text-[#0A3D3A] font-semibold text-sm flex items-center justify-center shrink-0">D</button>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-[#242424]">David</span>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-3 sm:p-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <Input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-10 w-36 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]"
              />
              <Select value={engineer} onValueChange={setEngineer}>
                <SelectTrigger className="h-10 w-36 border-[#E0E0E0] text-sm">
                  <SelectValue placeholder="Select engineer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alex">Alex Khan</SelectItem>
                  <SelectItem value="fatima">Fatima Ahmed</SelectItem>
                  <SelectItem value="owen">Owen Williams</SelectItem>
                  <SelectItem value="sarah">Sarah Mitchell</SelectItem>
                </SelectContent>
              </Select>
              <Select value="all">
                <SelectTrigger className="h-10 w-36 border-[#E0E0E0] text-sm">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">North England</SelectItem>
                  <SelectItem value="south">South England</SelectItem>
                  <SelectItem value="west">West Midlands</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
              <Button className="h-10 px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold gap-2">
                <Navigation size={15} /> Auto Optimize Routes
              </Button>
              <Button variant="outline" className="h-10 px-4 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold gap-2">
                <Download size={15} /> Export Route
              </Button>
              <Button variant="outline" className="h-10 px-4 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold gap-2">
                <CalendarDays size={15} /> Open in Calendar
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5">
          <div className="relative bg-[#F3FFE9] border border-[#DDEFCB] rounded-xl overflow-hidden min-h-[520px]">
            <div className="absolute top-4 left-4 bg-white/95 rounded-lg border border-[#DDEFCB] p-3 shadow-sm space-y-1.5 text-xs">
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#37E49E]" /> Start Point</div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#9CA3AF]" /> Route Stop</div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#0A3D3A]" /> End Point</div>
              <div className="flex items-center gap-2"><span className="w-5 h-0.5 bg-[#0A3D3A]" /> Route Path</div>
            </div>

            <div className="absolute inset-0 opacity-[0.14]">
              <svg viewBox="0 0 800 500" className="w-full h-full" preserveAspectRatio="none">
                <path d="M0,80 C120,120 180,60 300,100 S500,180 620,140 760,180 800,160" fill="none" stroke="#0A3D3A" strokeWidth="2" />
                <path d="M0,240 C140,200 240,280 380,240 S560,180 680,240 760,260 800,240" fill="none" stroke="#0A3D3A" strokeWidth="2" />
                <path d="M0,400 C120,360 260,420 400,380 S600,320 800,380" fill="none" stroke="#0A3D3A" strokeWidth="2" />
                <path d="M160,0 C180,120 140,240 180,360 S200,440 180,500" fill="none" stroke="#0A3D3A" strokeWidth="2" />
                <path d="M400,0 C420,140 380,260 420,380 S440,440 420,500" fill="none" stroke="#0A3D3A" strokeWidth="2" />
                <path d="M640,0 C660,120 620,260 660,380 S680,440 660,500" fill="none" stroke="#0A3D3A" strokeWidth="2" />
              </svg>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-white/70 flex items-center justify-center mb-3">
                  <MapPin size={26} className="text-[#0A3D3A]" />
                </div>
                <p className="font-display font-semibold text-[#0A3D3A] text-sm">Interactive Map View</p>
                <p className="text-xs text-[#505050] mt-1">Route visualization for {engineer} · {date}</p>
              </div>
            </div>

            <div className="absolute left-6 right-6 bottom-6 flex justify-center">
              <div className="bg-white border border-[#FDE68A] rounded-lg p-3 shadow-sm text-xs text-[#92400E] max-w-md">
                <div className="flex gap-2">
                  <AlertTriangle size={15} className="shrink-0" />
                  <span><strong>Route Warning:</strong> Job C is 95km from Job B. Consider reassigning.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#D1FAE5] text-[#0A3D3A] text-xs font-semibold flex items-center justify-center">AK</div>
                <div>
                  <p className="font-display font-semibold text-sm text-[#242424]">{engineer}</p>
                  <p className="text-xs text-[#989898]">North England</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[[ "3", "Total Jobs"], ["96km", "Route Distance"], ["2h 15m", "Drive Time"], ["2", "Regions"]].map(([value, label]) => (
                  <div key={label} className="bg-[#F8F8F8] border border-[#E0E0E0] rounded-lg p-3">
                    <p className="font-display text-lg font-semibold text-[#242424]">{value}</p>
                    <p className="text-[10px] text-[#989898] mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-sm text-[#242424]">Route Stops</h3>
                <span className="text-[10px] text-[#989898]">Drag to reorder</span>
              </div>
              <div className="space-y-2.5">
                {stops.map((stop) => (
                  <div key={stop.job} className="border border-[#E0E0E0] rounded-lg p-3 flex gap-3">
                    <div className="w-7 h-7 shrink-0 rounded-full bg-[#0A3D3A] text-white text-[10px] font-semibold flex items-center justify-center">{stop.code}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-medium text-[#242424]">{stop.time} | {stop.job}</p>
                        <MoreHorizontal size={14} className="text-[#989898] shrink-0" />
                      </div>
                      <p className="text-xs font-medium text-[#242424] mt-1">{stop.site}</p>
                      <p className="text-[10px] text-[#989898] mt-0.5">{stop.region}</p>
                      {stop.distance !== "0km" && (
                        <div className="mt-2 flex items-center gap-1 text-[#DC2626] text-[10px]">
                          <AlertTriangle size={12} />
                          <span>{stop.distance} from previous stop</span>
                        </div>
                      )}
                      <Button variant="outline" size="sm" className="h-7 px-3 mt-2 text-[10px] border-[#D3D3D3] text-[#505050] rounded-md">Open Job</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminRoutePlanner;
