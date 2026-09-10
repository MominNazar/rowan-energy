import { useState } from "react";
import {
  Phone,
  MessageSquare,
  PenLine,
  X,
  MapPin,
  Calendar,
  Lock,
  User,
  Target,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SurveyProLayout } from "@/components/layout/SurveyProLayout";

const assetTypes = [
  { label: "Solar", desc: "Solar panels & farms", value: "solar" },
  { label: "Wind", desc: "Wind turbines", value: "wind" },
  { label: "Other", desc: "Custom asset type", value: "other" },
];

const purposes = [
  "Maintenance",
  "Insurance",
  "Fault Diagnosis",
  "Compliance",
  "Assessment",
  "Other",
];

const CustomerBook = () => {
  const [assetType, setAssetType] = useState("solar");
  const [siteAccess, setSiteAccess] = useState("gated");
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([
    "Maintenance",
    "Insurance",
  ]);
  const [showForm, setShowForm] = useState(true);

  const togglePurpose = (p: string) => {
    setSelectedPurposes((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  return (
    <SurveyProLayout
      title="Book a Survey"
      subtitle="Choose a convenient way to schedule your drone survey. You can call, chat, or fill the form."
    >
      {/* Booking Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6">
        {/* Call Us */}
        <div className="flex flex-col bg-white rounded-xl border border-[#D3D3D3] p-5 sm:p-6">
          <div className="w-10 h-10 rounded-lg bg-[#EAEAEA] flex items-center justify-center mb-4">
            <Phone size={20} className="text-[#083F3C]" />
          </div>
          <h3 className="font-display text-base font-semibold text-[#242424] mb-1">
            Call Us
          </h3>
          <p className="mb-4 min-h-[72px] text-sm text-[#505050] leading-relaxed">
            Prefer to speak directly? Call our AI booking agent for instant assistance.
          </p>
          <div className="h-[78px] bg-[#EAEAEA] rounded-lg p-3 mb-4">
            <p className="font-semibold text-[#242424] text-sm">+44 123 456 7890</p>
            <p className="text-xs text-[#989898] mt-0.5">Available 24/7 for instant booking</p>
          </div>
          <Button className="mt-auto w-full h-10 bg-[#083F3C] hover:bg-[#083F3C]/90 text-white rounded-lg text-sm font-semibold">
            <Phone size={15} className="mr-2" />
            Call Now
          </Button>
        </div>

        {/* Chat Assistant */}
        <div className="flex flex-col bg-white rounded-xl border border-[#D3D3D3] p-5 sm:p-6">
          <div className="w-10 h-10 rounded-lg bg-[#EAEAEA] flex items-center justify-center mb-4">
            <MessageSquare size={20} className="text-[#083F3C]" />
          </div>
          <h3 className="font-display text-base font-semibold text-[#242424] mb-1">
            Chat Assistant
          </h3>
          <p className="mb-4 min-h-[72px] text-sm text-[#505050] leading-relaxed">
            Use our intelligent chatbot to book your survey in under a minute with guided questions.
          </p>
          <div className="h-[78px] bg-[#EAEAEA] rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#37E49E]" />
              <span className="font-semibold text-[#242424] text-sm">Online now</span>
            </div>
            <p className="text-xs text-[#989898]">Quick & interactive booking</p>
          </div>
          <Button className="mt-auto w-full h-10 bg-[#083F3C] hover:bg-[#083F3C]/90 text-white rounded-lg text-sm font-semibold">
            <MessageSquare size={15} className="mr-2" />
            Start Chat
          </Button>
        </div>

        {/* Manual Form */}
        <div className="flex flex-col bg-white rounded-xl border border-[#D3D3D3] p-5 sm:p-6">
          <div className="w-10 h-10 rounded-lg bg-[#EAEAEA] flex items-center justify-center mb-4">
            <PenLine size={20} className="text-[#083F3C]" />
          </div>
          <h3 className="font-display text-base font-semibold text-[#242424] mb-1">
            Manual Form
          </h3>
          <p className="mb-4 min-h-[72px] text-sm text-[#505050] leading-relaxed">
            Fill in detailed survey requirements yourself with our comprehensive booking form.
          </p>
          <div className="h-[78px] bg-[#EAEAEA] rounded-lg p-3 mb-4">
            <p className="font-semibold text-[#242424] text-sm">Complete control</p>
            <p className="text-xs text-[#989898] mt-0.5">Detailed specifications & notes</p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="mt-auto w-full h-10 bg-[#083F3C] hover:bg-[#083F3C]/90 text-white rounded-lg text-sm font-semibold"
          >
            <PenLine size={15} className="mr-2" />
            Fill Form
          </Button>
        </div>
      </div>

      {/* Survey Booking Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-[#D3D3D3] p-5 sm:p-6 lg:p-8">
          {/* Form Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#242424]">
                Survey Booking Form
              </h2>
              <p className="text-sm text-[#505050] mt-1">
                Please fill in all required details for your drone survey
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="p-1.5 text-[#989898] hover:text-[#242424] hover:bg-[#EAEAEA] rounded-md transition-colors shrink-0"
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Type of Asset */}
            <div>
              <Label className="text-sm font-semibold text-[#242424] mb-3 block">
                Type of Asset <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {assetTypes.map(({ label, desc, value }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAssetType(value)}
                    className={`text-left rounded-lg border p-4 transition-colors ${
                      assetType === value
                        ? "border-[#083F3C] bg-[#F0FDF9]"
                        : "border-[#D3D3D3] bg-white hover:border-[#989898]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          assetType === value
                            ? "border-[#083F3C]"
                            : "border-[#D3D3D3]"
                        }`}
                      >
                        {assetType === value && (
                          <div className="w-2 h-2 rounded-full bg-[#083F3C]" />
                        )}
                      </div>
                      <span className="font-semibold text-sm text-[#242424]">
                        {label}
                      </span>
                    </div>
                    <p className="text-xs text-[#989898] ml-6">{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Site Information */}
            <div>
              <Label className="text-sm font-semibold text-[#242424] mb-3 block">
                <MapPin size={14} className="inline mr-1" /> Site Information{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-xs text-[#505050] font-medium">Site Name</span>
                  <Input
                    placeholder="Enter site name"
                    className="h-11 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C]"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-[#505050] font-medium">System Size</span>
                  <Input
                    placeholder="e.g., 5MW or 100 panels"
                    className="h-11 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C]"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-[#242424]">
                <MapPin size={14} className="inline mr-1" /> Location{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Address or GPS coordinates"
                className="h-11 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C]"
              />
            </div>

            {/* Survey Scheduling */}
            <div>
              <Label className="text-sm font-semibold text-[#242424] mb-3 block">
                <Calendar size={14} className="inline mr-1" /> Survey Scheduling{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="space-y-2">
                <span className="text-xs text-[#505050] font-medium">Preferred Date</span>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Input
                      type="date"
                      className="h-11 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C] w-full"
                    />
                  </div>
                  <button
                    type="button"
                    className="h-11 px-4 border border-[#D3D3D3] rounded-lg text-sm text-[#505050] hover:bg-[#EAEAEA] transition-colors whitespace-nowrap"
                  >
                    I'm flexible with timing
                  </button>
                </div>
              </div>
            </div>

            {/* Site Access */}
            <div>
              <Label className="text-sm font-semibold text-[#242424] mb-3 block">
                <Lock size={14} className="inline mr-1" /> Site Access
              </Label>
              <div className="flex flex-col sm:flex-row gap-4 mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="siteAccess"
                    checked={siteAccess === "gated"}
                    onChange={() => setSiteAccess("gated")}
                    className="w-4 h-4 accent-[#083F3C]"
                  />
                  <span className="text-sm text-[#242424]">Site is gated</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="siteAccess"
                    checked={siteAccess === "open"}
                    onChange={() => setSiteAccess("open")}
                    className="w-4 h-4 accent-[#083F3C]"
                  />
                  <span className="text-sm text-[#242424]">Open access</span>
                </label>
              </div>
              <Input
                placeholder="Gate code or access instructions (if applicable)"
                className="h-11 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C]"
              />
            </div>

            {/* On-Site Contact */}
            <div>
              <Label className="text-sm font-semibold text-[#242424] mb-3 block">
                <User size={14} className="inline mr-1" /> On-Site Contact{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <span className="text-xs text-[#505050] font-medium">Contact Name</span>
                  <Input
                    placeholder="Full name"
                    className="h-11 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C]"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-[#505050] font-medium">Phone Number</span>
                  <Input
                    placeholder="+44 123 456 7890"
                    className="h-11 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C]"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-[#505050] font-medium">Role</span>
                  <Input
                    placeholder="Site manager, etc."
                    className="h-11 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C]"
                  />
                </div>
              </div>
            </div>

            {/* Purpose of Survey */}
            <div>
              <Label className="text-sm font-semibold text-[#242424] mb-3 block">
                <Target size={14} className="inline mr-1" /> Purpose of Survey{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {purposes.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePurpose(p)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border text-sm transition-colors ${
                      selectedPurposes.includes(p)
                        ? "border-[#083F3C] bg-[#F0FDF9] text-[#242424]"
                        : "border-[#D3D3D3] bg-white text-[#242424] hover:border-[#989898]"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        selectedPurposes.includes(p)
                          ? "border-[#083F3C] bg-[#083F3C]"
                          : "border-[#D3D3D3]"
                      }`}
                    >
                      {selectedPurposes.includes(p) && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-[#242424]">
                <FileText size={14} className="inline mr-1" /> Additional Information
              </Label>
              <textarea
                rows={4}
                placeholder="PPE requirements, safety induction, special access instructions, or any other important details..."
                className="w-full h-auto min-h-[100px] p-3 border border-[#D3D3D3] rounded-lg text-sm text-[#242424] placeholder:text-[#989898] focus-visible:ring-2 focus-visible:ring-[#083F3C] focus-visible:ring-offset-0 resize-none"
              />
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#D3D3D3]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                className="h-11 px-6 border-[#D3D3D3] text-[#505050] hover:bg-[#EAEAEA] rounded-lg text-sm font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-11 px-6 bg-[#083F3C] hover:bg-[#083F3C]/90 text-white rounded-lg text-sm font-semibold"
              >
                <Calendar size={15} className="mr-2" />
                Submit Booking Request
              </Button>
            </div>
          </form>
        </div>
      )}
    </SurveyProLayout>
  );
};

export default CustomerBook;