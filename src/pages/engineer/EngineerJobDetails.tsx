import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  Calendar,
  Check,
  Clock,
  FileText,
  MapPin,
  Menu,
  Navigation,
  PenLine,
  Settings,
  Shield,
  User,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EngineerLayout } from "@/components/engineer/EngineerLayout";

const EngineerJobDetails = () => {
  const [notes, setNotes] = useState("");

  return (
    <EngineerLayout
      title="Job #1043 - Hightower Solar Farm"
      subtitle="Assigned Date: January 23, 2025"
      backTo="/engineer/dashboard"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-4 lg:gap-6">
        <div className="space-y-4 lg:space-y-6">
          {/* Site Information */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <MapPin size={18} className="text-[#0A3D3A]" />
              <h2 className="font-display text-base font-semibold text-[#242424]">
                Site Information
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <p className="text-xs text-[#989898] mb-1">Site Name</p>
                <p className="font-medium text-[#242424]">Hightower Solar Farm</p>
              </div>
              <div>
                <p className="text-xs text-[#989898] mb-1">Region</p>
                <p className="font-medium text-[#242424]">North England</p>
              </div>
              <div>
                <p className="text-xs text-[#989898] mb-1">Full Address</p>
                <p className="font-medium text-[#242424]">Grange Lane, Manchester M34 7TF</p>
              </div>
              <div>
                <p className="text-xs text-[#989898] mb-1">GPS</p>
                <p className="font-medium text-[#242424]">53.4808 N, 2.2426 W</p>
              </div>
            </div>
          </div>

          {/* Timing & Duration */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <Clock size={18} className="text-[#0A3D3A]" />
              <h2 className="font-display text-base font-semibold text-[#242424]">
                Timing &amp; Duration
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-[#989898] mb-1">Start Time</p>
                <p className="font-medium text-[#242424]">09:00 AM</p>
              </div>
              <div>
                <p className="text-xs text-[#989898] mb-1">End Time</p>
                <p className="font-medium text-[#242424]">10:30 AM</p>
              </div>
              <div>
                <p className="text-xs text-[#989898] mb-1">Survey Duration</p>
                <p className="font-medium text-[#242424]">30-45 mins</p>
              </div>
              <div>
                <p className="text-xs text-[#989898] mb-1">Buffer Time</p>
                <p className="font-medium text-[#242424]">45 mins</p>
              </div>
            </div>
          </div>

          {/* Site Contact */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <User size={18} className="text-[#0A3D3A]" />
              <h2 className="font-display text-base font-semibold text-[#242424]">
                Site Contact
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <p className="text-xs text-[#989898] mb-1">Name &amp; Role</p>
                <p className="font-medium text-[#242424]">Sarah Daniels</p>
                <p className="text-xs text-[#989898]">Site Technician</p>
              </div>
              <div>
                <p className="text-xs text-[#989898] mb-1">Contact Details</p>
                <p className="font-medium text-[#242424]">+44 789 123 456</p>
                <p className="text-xs text-[#989898]">sarah@company.com</p>
              </div>
            </div>
          </div>

          {/* Access Instructions */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <Shield size={18} className="text-[#0A3D3A]" />
              <h2 className="font-display text-base font-semibold text-[#242424]">
                Access Instructions
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm mb-4">
              <div>
                <p className="text-xs text-[#989898] mb-1">Site Gated</p>
                <p className="font-medium text-[#242424]">Yes</p>
              </div>
              <div>
                <p className="text-xs text-[#989898] mb-1">Gate Code</p>
                <p className="font-medium text-[#242424]">4321#</p>
              </div>
            </div>
            <h3 className="text-sm font-medium text-[#242424] mb-2">Safety Requirements</h3>
            <ul className="list-disc pl-5 text-sm text-[#505050] space-y-1">
              <li>PPE required (hi-vis + helmet)</li>
              <li>Site induction briefing at check-in</li>
            </ul>
          </div>

          {/* Survey Overview */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <FileText size={18} className="text-[#0A3D3A]" />
              <h2 className="font-display text-base font-semibold text-[#242424]">
                Survey Overview
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm mb-4">
              <div>
                <p className="text-xs text-[#989898] mb-1">Asset Type</p>
                <p className="font-medium text-[#242424]">Solar</p>
              </div>
              <div>
                <p className="text-xs text-[#989898] mb-1">System Size</p>
                <p className="font-medium text-[#242424]">4.2 MW</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-[#989898] mb-1">Purpose</p>
                <p className="font-medium text-[#242424]">Maintenance + Compliance</p>
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
        <div className="space-y-4 lg:space-y-6">
          {/* Location */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <MapPin size={18} className="text-[#0A3D3A]" />
              <h2 className="font-display text-base font-semibold text-[#242424]">Location</h2>
            </div>
            <div className="h-48 sm:h-56 rounded-lg bg-[#EAEAEA] border border-[#E0E0E0] mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(10,61,58,0.08)_1px,transparent_0)] bg-[size:20px_20px]" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 rounded-full bg-[#0A3D3A] border-2 border-white shadow-md" />
                <div className="absolute left-full ml-1 top-1/2 -translate-y-1/2 bg-[#0A3D3A] text-white text-xs font-medium rounded-md px-2 py-1 whitespace-nowrap shadow-sm">
                  Hightower Solar
                </div>
              </div>
            </div>
            <Button className="w-full h-11 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold">
              <Navigation size={15} className="mr-2" />
              Start Navigation
            </Button>
          </div>

          {/* Status & Alerts */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <Shield size={18} className="text-[#0A3D3A]" />
              <h2 className="font-display text-base font-semibold text-[#242424]">Status &amp; Alerts</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: "Pre-Checklist", status: "Pending", color: "bg-[#FEF3C7] text-[#92400E]" },
                { label: "Survey Upload", status: "Not Started", color: "bg-[#EAEAEA] text-[#505050]" },
                { label: "Analysis", status: "Awaiting", color: "bg-[#EAEAEA] text-[#505050]" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-[#E0E0E0] last:border-0">
                  <span className="text-sm font-medium text-[#242424]">{item.label}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.color}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <Zap size={18} className="text-[#0A3D3A]" />
              <h2 className="font-display text-base font-semibold text-[#242424]">Quick Actions</h2>
            </div>
            <div className="space-y-3">
              <Button className="w-full h-11 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold">
                <Check size={15} className="mr-2" />
                Begin Pre-Survey Checklist
              </Button>
              <Button variant="outline" className="w-full h-11 border-[#0A3D3A] text-[#0A3D3A] hover:bg-[#E8F6F3] rounded-lg text-sm font-semibold">
                <Calendar size={15} className="mr-2" />
                Add to Calendar
              </Button>
              <Button variant="outline" className="w-full h-11 border-[#0A3D3A] text-[#0A3D3A] hover:bg-[#E8F6F3] rounded-lg text-sm font-semibold">
                <Settings size={15} className="mr-2" />
                Attach Photos
              </Button>
            </div>
          </div>

          {/* Personal Notes */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <PenLine size={18} className="text-[#0A3D3A]" />
              <h2 className="font-display text-base font-semibold text-[#242424]">Personal Notes</h2>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add your personal notes about this job..."
              className="w-full p-3 border border-[#D3D3D3] rounded-lg text-sm text-[#242424] placeholder:text-[#989898] focus-visible:ring-2 focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0 resize-none"
            />
            <Button className="mt-3 h-10 px-5 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold">
              Save Notes
            </Button>
          </div>
        </div>
      </div>
    </EngineerLayout>
  );
};

export default EngineerJobDetails;