import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent, RefObject } from "react";
import {
  Check,
  CheckCircle2,
  FileText,
  Flag,
  Folder,
  Image,
  Thermometer,
  Upload,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EngineerLayout } from "@/components/engineer/EngineerLayout";

const uploadFields = [
  {
    key: "thermal",
    label: "Thermal Imagery",
    required: true,
    icon: Thermometer,
    accept: ".jpg,.jpeg,.png,.tiff",
    supported: "Supported: .jpg, .png, .tiff",
  },
  {
    key: "rgb",
    label: "RGB Visual Photos",
    required: true,
    icon: Image,
    accept: ".jpg,.jpeg,.png",
    supported: "Supported: .jpg, .png",
  },
  {
    key: "video",
    label: "Video Footage",
    required: false,
    icon: Video,
    accept: ".mp4,.mov",
    supported: "Supported: .mp4, .mov",
  },
  {
    key: "log",
    label: "DJI Flight Log / Metadata",
    required: false,
    icon: FileText,
    accept: ".kml,.tlog,.pdf,.zip",
    supported: "Supported: .kml, .tlog, .pdf, .zip",
  },
] as const;

type UploadKey = (typeof uploadFields)[number]["key"];

interface UploadFieldProps {
  field: (typeof uploadFields)[number];
  selectedFiles: File[];
  inputRef: RefObject<HTMLInputElement | null>;
  onSelect: (key: UploadKey, event: ChangeEvent<HTMLInputElement>) => void;
  onDrop: (key: UploadKey, event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
}

const UploadField = ({
  field,
  selectedFiles,
  inputRef,
  onSelect,
  onDrop,
  onDragOver,
}: UploadFieldProps) => {
  const Icon = field.icon;

  return (
    <div>
      <label className="text-sm font-medium text-[#242424] mb-2 block">
        <Icon size={15} className="inline mr-1.5 text-[#0A3D3A]" />
        {field.label}{" "}
        <span className={field.required ? "text-red-500" : "text-[#989898]"}>
          {field.required ? "*Required" : "Optional"}
        </span>
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={(event) => onDrop(field.key, event)}
        onDragOver={onDragOver}
        className="border-2 border-dashed border-[#D3D3D3] rounded-xl h-36 flex flex-col items-center justify-center gap-2 hover:border-[#0A3D3A] transition-colors cursor-pointer"
      >
        <Upload size={24} className="text-[#0A3D3A]" />
        <p className="text-sm text-[#505050]">
          Drag and drop files here or click to browse
        </p>
        <p className="text-xs text-[#989898]">{field.supported}</p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
          accept={field.accept}
          onChange={(event) => onSelect(field.key, event)}
        />
      </div>
      {selectedFiles.length > 0 && (
        <p className="mt-2 text-xs font-medium text-[#0A3D3A] truncate">
          {selectedFiles.length} selected:{" "}
          {selectedFiles.map((file) => file.name).join(", ")}
        </p>
      )}
    </div>
  );
};

const EngineerUploadSurvey = () => {
  const [jobStatus, setJobStatus] = useState("Complete");
  const [internalNotes, setInternalNotes] = useState("");
  const [customerSummary, setCustomerSummary] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<
    Record<UploadKey, File[]>
  >({
    thermal: [],
    rgb: [],
    video: [],
    log: [],
  });

  const fileRefs = {
    thermal: useRef<HTMLInputElement>(null),
    rgb: useRef<HTMLInputElement>(null),
    video: useRef<HTMLInputElement>(null),
    log: useRef<HTMLInputElement>(null),
  };

  const handleSelect = (key: UploadKey, event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles((previous) => ({
      ...previous,
      [key]: files ? Array.from(files) : [],
    }));
    event.target.value = "";
  };

  const handleDrop = (key: UploadKey, event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setSelectedFiles((previous) => ({
      ...previous,
      [key]: Array.from(event.dataTransfer.files),
    }));
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    if (!selectedFiles.thermal.length || !selectedFiles.rgb.length) {
      alert("Please upload thermal imagery and RGB visual photos before submitting.");
      return;
    }

    alert(`Survey submitted with status: ${jobStatus}`);
  };

  return (
    <EngineerLayout
      title="Upload Survey Results"
      subtitle="Upload raw data and set job status"
      backTo="/engineer/job-details"
    >
      <div className="max-w-[800px] mx-auto space-y-4">
        {/* Selected Job */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <Folder size={18} className="text-[#0A3D3A]" />
            <h2 className="font-display text-base font-semibold text-[#242424]">
              Selected Job
            </h2>
          </div>
          <div className="border border-[#E0E0E0] rounded-lg p-4">
            <h3 className="font-semibold text-[#242424]">
              Job #1043 - Hightower Solar Farm
            </h3>
            <p className="text-sm text-[#505050] mt-1">
              Today, 09:00 AM - 10:30 AM
            </p>
            <p className="text-xs text-[#989898] mt-1">North England</p>
          </div>
        </div>

        {/* File Uploads */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <Folder size={18} className="text-[#0A3D3A]" />
            <h2 className="font-display text-base font-semibold text-[#242424]">
              File Uploads
            </h2>
          </div>

          <div className="space-y-5">
            {uploadFields.map((field) => (
              <UploadField
                key={field.key}
                field={field}
                selectedFiles={selectedFiles[field.key]}
                inputRef={fileRefs[field.key]}
                onSelect={handleSelect}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              />
            ))}
          </div>
        </div>

        {/* Job Status */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <CheckCircle2 size={18} className="text-[#0A3D3A]" />
            <h2 className="font-display text-base font-semibold text-[#242424]">
              Job Status <span className="text-red-500">*Required</span>
            </h2>
          </div>
          <div className="space-y-3">
            {["Complete", "Revisit Needed", "Aborted"].map(
              (status, index) => (
                <label
                  key={status}
                  className={`flex items-center gap-3 cursor-pointer py-2 ${
                    index !== 2 ? "border-b border-[#E0E0E0]" : ""
                  }`}
                >
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
              )
            )}
          </div>
        </div>

        {/* Internal Notes */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <Flag size={18} className="text-[#0A3D3A]" />
            <h2 className="font-display text-base font-semibold text-[#242424]">
              Internal Notes (Admin Only)
            </h2>
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
            <h2 className="font-display text-base font-semibold text-[#242424]">
              Customer-Facing Summary (Optional)
            </h2>
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
        <div className="flex justify-end pt-2">
          <Button
            onClick={handleSubmit}
            className="h-11 px-6 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold"
          >
            <Check size={16} className="mr-2" />
            Submit &amp; Mark Complete
          </Button>
        </div>
      </div>
    </EngineerLayout>
  );
};

export default EngineerUploadSurvey;
