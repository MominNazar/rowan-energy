import { useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Calendar,
  Check,
  Clock,
  FileText,
  MapPin,
  Navigation,
  PenLine,
  Settings,
  Shield,
  User,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EngineerLayout } from "@/components/engineer/EngineerLayout";
import { showSuccess } from "@/utils/toast";

const mockJobs: Record<
  string,
  {
    id: string;
    jobNumber: string;
    title: string;
    assignedDate: string;
    region: string;
    address: string;
    gps: string;
    startTime: string;
    endTime: string;
    duration: string;
    buffer: string;
    contactName: string;
    contactRole: string;
    contactPhone: string;
    contactEmail: string;
    gated: string;
    gateCode: string;
    assetType: string;
    systemSize: string;
    purpose: string;
    mapLabel: string;
  }
> = {
  "1": {
    id: "1",
    jobNumber: "1043",
    title: "Hightower Solar Farm",
    assignedDate: "January 23, 2025",
    region: "North England",
    address: "Grange Lane, Manchester M34 7TF",
    gps: "53.4808 N, 2.2426 W",
    startTime: "09:00 AM",
    endTime: "10:30 AM",
    duration: "30-45 mins",
    buffer: "45 mins",
    contactName: "Sarah Daniels",
    contactRole: "Site Technician",
    contactPhone: "+44 789 123 456",
    contactEmail: "sarah@company.com",
    gated: "Yes",
    gateCode: "4321#",
    assetType: "Solar",
    systemSize: "4.2 MW",
    purpose: "Maintenance + Compliance",
    mapLabel: "Hightower Solar",
  },
  "2": {
    id: "2",
    jobNumber: "1044",
    title: "Westfield Wind Farm",
    assignedDate: "January 23, 2025",
    region: "North England",
    address: "Farm Road, Leeds LS15 8GB",
    gps: "53.8008 N, 1.5491 W",
    startTime: "02:00 PM",
    endTime: "03:30 PM",
    duration: "40-55 mins",
    buffer: "30 mins",
    contactName: "James Porter",
    contactRole: "Site Manager",
    contactPhone: "+44 770 555 221",
    contactEmail: "james@westfield.co.uk",
    gated: "Yes",
    gateCode: "7788#",
    assetType: "Wind",
    systemSize: "12 MW",
    purpose: "Routine Inspection",
    mapLabel: "Westfield Wind",
  },
  "3": {
    id: "3",
    jobNumber: "1045",
    title: "Greenfield Solar",
    assignedDate: "January 24, 2025",
    region: "North England",
    address: "Meadow Lane, York YO10 5DD",
    gps: "53.9591 N, 1.0815 W",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    duration: "35-50 mins",
    buffer: "40 mins",
    contactName: "Emma Clarke",
    contactRole: "Operations Lead",
    contactPhone: "+44 755 441 902",
    contactEmail: "emma@greenfield.energy",
    gated: "No",
    gateCode: "N/A",
    assetType: "Solar",
    systemSize: "2.8 MW",
    purpose: "Compliance Audit",
    mapLabel: "Greenfield Solar",
  },
  "4": {
    id: "4",
    jobNumber: "1046",
    title: "Hillside Wind",
    assignedDate: "January 24, 2025",
    region: "South England",
    address: "Ridge Way, Brighton BN1 4GH",
    gps: "50.8225 N, 0.1372 W",
    startTime: "08:30 AM",
    endTime: "10:00 AM",
    duration: "45-60 mins",
    buffer: "35 mins",
    contactName: "Tom Hughes",
    contactRole: "Site Engineer",
    contactPhone: "+44 712 334 887",
    contactEmail: "tom@hillside.wind",
    gated: "Yes",
    gateCode: "9911#",
    assetType: "Wind",
    systemSize: "8.5 MW",
    purpose: "Blade Inspection",
    mapLabel: "Hillside Wind",
  },
  "5": {
    id: "5",
    jobNumber: "1047",
    title: "Coastal Solar",
    assignedDate: "January 25, 2025",
    region: "West England",
    address: "Harbour Road, Bristol BS1 5TR",
    gps: "51.4545 N, 2.5879 W",
    startTime: "11:00 AM",
    endTime: "12:30 PM",
    duration: "30-40 mins",
    buffer: "45 mins",
    contactName: "Lisa Morgan",
    contactRole: "Facility Contact",
    contactPhone: "+44 798 112 440",
    contactEmail: "lisa@coastal.solar",
    gated: "Yes",
    gateCode: "2468#",
    assetType: "Solar",
    systemSize: "3.1 MW",
    purpose: "Thermal Survey",
    mapLabel: "Coastal Solar",
  },
};

