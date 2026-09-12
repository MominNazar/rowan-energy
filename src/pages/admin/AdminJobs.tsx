import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Calendar,
  Check,
  ChevronDown,
  Download,
  Eye,
  FileText,
  Filter,
  Grid2X2,
  List,
  MapPin,
  MoreHorizontal,
  RefreshCw,
  Settings,
  User,
  X,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { jobs } from "@/data/adminJobs";

const AdminJobs = () => {
  const [query, setQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [newEngineer, setNewEngineer] = useState("");
  const [note, setNote] = useState("");

  const selectedJobData = selectedJob ? jobs.find((j) => j.id === selectedJob) : null;

  const filtered = jobs.filter((j) => {
    const hay = `${j.id} ${j.site} ${j.region} ${j.engineer}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  return (
    <AdminLayout title="All Survey Jobs" subtitle="Manage and track all survey jobs across regions">
      <div className="space-y-5">
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row gap-3">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Job ID, site name"
              className="h-10 flex-1 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]"
            />
            <Select value="all">
              <SelectTrigger className="h-10 w-full lg:w-44">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value="all">
              <SelectTrigger className="h-10 w-full lg:w-44">
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">North England</SelectItem>
                <SelectItem value="west">West Midlands</SelectItem>
              </SelectContent>
            </Select>
            <Select value="week">
              <SelectTrigger className="h-10 w-full lg:w-40">
                <SelectValue placeholder="This Week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-10 px-3 gap-2 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold">
              <Filter size={14} /> More Filters
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden">
          <div className="p-4 border-b border-[#E0E0E0] flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold text-[#242424]">All Jobs <span className="text-[#989898] font-normal">(89)</span></h2>
            <div className="flex items-center gap-2">
              <button className="p-2 text-[#505050] hover:text-[#242424]"><List size={16} /></button>
                            <button className="p-2 text-[#505050] hover:text-[#242424]"><Grid2X2 size={16} /></button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[960px]">
              <div className="grid grid-cols-[56px_0.7fr_1.2fr_1fr_1fr_1.2fr_0.8fr_0.7fr_0.9fr] items-center gap-3 px-4 py-3 border-b border-[#E0E0E0] text-[10px] font-medium text-[#989898]">
                <span></span><span>JOB ID</span><span>SITE NAME</span><span>REGION</span><span>ENGINEER</span><span>TIME SLOT</span><span>STATUS</span><span>UPLOAD</span><span>ACTIONS</span>
              </div>
              <div className="divide-y divide-[#E0E0E0]">
                {filtered.map((job) => (
                  <div key={job.id} className="grid grid-cols-[56px_0.7fr_1.2fr_1fr_1fr_1.2fr_0.8fr_0.7fr_0.9fr] items-center gap-3 px-4 py-3 text-sm">
                    <label className="flex justify-center">
                      <input type="checkbox" className="w-4 h-4 accent-[#0A3D3A] cursor-pointer" />
                    </label>
                    <span className="font-medium text-[#242424]">{job.id}</span>
                    <div className="min-w-0">
                      <p className="font-medium text-[#242424] truncate">{job.site}</p>
                      <p className="text-xs text-[#989898]">{job.region}</p>
                    </div>
                    <span className="text-[#505050] text-xs">{job.region}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#D1FAE5] text-[#0A3D3A] text-[10px] font-semibold flex items-center justify-center">{job.engineer.split(" ").map((p)=>p[0]).join("").slice(0,2)}</div>
                      <span className="text-[#505050] text-xs">{job.engineer}</span>
                    </div>
                    <span className="text-[#505050] text-xs">{job.time}</span>
                    {job.status === "Revisit Needed" ? (
                      <span className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FEE2E2] px-3 py-1.5 text-xs font-semibold text-[#DC2626]">
                        <AlertTriangle size={14} className="shrink-0" />
                        Revisit Needed
                      </span>
                    ) : (
                      <Badge className={`text-[10px] w-fit ${
                        job.status === "Completed" ? "bg-[#E8F6F3] text-[#0A3D3A]" :
                        job.status === "In Progress" ? "bg-[#FEF3C7] text-[#92400E]" :
                        "bg-[#E8F6F3] text-[#0A3D3A]"
                      }`}>{job.status}</Badge>
                    )}
                    <span className={`text-xs font-medium ${job.upload === "Uploaded" ? "text-[#0A3D3A]" : job.upload === "Missing" ? "text-[#EF4444]" : "text-[#505050]"}`}>{job.upload}</span>
                    <div className="flex items-center gap-1">
                      <Link to={`/admin/jobs/${job.id.replace("#", "")}`} className="p-1.5 text-[#505050] hover:text-[#0A3D3A]"><Eye size={14} /></Link>
                      <button className="p-1.5 text-[#505050] hover:text-[#0A3D3A]">
                        {job.status === "Completed" ? (
                          <FileText size={14} />
                        ) : job.status === "Revisit Needed" ? (
                          <RefreshCw size={14} />
                        ) : job.status === "Scheduled" ? (
                          <Calendar size={14} />
                        ) : (
                          <MapPin size={14} />
                        )}
                      </button>
                      <button
                        className="p-1.5 text-[#505050] hover:text-[#0A3D3A]"
                        onClick={() => { setSelectedJob(job.id); setNewEngineer(""); setNote(""); }}
                        aria-label="Change Engineer"
                      >
                        <User size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedJobData && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="bg-white rounded-xl border border-[#E0E0E0] w-full max-w-lg shadow-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-[#E0E0E0]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#E8F6F3] flex items-center justify-center">
                        <User size={14} className="text-[#0A3D3A]" />
                      </div>
                      <h3 className="font-display text-sm font-semibold text-[#242424]">Change Engineer for Job {selectedJobData.id}</h3>
                    </div>
                    <button onClick={() => setSelectedJob(null)} className="text-[#989898] hover:text-[#242424] p-1">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="bg-[#F5F5F5] rounded-lg p-3 space-y-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="text-[#989898] shrink-0" />
                        <span className="text-[#505050]">Site:</span>
                        <span className="font-medium text-[#242424]">{selectedJobData.site}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-[#989898] shrink-0" />
                        <span className="text-[#505050]">Scheduled:</span>
                        <span className="font-medium text-[#242424]">{selectedJobData.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="text-[#989898] shrink-0" />
                        <span className="text-[#505050]">Region:</span>
                        <span className="font-medium text-[#242424]">{selectedJobData.region}</span>
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
                    <Button variant="outline" onClick={() => setSelectedJob(null)} className="h-10 px-4 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold">Cancel</Button>
                    <Button onClick={() => setSelectedJob(null)} className="h-10 px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold">Confirm Change</Button>
                  </div>
                </div>
              </div>
            )}
    </AdminLayout>
  );
};

export default AdminJobs;
