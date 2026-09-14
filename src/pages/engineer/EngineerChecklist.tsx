import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertTriangle,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  FileText,
  FileUp,
  Map,
  Upload,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EngineerLayout } from "@/components/engineer/EngineerLayout";
import { showSuccess } from "@/utils/toast";

const equipmentChecks = [
  "Batteries charged (minimum 85%)",
  "Firmware updated to latest version",
  "SD cards inserted & formatted",
  "Compass & IMU calibrated",
  "Controller linked and responsive",
  "Obstacle sensors functional",
];

const CHECKLIST_STORAGE_KEY = "engineerChecklist";

const EngineerChecklist = () => {
  const { id } = useParams();
  const jobId = id || "1";
  const [aiFilled, setAiFilled] = useState(false);
  const [equipment, setEquipment] = useState([true, true, true, true, false, false]);
  const [riskClassification, setRiskClassification] = useState("");
  const [terrainType, setTerrainType] = useState("");
  const [weatherLevel, setWeatherLevel] = useState("");
  const [nearbyObstructions, setNearbyObstructions] = useState("");
  const [weatherDetails, setWeatherDetails] = useState("");
  const [riskMitigation, setRiskMitigation] = useState("");
  const [safetyChecks, setSafetyChecks] = useState([false, false, false, false]);

  const browseInputRef = useRef<HTMLInputElement>(null);
  const flightPlanRef = useRef<HTMLInputElement>(null);
  const notamRef = useRef<HTMLInputElement>(null);
  const activeUploadLabel = useRef("File");

  const toggleEquipment = (index: number) => {
    setEquipment((prev) => prev.map((item, i) => (i === index ? !item : item)));
  };

  const completedCount = equipment.filter(Boolean).length;
  const progress = Math.round((completedCount / equipment.length) * 100);

  const handleFilePick = (
    ref: React.RefObject<HTMLInputElement | null>,
    label: string
  ) => {
    activeUploadLabel.current = label;
    ref.current?.click();
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      showSuccess(`${activeUploadLabel.current}: ${file.name}`);
    }
    e.target.value = "";
  };

  const handleGetAiHelp = () => {
    setAiFilled(true);
    setRiskClassification("Class G - Uncontrolled");
    setTerrainType("Flat");
    setWeatherLevel("Low");
    setNearbyObstructions(
      "Nearby trees to the east, low voltage lines within 100m, flat terrain overall."
    );
    setWeatherDetails(
      "Light wind (5-10 km/h), clear skies, 15C. No expected rain during survey window."
    );
    setRiskMitigation(
      "Standard PPE required (hi-vis vest, safety helmet). Emergency contact: Site Manager on +44 789 123 456. Alternative landing zone identified 200m south of solar array. Weather monitoring via MetOffice app during flight operations."
    );
    setSafetyChecks([true, true, true, true]);
    showSuccess("AI suggestions applied");
  };

  const handleSaveChecklist = () => {
    const payload = {
      jobId,
      equipment,
      riskClassification,
      terrainType,
      weatherLevel,
      nearbyObstructions,
      weatherDetails,
      riskMitigation,
      safetyChecks,
      aiFilled,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(payload));
    showSuccess("Checklist saved");
  };

  const backJobPath = `/engineer/job-details/${jobId}`;

  return (
    <EngineerLayout
      title="Pre-Survey Checklist - Job #1043"
      subtitle="Site: Hightower Solar Farm · Date: January 23, 2025"
      backTo={backJobPath}
      backLabel="Back to Job Details"
    >
      <input
        ref={browseInputRef}
        type="file"
        className="hidden"
        onChange={onFileSelected}
      />
      <input
        ref={flightPlanRef}
        type="file"
        accept=".pdf,image/*"
        className="hidden"
        onChange={onFileSelected}
      />
      <input
        ref={notamRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={onFileSelected}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-4 lg:gap-6 min-w-0 w-full">
        <div className="space-y-4 lg:space-y-6 min-w-0">
          {/* Progress */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-sm font-medium text-[#242424]">Checklist Progress</span>
              <span className="text-sm font-semibold text-[#0A3D3A] shrink-0">{aiFilled ? "85%" : `${progress}%`} Complete</span>
            </div>
            <div className="h-2 rounded-full bg-[#EAEAEA] overflow-hidden">
              <div
                className="h-full bg-[#0A3D3A] rounded-full transition-all duration-500"
                style={{ width: `${aiFilled ? 85 : progress}%` }}
              />
            </div>
          </div>

          {/* Equipment Pre-Flight Checklist */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#E8F6F3] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={18} className="text-[#0A3D3A]" />
                </div>
                <h2 className="font-display text-base font-semibold text-[#242424] min-w-0 break-words">
                  Equipment Pre-Flight Checklist
                </h2>
              </div>
              <span className="text-xs text-[#989898] shrink-0 pl-11 sm:pl-0">{completedCount}/{equipment.length} completed</span>
            </div>
            <div className="space-y-3">
              {equipmentChecks.map((check, index) => (
                <label key={check} className="flex items-start sm:items-center gap-3 cursor-pointer group min-w-0">
                  <input
                    type="checkbox"
                    checked={equipment[index]}
                    onChange={() => toggleEquipment(index)}
                    className="w-4 h-4 mt-0.5 sm:mt-0 shrink-0 rounded border-[#D3D3D3] accent-[#0A3D3A] cursor-pointer"
                  />
                  <span
                    className={`text-sm min-w-0 break-words ${
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
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#FEF3C7] flex items-center justify-center shrink-0">
                  <AlertTriangle size={18} className="text-[#B45309]" />
                </div>
                <h2 className="font-display text-base font-semibold text-[#242424]">Risk Assessment</h2>
              </div>
              <span className="text-xs text-[#989898] shrink-0 pl-11 sm:pl-0">{aiFilled ? "Filled by AI" : "Complete to continue"}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="min-w-0">
                <label className="text-xs font-medium text-[#505050] block mb-1.5">
                  Airspace Classification
                </label>
                <div className="relative min-w-0">
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
                {aiFilled && <p className="text-[10px] text-[#989898] mt-1 break-words">Class G - Uncontrolled and UK Pilot MAP Zone</p>}
              </div>
              <div className="min-w-0">
                <label className="text-xs font-medium text-[#505050] block mb-1.5">
                  Terrain Type
                </label>
                <div className="relative min-w-0">
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
                {aiFilled && <p className="text-[10px] text-[#989898] mt-1 break-words">Based on terrain analysis using satellite overlays</p>}
              </div>
            </div>

            <div className="mb-4 min-w-0">
              <label className="text-xs font-medium text-[#505050] block mb-1.5">
                Nearby Obstructions
              </label>
              <textarea
                rows={3}
                value={
                  aiFilled && !nearbyObstructions
                    ? "Nearby trees to the east, low voltage lines within 100m, flat terrain overall."
                    : nearbyObstructions
                }
                onChange={(e) => setNearbyObstructions(e.target.value)}
                placeholder="Detail any power lines, towers, trees, etc."
                className="w-full min-w-0 p-3 border border-[#D3D3D3] rounded-lg text-sm text-[#242424] placeholder:text-[#989898] focus-visible:ring-2 focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0 resize-none"
              />
              <div className="flex flex-wrap items-center justify-between gap-1 mt-1">
                <span className="text-[10px] text-[#989898] min-w-0">Based on terrain analysis using satellite overlays</span>
                {aiFilled && <span className="text-[10px] text-[#0A3D3A] font-medium shrink-0">✎ Edit</span>}
              </div>
            </div>

            <div className="mb-4 min-w-0">
              <label className="text-xs font-medium text-[#505050] block mb-1.5">
                Weather Risk Level
              </label>
              <div className="relative min-w-0">
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

            <div className="mb-4 min-w-0">
              <label className="text-xs font-medium text-[#505050] block mb-1.5">
                Weather Details
              </label>
              <textarea
                rows={3}
                value={
                  aiFilled && !weatherDetails
                    ? "Light wind (5-10 km/h), clear skies, 15C. No expected rain during survey window."
                    : weatherDetails
                }
                onChange={(e) => setWeatherDetails(e.target.value)}
                placeholder="Wind speed, visibility, temperature, precipitation"
                className="w-full min-w-0 p-3 border border-[#D3D3D3] rounded-lg text-sm text-[#242424] placeholder:text-[#989898] focus-visible:ring-2 focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0 resize-none"
              />
              {aiFilled && <p className="text-[10px] text-[#989898] mt-1">Suggested by AI Assistant</p>}
            </div>

            <div className="mb-4 min-w-0">
              <label className="text-xs font-medium text-[#505050] block mb-1.5">
                Safety &amp; Compliance Checks
              </label>
              <div className="space-y-2">
                {[
                  "Public Safety Assessed",
                  "Wildlife Check Complete",
                  "Airspace Clearance Obtained",
                  "All Permits Verified",
                ].map((check, index) => (
                  <label key={check} className="flex flex-wrap items-center gap-2 sm:gap-3 cursor-pointer min-w-0">
                    <input
                      type="checkbox"
                      checked={aiFilled || safetyChecks[index]}
                      onChange={() =>
                        setSafetyChecks((prev) =>
                          prev.map((v, i) => (i === index ? !v : v))
                        )
                      }
                      className="w-4 h-4 shrink-0 rounded border-[#D3D3D3] accent-[#0A3D3A] cursor-pointer"
                    />
                    <span className="text-sm text-[#242424] min-w-0 flex-1">{check}</span>
                    {aiFilled && (
                      <span className="text-[10px] font-medium text-[#0A3D3A] bg-[#E8F6F3] px-2 py-0.5 rounded-full shrink-0">
                        AI Confirmed
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div className="min-w-0">
              <label className="text-xs font-medium text-[#505050] block mb-1.5">
                Risk Mitigation Plan
              </label>
              <textarea
                rows={3}
                value={
                  aiFilled && !riskMitigation
                    ? "Standard PPE required (hi-vis vest, safety helmet). Emergency contact: Site Manager on +44 789 123 456. Alternative landing zone identified 200m south of solar array. Weather monitoring via MetOffice app during flight operations."
                    : riskMitigation
                }
                onChange={(e) => setRiskMitigation(e.target.value)}
                placeholder="Describe emergency procedures, fallback plans, PPE, etc."
                className="w-full min-w-0 p-3 border border-[#D3D3D3] rounded-lg text-sm text-[#242424] placeholder:text-[#989898] focus-visible:ring-2 focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0 resize-none"
              />
              {aiFilled && <p className="text-[10px] text-[#989898] mt-1">Generated by AI Assistant</p>}
            </div>
          </div>

          {/* Required Uploads */}
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#EAEAEA] flex items-center justify-center shrink-0">
                <Upload size={18} className="text-[#0A3D3A]" />
              </div>
              <h2 className="font-display text-base font-semibold text-[#242424]">Required Uploads</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {(
                [
                  ["Flight Plan", "PDF/Google Maps", FileText],
                  ["Weather Screenshots", "PNG/JPG Files", FileUp],
                  ["Airspace Clearance/NOTAM", "Screenshot Files", Map],
                  ["Permits", "PDF/Other Files", FileText],
                ] as const
              ).map(([label, desc, Icon]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleFilePick(browseInputRef, label)}
                  className="rounded-xl border-2 border-dashed border-[#D3D3D3] bg-white p-4 sm:p-5 flex flex-col items-center justify-center gap-2 hover:border-[#0A3D3A] transition-colors min-w-0 w-full"
                >
                  <Icon size={22} className="text-[#0A3D3A]" />
                  <span className="font-medium text-sm text-[#242424] text-center break-words">{label}</span>
                  <span className="text-[10px] text-[#989898]">{desc}</span>
                  <span className="text-xs font-medium text-[#0A3D3A]">Browse Files</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 min-w-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveChecklist}
              className="h-auto min-h-11 py-2.5 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold w-full whitespace-normal"
            >
              <FileText size={15} className="mr-2 shrink-0" />
              Save Checklist &amp; Risk Assessment
            </Button>
            <Link to={`/engineer/upload/${jobId}`} className="w-full min-w-0">
              <Button className="h-auto min-h-11 py-2.5 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold w-full whitespace-normal">
                <Check size={15} className="mr-2 shrink-0" />
                Mark Pre-Survey Complete
              </Button>
            </Link>
          </div>
        </div>

        {/* AI Assistant */}
        <div className="space-y-4 min-w-0">
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 min-w-0">
            <div className="flex items-start sm:items-center gap-2.5 mb-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#E8F6F3] flex items-center justify-center shrink-0">
                <Bot size={18} className="text-[#0A3D3A]" />
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-base font-semibold text-[#242424]">AI Flight Assistant</h2>
                <p className="text-xs text-[#989898] mt-0.5 break-words">Ask about weather, hazards, airspace, or compliance</p>
              </div>
            </div>
            <Button
              className="w-full h-10 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold"
              onClick={() => {
                setAiFilled(true);
                showSuccess("AI suggestions ready");
              }}
            >
              Ask AI
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleGetAiHelp}
              className="w-full h-10 mt-2 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold"
            >
              Get AI Help
            </Button>
            <div className="mt-5">
              <p className="text-xs font-medium text-[#242424] mb-2">Upload Shortcuts</p>
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleFilePick(flightPlanRef, "Flight Plan")}
                  className="w-full h-10 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold"
                >
                  <FileText size={15} className="mr-2 shrink-0" />
                  Flight Plan Upload
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleFilePick(notamRef, "NOTAM Screenshot")}
                  className="w-full h-10 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold"
                >
                  <FileUp size={15} className="mr-2 shrink-0" />
                  NOTAM Screenshot
                </Button>
              </div>
            </div>
            <div className="mt-4 bg-[#E8F6F3] rounded-lg p-3 flex gap-2 min-w-0">
              <Zap size={15} className="text-[#0A3D3A] shrink-0 mt-0.5" />
              <p className="text-xs text-[#242424] leading-relaxed min-w-0 break-words">Use AI to help you understand your airspace, forecast, or identify site risks</p>
            </div>
          </div>
        </div>
      </div>
    </EngineerLayout>
  );
};

export default EngineerChecklist;
