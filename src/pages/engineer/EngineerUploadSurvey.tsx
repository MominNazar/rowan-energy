import { useState } from "react";
import { ArrowLeft, CheckCircle2, FileText, Image, Video, CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EngineerLayout } from "@/components/engineer/EngineerLayout";

const EngineerUploadSurvey = () => {
  const [jobStatus, setJobStatus] = useState("Complete");
  const [internalNotes, setInternalNotes] = useState("");
  const [customerSummary, setCustomerSummary] = useState("");

  return (
    <EngineerLayout
      title="Upload Survey Results"
      subtitle="Upload raw data and set job status"
      backTo="/engineer/job-details"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Selected Job */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <FileText size={18} className="text-[#0A3D3A]" />
            <h2 className="font-display text-base font-semibold text-[#242424]">Selected Job</h2>
          </div>
          <div className="border border-[#E0E0E0] rounded-lg p-4">
            <h3 className="font-semibold text-[#242424]">Job #1043 - Hightower Solar Farm</h3>
            <p className="text-sm text-[#505050] mt-1">Today, 09:00 AM - 10:30 AM</p>
            <p className="text-xs text-[#989898] mt-1">North England</p>
          </div>
        </div>

        {/* File Uploads */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <CloudUpload size={18} className="text-[#0A3D3A]" />
            <h2 className="font-display text-base font-semibold text-[#242424]">File Uploads</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-[#242424] mb-2 block">
                Thermal Imagery <span className="text-red-500">*Required</span>
              </label>
              <div className="border-2 border-dashed border-[#D3D3D3] rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:border-[#0A3D3A] transition-colors cursor-pointer">
                <CloudUpload size={24} className="text-[#0A3D3A]" />
                <p className="text-sm text-[#505050]">Drag and drop files here or click to browse</p>
                <p className="text-xs text-[#989898]">Supported: .jpg, .png, .tiff</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[#242424] mb-2 block">
                RGB Visual Photos <span className="text-red-500">*Required</span>
              </label>
              <div className="border-2 border-dashed border-[#D3D3D3] rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:border-[#0A3D3A] transition-colors cursor-pointer">
                <Image size={24} className="text-[#0A3D3A]" />
                <p className="text-sm text-[#505050]">Drag and drop files here or click to browse</p>
                <p className="text-xs text-[#989898]">Supported: .jpg, .png</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[#242424] mb-2 block">
                Video Footage <span className="text-[#989898]">Optional</span>
              </label>
              <div className="border-2 border-dashed border-[#D3D3D3] rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:border-[#0A3D3A] transition-colors cursor-pointer">
                <Video size={24} className="text-[#0A3D3A]" />
                <p className="text-sm text-[#505050]">Drag and drop files here or click to browse</p>
                <p className="text-xs text-[#989898]">Supported: .mp4, .mov</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[#242424] mb-2 block">
                DJI Flight Log / Metadata <span className="text-[#989898]">Optional</span>
              </label>
              <div className="border-2 border-dashed border-[#D3D3D3] rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:border-[#0A3D3A] transition-colors cursor-pointer">
                <FileText size={24} className="text-[#0A3D3A]" />
                <p className="text-sm text-[#505050]">Drag and drop files here or click to browse</p>
                <p className="text-xs text-[#989898]">Supported: .kml, .tlog, .pdf, .zip</p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Status */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <CheckCircle2 size={18} className="text-[#0A3D3A]" />
            <h2 className="font-display text-base font-semibold text-[#242424]">Job Status <span className="text-red-500">*Required</span></h2>
          </div>
          <div className="space-y-3">
            {["Complete", "Revisit Needed", "Aborted"].map((status) => (
              <label key={status} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="jobStatus"
                  value={status}
                  checked={jobStatus === status}
                  onChange={() => setJobStatus(status)}
                  className="w-4 h-4 accent-[#0A3D3A] cursor-pointer"
                />
                <span className="text-sm text-[#242424]">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Internal Notes */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <FileText size={18} className="text-[#0A3D3A]" />
            <h2 className="font-display text-base font-semibold text-[#242424]">Internal Notes (Admin Only)</h2>
          </div>
          <textarea
            value={internalNotes}
            onChange={(e) => setInternalNotes(e.target.value)}
            rows={4}
            placeholder="Add internal notes for admin team (not visible to customers)..."
            className="w-full p-3 border border-[#D3D3D3] rounded-lg text-sm text-[#242424] placeholder:text-[#989898] focus-visible:ring-2 focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0 resize-none"
          />
        </div>

        {/* Customer-Facing Summary */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <FileText size={18} className="text-[#0A3D3A]" />
            <h2 className="font-display text-base font-semibold text-[#242424]">Customer-Facing Summary (Optional)</h2>
          </div>
          <textarea
            value={customerSummary}
            onChange={(e) => setCustomerSummary(e.target.value)}
            rows={4}
            placeholder="Brief summary for customer (e.g., 'Survey completed successfully. No major obstructions.')"
            className="w-full p-3 border border-[#D3D3D3] rounded-lg text-sm text-[#242424] placeholder:text-[#989898] focus-visible:ring-2 focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0 resize-none"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button className="h-11 px-6 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold">
            <CheckCircle2 size={16} className="mr-2" />
            Submit &amp; Mark Complete
          </Button>
        </div>
      </div>
    </EngineerLayout>
  );
};

export default EngineerUploadSurvey;