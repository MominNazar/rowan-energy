import { useState } from "react";
import {
  AlertTriangle,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  FileText,
  FileUp,
  Map,
  Shield,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EngineerLayout } from "@/components/engineer/EngineerLayout";

const equipmentChecks = [
  "Batteries charged (minimum 85%)",
  "Firmware updated to latest version",
  "SD cards inserted & formatted",
  "Compass & IMU calibrated",
  "Controller linked and responsive",
  "Obstacle sensors functional",
];

const EngineerChecklist = () => {
  const [aiFilled, setAiFilled] = useState(false);
  const [equipment, setEquipment] = useState([true, true, true, true, false, false]);
  const [riskClassification, setRiskClassification] = useState("");
  const [terrainType, setTerrainType] = useState("");
  const [weatherLevel, setWeatherLevel] = useState("");

  const toggleEquipment = (index: number) => {
    setEquipment((prev) => prev.map((item, i) => (i === index ? !item : item)));
  };

  const completedCount = equipment.filter(Boolean).length;
  const progress = Math.round((completedCount / equipment.length) * 100);

  return (
    <EngineerLayout
      title="Pre-Survey Checklist - Job #1043"
      subtitle="Site: Hightower Solar Farm · Date: January 23, 2025"
      backTo="/engineer/job-details"
    >
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-4 lg:gap-6">
        <div className="space-y-4 lg:space-y-6">
          {/* Progress */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-[#242424]">Checklist Progress</span>
              <span className="text-sm font-semibold text-[#0A3D3A]">{aiFilled ? "85%" : `${progress}%`} Complete</span>
            </div>
            <div className="h-2 rounded-full bg-[#EAEAEA] overflow-hidden">
              <div
                className="h-full bg-[#0A3D3A] rounded-full transition-all duration-500"
                style={{ width: `${aiFilled ? 85 : progress}%` }}
              />
            </div>
          </div>

          {/* Equipment Pre-Flight Checklist */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#E8F6F3] flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-[#0A3D3A]" />
                </div>
                <h2 className="font-display text-base font-semibold text-[#242424]">
                  Equipment Pre-Flight Checklist
                </h2>
              </div>
              <span className="text-xs text-[#989898]">{completedCount}/{equipment.length} completed</span>
            </div>
            <div className="space-y-3">
              {equipmentChecks.map((check, index) => (
                <label key={check} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={equipment[index]}
                    onChange={() => toggleEquipment(index)}
                    className="w-4 h-4 rounded border-[#D3D3D3] accent-[#0A3D3A] cursor-pointer"
                  />
                  <span
                    className={`text-sm ${
                      equipment[index] ? "text-[#242424]" : "text-[#989898]"
                    } group-hover:text-[#505050] transition-colors`}
                  >
                    {check}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#FEF3C7] flex items-center justify-center">
                  <AlertTriangle size={18} className="text-[#B45309]" />
                </div>
                <h2 className="font-display text-base font-semibold text-[#242424]">Risk Assessment</h2>
              </div>
              <span className="text-xs text-[#989898]">{aiFilled ? "Filled by AI" : "Complete to continue"}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-medium text-[#505050] block mb-1.5">
                  Airspace Classification
                </label>
                <div className="relative">
                  <select
                    value={riskClassification}
                    onChange={(e) => setRiskClassification(e.target.value)}
                    className="w-full h-10 appearance-none rounded-lg border border-[#D3D3D3] bg-white pl-3 pr-8 text-sm text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#0A3D3A] cursor-pointer"
                  >
                    <option value="">Select classification</option>
                    <option value="Class G - Uncontrolled">Class G - Uncontrolled</option>
                    <option value="Class B - Controlled">Class B - Controlled</option>
                    <option value="Class C - Controlled">Class C - Controlled</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#989898] pointer-events-none" />
                </div>
                {aiFilled && <p className="text-[10px] text-[#989898] mt-1">Class G - Uncontrolled and UK Pilot MAP Zone</p>}
              </div>
              <div>
                <label className="text-xs font-medium text-[#505050] block mb-1.5">
                  Terrain Type
                </label>
                <div className="relative">
                  <select
                    value={terrainType}
                    onChange={(e) => setTerrainType(e.target.value)}
                    className="w-full h-10 appearance-none rounded-lg border border-[#D3D3D3] bg-white pl-3 pr-8 text-sm text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#0A3D3A] cursor-pointer"
                  >
                    <option value="">Select terrain</option>
                    <option value="Flat">Flat</option>
                    <option value="Urban">Urban</option>
                    <option value="Coastal">Coastal</option>
                    <option value="Forest">Forest</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#989898] pointer-events-none" />
                </div>
                {aiFilled && <p className="text-[10px] text-[#989898] mt-1">Based on terrain analysis using satellite overlays</p>}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-medium text-[#505050] block mb-1.5">
                Nearby Obstructions
              </label>
              <textarea
                rows={3}
                value={aiFilled ? "Nearby trees to the east, low voltage lines within 100m, flat terrain overall." : ""}
                onChange={(e) => !aiFilled && setRiskClassification(e.target.value)}
                placeholder="Detail any power lines, towers, trees, etc."
                className="w-full p-3 border border-[#D3D3D3] rounded-lg text-sm text-[#242424] placeholder:text-[#989898] focus-visible:ring-2 focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0 resize-none"
              />
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-[#989898]">Based on terrain analysis using satellite overlays</span>
                {aiFilled && <span className="text-[10px] text-[#0A3D3A] font-medium">✎ Edit</span>}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-medium text-[#505050] block mb-1.5">
                Weather Risk Level
              </label>
              <div className="relative">
                <select
                  value={weatherLevel}
                  onChange={(e) => setWeatherLevel(e.target.value)}
                  className="w-full h-10 appearance-none rounded-lg border border-[#D3D3D3] bg-white pl-3 pr-8 text-sm text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#0A3D3A] cursor-pointer"
                >
                  <option value="">Select risk level</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#989898] pointer-events-none" />
              </div>
              {aiFilled && <p className="text-[10px] text-[#989898] mt-1">Based on forecast</p>}
            </div>

            <div className="mb-4">
              <label className="text-xs font-medium text-[#505050] block mb-1.5">
                Weather Details
              </label>
              <textarea
                rows={3}
                value={aiFilled ? "Light wind (5-10 km/h), clear skies, 15C. No expected rain during survey window." : ""}
                onChange={(e) => !aiFilled && setWeatherLevel(e.target.value)}
                placeholder="Wind speed, visibility, temperature, precipitation"
                className="w-full p-3 border border-[#D3D3D3] rounded-lg text-sm text-[#242424] placeholder:text-[#989898] focus-visible:ring-2 focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0 resize-none"
              />
              {aiFilled && <p className="text-[10px] text-[#989898] mt-1">Suggested by AI Assistant</p>}
            </div>

            <div className="mb-4">
              <label className="text-xs font-medium text-[#505050] block mb-1.5">
                Safety &amp; Compliance Checks
              </label>
              <div className="space-y-2">
                {[
                  "Public Safety Assessed",
                  "Wildlife Check Complete",
                  "Airspace Clearance Obtained",
                  "All Permits Verified",
                ].map((check) => (
                  <label key={check} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiFilled}
                      readOnly
                      className="w-4 h-4 rounded border-[#D3D3D3] accent-[#0A3D3A] cursor-pointer"
                    />
                    <span className="text-sm text-[#242424]">{check}</span>
                    {aiFilled && (
                      <span className="ml-auto text-[10px] font-medium text-[#0A3D3A] bg-[#E8F6F3] px-2 py-0.5 rounded-full">
                        AI Confirmed
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#505050] block mb-1.5">
                Risk Mitigation Plan
              </label>
              <textarea
                rows={3}
                value={aiFilled ? "Standard PPE required (hi-vis vest, safety helmet). Emergency contact: Site Manager on +44 789 123 456. Alternative landing zone identified 200m south of solar array. Weather monitoring via MetOffice app during flight operations." : ""}
                onChange={(e) => !aiFilled && setWeatherLevel(e.target.value)}
                placeholder="Describe emergency procedures, fallback plans, PPE, etc."
                className="w-full p-3 border border-[#D3D3D3] rounded-lg text-sm text-[#242424] placeholder:text-[#989898] focus-visible:ring-2 focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0 resize-none"
              />
              {aiFilled && <p className="text-[10px] text-[#989898] mt-1">Generated by AI Assistant</p>}
            </div>
          </div>

          {/* Required Uploads */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#EAEAEA] flex items-center justify-center">
                <Upload size={18} className="text-[#0A3D3A]" />
              </div>
              <h2 className="font-display text-base font-semibold text-[#242424]">Required Uploads</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {([
                ["Flight Plan", "PDF/Google Maps", FileText],
                ["Weather Screenshots", "PNG/JPG Files", FileUp],
                ["Airspace Clearance/NOTAM", "Screenshot Files", Map],
                ["Permits", "PDF/Other Files", FileText],
              ] as const).map(([label, desc, Icon]) => (
                <button key={label} type="button" className="rounded-xl border-2 border-dashed border-[#D3D3D3] bg-white p-5 flex flex-col items-center justify-center gap-2 hover:border-[#0A3D3A] transition-colors">
                  <Icon size={22} className="text-[#0A3D3A]" />
                  <span className="font-medium text-sm text-[#242424]">{label}</span>
                  <span className="text-[10px] text-[#989898]">{desc}</span>
                  <span className="text-xs font-medium text-[#0A3D3A]">Browse Files</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Assistant */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-lg bg-[#E8F6F3] flex items-center justify-center">
                <Bot size={18} className="text-[#0A3D3A]" />
              </div>
              <div>
                <h2 className="font-display text-base font-semibold text-[#242424]">AI Flight Assistant</h2>
                <p className="text-xs text-[#989898] mt-0.5">Ask about weather, hazards, airspace, or compliance</p>
              </div>
            </div>
            <Button className="w-full h-10 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold" onClick={() => setAiFilled(true)}>
              Ask AI
            </Button>
            <Button variant="outline" className="w-full h-10 mt-2 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold">
              Get AI Help
            </Button>
            <div className="mt-5">
              <p className="text-xs font-medium text-[#242424] mb-2">Upload Shortcuts</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full h-10 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold">
                  <FileText size={15} className="mr-2" />
                  Flight Plan Upload
                </Button>
                <Button variant="outline" className="w-full h-10 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold">
                  <FileUp size={15} className="mr-2" />
                  NOTAM Screenshot
                </Button>
              </div>
            </div>
            <div className="mt-4 bg-[#E8F6F3] rounded-lg p-3 flex gap-2">
              <Zap size={15} className="text-[#0A3D3A] shrink-0 mt-0.5" />
              <p className="text-xs text-[#242424] leading-relaxed">Use AI to help you understand your airspace, forecast, or identify site risks</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
        <Button variant="outline" className="h-10 px-4 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold">
          Save Checklist &amp; Risk Assessment
        </Button>
        <Button className="h-10 px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold">
          <Check size={15} className="mr-2" />
          Mark Pre-Survey Complete
        </Button>
      </div>
    </EngineerLayout>
  );
};

export default EngineerChecklist;