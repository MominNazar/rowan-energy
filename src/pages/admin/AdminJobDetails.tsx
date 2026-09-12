import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertTriangle,
  Calendar,
  ChevronDown,
  ChevronLeft,
  Check,
  Clock,
  Download,
  FileText,
  MapPin,
  Settings,
  Upload,
  User,
  X,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { jobs } from "@/data/adminJobs";

const AdminJobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const job = jobs.find((j) => j.id.replace("#", "") === id) ?? jobs[0];
  const [showModal, setShowModal] = useState(false);
  const [newEngineer, setNewEngineer] = useState("");
  const [note, setNote] = useState("");

  return (
    <AdminLayout
      header={
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <Link to="/admin/jobs" className="inline-flex items-center gap-1 text-xs font-medium text-[#0A3D3A] hover:underline mb-1.5">
              <ChevronLeft size={14} className="shrink-0" /> Back to Jobs
            </Link>
            <h1 className="font-display text-lg font-semibold text-[#242424] leading-tight">Job {job.id} - &quot;{job.site}&quot;</h1>
            <p className="text-xs text-[#989898] mt-1">Survey job details and management</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <Button className="h-9 px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-xs font-semibold">
              <Download size={14} className="mr-1.5 shrink-0" />
              Download Report
            </Button>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full bg-[#D1FAE5] text-[#0A3D3A] font-semibold text-sm flex items-center justify-center shrink-0">D</button>
              <span className="text-sm font-medium text-[#242424]">David</span>
              <ChevronDown size={14} className="text-[#989898] shrink-0" />
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-5">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
            <h2 className="font-display text-sm font-semibold text-[#242424] mb-4 flex items-center gap-2"><MapPin size={16} /> Site Information</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-[#989898]">Site Name</p>
                <p className="font-medium text-[#242424]">{job.site}</p>
              </div>
              <div>
                <p className="text-xs text-[#989898]">Customer</p>
                <p className="font-medium text-[#242424]">{job.customer}</p>
              </div>
              <div>
                <p className="text-xs text-[#989898]">Address</p>
                <p className="font-medium text-[#242424]">{job.address}</p>
              </div>
              <div>
                <p className="text-xs text-[#989898]">Region</p>
                <p className="font-medium text-[#242424]">{job.region}</p>
              </div>
            </div>
            <div className="mt-4 h-40 bg-[#EAEAEA] rounded-lg flex flex-col items-center justify-center text-[#989898] text-xs gap-2">
              <MapPin size={24} />
              <span>Map Preview</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
            <h2 className="font-display text-sm font-semibold text-[#242424] mb-4 flex items-center gap-2"><User size={16} /> Engineer Assignment</h2>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-[#D1FAE5] text-[#0A3D3A] font-semibold flex items-center justify-center shrink-0">{job.engineerInitials}</div>
              <div>
                <p className="font-medium text-[#242424]">{job.engineer}</p>
                <p className="text-xs text-[#989898]">{job.engineerRole}</p>
                <div className="mt-2 space-y-1 text-xs text-[#505050]">
                  <p>{job.engineerEmail}</p>
                  <p>{job.engineerPhone}</p>
                  <p className="text-[#989898]">Preferred Regions: {job.preferredRegions}</p>
                </div>
              </div>
            </div>
            <Button
              className="h-9 mt-4 px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-xs font-semibold"
              onClick={() => setShowModal(true)}
            >
              <User size={14} className="mr-1.5" /> Change Engineer
            </Button>
          </div>

          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
            <h2 className="font-display text-sm font-semibold text-[#242424] mb-4 flex items-center gap-2"><Calendar size={16} /> Schedule</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs text-[#989898]">Scheduled Date & Time</p>
                <p className="font-medium text-[#242424]">{job.scheduledDate}</p>
              </div>
              <div>
                <p className="text-xs text-[#989898]">Duration</p>
                <p className="font-medium text-[#242424]">{job.duration}</p>
              </div>
              <div>
                <p className="text-xs text-[#989898]">Buffer Time</p>
                <p className="font-medium text-[#242424]">{job.bufferTime}</p>
              </div>
              {job.status === "Revisit Needed" && (
                <div className="flex items-center justify-between pt-2 border-t border-[#E0E0E0]">
                  <AlertTriangle size={16} className="text-[#EF4444]" />
                  <span className="text-xs font-medium text-[#EF4444]">Revisit Needed</span>
                </div>
              )}
            </div>
            <Button className="h-9 mt-4 px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-xs font-semibold">
              <Calendar size={14} className="mr-1.5" /> Reschedule Job
            </Button>
          </div>

          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
            <h2 className="font-display text-sm font-semibold text-[#242424] mb-4 flex items-center gap-2"><FileText size={16} /> Survey Information</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-xs text-[#989898]">Asset Type</p><p className="font-medium text-[#242424]">{job.assetType}</p></div>
              <div><p className="text-xs text-[#989898]">System Size</p><p className="font-medium text-[#242424]">{job.systemSize}</p></div>
              <div><p className="text-xs text-[#989898]">Purpose</p><p className="font-medium text-[#242424]">{job.purpose}</p></div>
              <div><p className="text-xs text-[#989898]">Job Source</p><p className="font-medium text-[#242424]">{job.jobSource}</p></div>
              <div><p className="text-xs text-[#989898]">Linked Lead</p><p className="text-[#0A3D3A] font-medium cursor-pointer hover:underline">{job.linkedLead}</p></div>
              <div><p className="text-xs text-[#989898]">Special Requirements</p><p className="font-medium text-[#242424]">{job.specialRequirements}</p></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
          <h2 className="font-display text-sm font-semibold text-[#242424] mb-4 flex items-center gap-2"><Upload size={16} /> Upload Status & Files</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {job.files.map((file) => (
              <div key={file.name} className="border border-[#E0E0E0] rounded-lg p-4">
                <p className="font-medium text-[#242424] text-sm">{file.name}</p>
                <p className={`text-xs mt-1 flex items-center gap-1 ${file.status === "Pending" ? "text-[#92400E]" : "text-[#EF4444]"}`}>
                  {file.status === "Pending" ? <Clock size={12} /> : <span>×</span>}
                  {file.status}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button className="h-9 px-3 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-xs font-semibold"><Download size={14} className="mr-1.5 shrink-0" /> Download All Files</Button>
            <Button variant="outline" className="h-9 px-3 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-xs font-semibold"><Upload size={14} className="mr-1.5 shrink-0" /> Request Upload</Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
          <h2 className="font-display text-sm font-semibold text-[#242424] mb-4 flex items-center gap-2"><Settings size={16} /> Status Management</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-medium text-[#242424]">Current Status</Label>
              <Select defaultValue={job.status.toLowerCase().replace(" ", "")}>
                <SelectTrigger className="h-10 mt-1">
                  <SelectValue placeholder="Scheduled" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="inprogress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-medium text-[#242424]">Reason (if needed)</Label>
              <Input placeholder="Enter reason for status change..." className="h-10 mt-1 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]" />
            </div>
          </div>
          <Button className="h-9 mt-4 px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-xs font-semibold">Update Status</Button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl border border-[#E0E0E0] w-full max-w-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#E0E0E0]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#E8F6F3] flex items-center justify-center">
                  <User size={14} className="text-[#0A3D3A]" />
                </div>
                <h3 className="font-display text-sm font-semibold text-[#242424]">Change Engineer for Job {job.id}</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-[#989898] hover:text-[#242424] p-1">
                <X size={16} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-[#F5F5F5] rounded-lg p-3 space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-[#989898] shrink-0" />
                  <span className="text-[#505050]">Site:</span>
                  <span className="font-medium text-[#242424]">{job.site}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={12} className="text-[#989898] shrink-0" />
                  <span className="text-[#505050]">Scheduled:</span>
                  <span className="font-medium text-[#242424]">{job.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-[#989898] shrink-0" />
                  <span className="text-[#505050]">Region:</span>
                  <span className="font-medium text-[#242424]">{job.region}</span>
                </div>
              </div>
              <div>
                <Label className="text-xs font-medium text-[#242424]">Select New Engineer</Label>
                <Select value={newEngineer} onValueChange={setNewEngineer}>
                  <SelectTrigger className="h-10 mt-1">
                    <SelectValue placeholder="Choose available engineer..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alex">Alex Khan</SelectItem>
                    <SelectItem value="fatima">Fatima Ahmed</SelectItem>
                    <SelectItem value="owen">Owen Williams</SelectItem>
                    <SelectItem value="sarah">Sarah Mitchell</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="border border-[#E0E0E0] rounded-lg p-3 space-y-2 text-xs">
                <p className="font-medium text-[#242424]">Availability Summary</p>
                <div className="flex justify-between items-center"><span className="text-[#505050]">Time Free?</span><span className="text-[#0A3D3A] font-medium flex items-center gap-1"><Check size={12} /> Yes</span></div>
                <div className="flex justify-between items-center"><span className="text-[#505050]">Other jobs that day:</span><span className="font-medium text-[#242424]">2</span></div>
                <div className="flex justify-between items-center"><span className="text-[#505050]">Regions matched:</span><span className="text-[#0A3D3A] font-medium flex items-center gap-1"><Check size={12} /> Yes</span></div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <FileText size={12} className="text-[#989898]" />
                  <Label className="text-xs font-medium text-[#242424]">Optional Note (reason for reassignment)</Label>
                </div>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g., Alex unavailable - reassigning to Fatima"
                  rows={3}
                  className="border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-[#E0E0E0]">
              <Button variant="outline" onClick={() => setShowModal(false)} className="h-10 px-4 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold">Cancel</Button>
              <Button onClick={() => setShowModal(false)} className="h-10 px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold">Confirm Change</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminJobDetails;