const defaultJob = mockJobs["1"];

const EngineerJobDetails = () => {
  const { id } = useParams();
  const job = useMemo(() => (id && mockJobs[id] ? mockJobs[id] : defaultJob), [id]);
  const [notes, setNotes] = useState("");
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handleStartNavigation = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      job.address
    )}`;
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
    showSuccess(`Opening maps for ${job.title}`);
  };

  const handleAttachPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      showSuccess(`Attached photo: ${file.name}`);
    }
    e.target.value = "";
  };

  return (
    <EngineerLayout
      title={`Job #${job.jobNumber} - ${job.title}`}
      subtitle={`Assigned Date: ${job.assignedDate}`}
      backTo="/engineer/dashboard"
      backLabel="Back to Dashboard"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-4 lg:gap-6 min-w-0 w-full">
        <div className="space-y-4 lg:space-y-6 min-w-0">
          {/* Site Information */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 min-w-0">
            <div className="flex items-center gap-2.5 mb-5">
              <MapPin size={18} className="text-[#0A3D3A] shrink-0" />
              <h2 className="font-display text-base font-semibold text-[#242424]">
                Site Information
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-1">Site Name</p>
                <p className="font-medium text-[#242424] break-words">{job.title}</p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-1">Region</p>
                <p className="font-medium text-[#242424] break-words">{job.region}</p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-1">Full Address</p>
                <p className="font-medium text-[#242424] break-words">{job.address}</p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-1">GPS</p>
                <p className="font-medium text-[#242424] break-words">{job.gps}</p>
              </div>
            </div>
          </div>

          {/* Timing & Duration */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 min-w-0">
            <div className="flex items-center gap-2.5 mb-5">
              <Clock size={18} className="text-[#0A3D3A] shrink-0" />
              <h2 className="font-display text-base font-semibold text-[#242424]">
                Timing &amp; Duration
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-1">Start Time</p>
                <p className="font-medium text-[#242424] break-words">{job.startTime}</p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-1">End Time</p>
                <p className="font-medium text-[#242424] break-words">{job.endTime}</p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-1">Survey Duration</p>
                <p className="font-medium text-[#242424] break-words">{job.duration}</p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-1">Buffer Time</p>
                <p className="font-medium text-[#242424] break-words">{job.buffer}</p>
              </div>
            </div>
          </div>

          {/* Site Contact */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 min-w-0">
            <div className="flex items-center gap-2.5 mb-5">
              <User size={18} className="text-[#0A3D3A] shrink-0" />
              <h2 className="font-display text-base font-semibold text-[#242424]">
                Site Contact
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-1">Name &amp; Role</p>
                <p className="font-medium text-[#242424] break-words">{job.contactName}</p>
                <p className="text-xs text-[#989898] break-words">{job.contactRole}</p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-1">Contact Details</p>
                <p className="font-medium text-[#242424] break-words">{job.contactPhone}</p>
                <p className="text-xs text-[#989898] break-all">{job.contactEmail}</p>
              </div>
            </div>
          </div>

          {/* Access Instructions */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 min-w-0">
            <div className="flex items-center gap-2.5 mb-5">
              <Shield size={18} className="text-[#0A3D3A] shrink-0" />
              <h2 className="font-display text-base font-semibold text-[#242424]">
                Access Instructions
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm mb-4">
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-1">Site Gated</p>
                <p className="font-medium text-[#242424]">{job.gated}</p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-1">Gate Code</p>
                <p className="font-medium text-[#242424]">{job.gateCode}</p>
              </div>
            </div>
            <h3 className="text-sm font-medium text-[#242424] mb-2">Safety Requirements</h3>
            <ul className="list-disc pl-5 text-sm text-[#505050] space-y-1">
              <li>PPE required (hi-vis + helmet)</li>
              <li>Site induction briefing at check-in</li>
            </ul>
          </div>

          {/* Survey Overview */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 min-w-0">
            <div className="flex items-center gap-2.5 mb-5">
              <FileText size={18} className="text-[#0A3D3A] shrink-0" />
              <h2 className="font-display text-base font-semibold text-[#242424]">
                Survey Overview
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm mb-4">
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-1">Asset Type</p>
                <p className="font-medium text-[#242424]">{job.assetType}</p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#989898] mb-1">System Size</p>
                <p className="font-medium text-[#242424]">{job.systemSize}</p>
              </div>
              <div className="sm:col-span-2 min-w-0">
                <p className="text-xs text-[#989898] mb-1">Purpose</p>
                <p className="font-medium text-[#242424] break-words">{job.purpose}</p>
              </div>
            </div>
            <h3 className="text-sm font-medium text-[#242424] mb-2">Additional Notes</h3>
            <ul className="list-disc pl-5 text-sm text-[#505050] space-y-1">
              <li>Site has partial vegetation cover</li>
              <li>Last inspection was 6 months ago</li>
              <li>Avoid tracking through panel rows</li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 lg:space-y-6 min-w-0">
          {/* Location */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 min-w-0">
            <div className="flex items-center gap-2.5 mb-4">
              <MapPin size={18} className="text-[#0A3D3A] shrink-0" />
              <h2 className="font-display text-base font-semibold text-[#242424]">Location</h2>
            </div>
            <div className="h-48 sm:h-56 rounded-lg bg-[#EAEAEA] border border-[#E0E0E0] mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(10,61,58,0.08)_1px,transparent_0)] bg-[size:20px_20px]" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 rounded-full bg-[#0A3D3A] border-2 border-white shadow-md" />
                <div className="absolute left-full ml-1 top-1/2 -translate-y-1/2 bg-[#0A3D3A] text-white text-xs font-medium rounded-md px-2 py-1 whitespace-nowrap shadow-sm max-w-[9rem] truncate">
                  {job.mapLabel}
                </div>
              </div>
            </div>
            <Button
              type="button"
              onClick={handleStartNavigation}
              className="w-full h-11 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold"
            >
              <Navigation size={15} className="mr-2 shrink-0" />
              Start Navigation
            </Button>
          </div>

          {/* Status & Alerts */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 min-w-0">
            <div className="flex items-center gap-2.5 mb-4">
              <Shield size={18} className="text-[#0A3D3A] shrink-0" />
              <h2 className="font-display text-base font-semibold text-[#242424]">Status &amp; Alerts</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: "Pre-Checklist", status: "Pending", color: "bg-[#FEF3C7] text-[#92400E]" },
                { label: "Survey Upload", status: "Not Started", color: "bg-[#EAEAEA] text-[#505050]" },
                { label: "Analysis", status: "Awaiting", color: "bg-[#EAEAEA] text-[#505050]" },
              ].map((item) => (
                <div key={item.label} className="flex flex-wrap items-center justify-between gap-2 py-2 border-b border-[#E0E0E0] last:border-0">
                  <span className="text-sm font-medium text-[#242424]">{item.label}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${item.color}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 min-w-0">
            <div className="flex items-center gap-2.5 mb-4">
              <Zap size={18} className="text-[#0A3D3A] shrink-0" />
              <h2 className="font-display text-base font-semibold text-[#242424]">Quick Actions</h2>
            </div>
            <div className="space-y-3">
              <Link to={`/engineer/checklist/${job.id}`} className="w-full block">
                <Button className="w-full h-11 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold whitespace-normal">
                  <Check size={15} className="mr-2 shrink-0" />
                  Begin Pre-Survey Checklist
                </Button>
              </Link>
              <Button
                type="button"
                variant="outline"
                onClick={() => showSuccess("Added to calendar (demo)")}
                className="w-full h-11 border-[#0A3D3A] text-[#0A3D3A] hover:bg-[#E8F6F3] rounded-lg text-sm font-semibold"
              >
                <Calendar size={15} className="mr-2 shrink-0" />
                Add to Calendar
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => photoInputRef.current?.click()}
                className="w-full h-11 border-[#0A3D3A] text-[#0A3D3A] hover:bg-[#E8F6F3] rounded-lg text-sm font-semibold"
              >
                <Settings size={15} className="mr-2 shrink-0" />
                Attach Photos
              </Button>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAttachPhotos}
              />
            </div>
          </div>

          {/* Personal Notes */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-6 min-w-0">
            <div className="flex items-center gap-2.5 mb-4">
              <PenLine size={18} className="text-[#0A3D3A] shrink-0" />
              <h2 className="font-display text-base font-semibold text-[#242424]">Personal Notes</h2>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add your personal notes about this job..."
              className="w-full min-w-0 p-3 border border-[#D3D3D3] rounded-lg text-sm text-[#242424] placeholder:text-[#989898] focus-visible:ring-2 focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0 resize-none"
            />
            <Button
              type="button"
              onClick={() => showSuccess("Notes saved")}
              className="mt-3 h-10 w-full sm:w-auto px-5 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold"
            >
              Save Notes
            </Button>
          </div>
        </div>
      </div>
    </EngineerLayout>
  );
};

export default EngineerJobDetails;
