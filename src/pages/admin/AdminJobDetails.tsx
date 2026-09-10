import {
  AlertTriangle,
  ChevronLeft,
  Clock,
  Download,
  FileText,
  MapPin,
  Phone,
  Settings,
  Upload,
  User,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminJobDetails = () => {
  return (
    <AdminLayout title="Job Details" subtitle="Survey job details and management">
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-xl font-semibold text-[#242424]">Job #1049 - EcoEnergy Plant</h1>
            <p className="text-xs text-[#989898] mt-0.5">Survey job details and management</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="h-9 px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-xs font-semibold">
              <Download size={14} className="mr-1.5" />
              Download Report
            </Button>
            <button className="w-9 h-9 rounded-full bg-[#D1FAE5] text-[#0A3D3A] font-semibold text-sm flex items-center justify-center">D</button>
            <span className="text-sm font-medium text-[#242424]">David</span>
            <ChevronLeft size={14} className="text-[#989898]" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
            <h2 className="font-display text-sm font-semibold text-[#242424] mb-4 flex items-center gap-2"><MapPin size={16} /> Site Information</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-[#989898]">Site Name</p>
                <p className="font-medium text-[#242424]">EcoEnergy Plant</p>
              </div>
              <div>
                <p className="text-xs text-[#989898]">Customer</p>
                <p className="font-medium text-[#242424]">Lisa Chen</p>
              </div>
              <div>
                <p className="text-xs text-[#989898]">Address</p>
                <p className="font-medium text-[#242424]">142 Industrial Way, London E14 9SJ</p>
              </div>
              <div>
                <p className="text-xs text-[#989898]">Region</p>
                <p className="font-medium text-[#242424]">London</p>
              </div>
            </div>
            <div className="mt-4 h-32 bg-[#EAEAEA] rounded-lg flex items-center justify-center text-[#989898] text-xs">
              <MapPin size={20} className="mr-2" /> Map Preview
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
            <h2 className="font-display text-sm font-semibold text-[#242424] mb-4 flex items-center gap-2"><User size={16} /> Engineer Assignment</h2>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-[#D1FAE5] text-[#0A3D3A] font-semibold flex items-center justify-center">SM</div>
              <div>
                <p className="font-medium text-[#242424]">Sarah Mitchell</p>
                <p className="text-xs text-[#989898]">Senior Drone Engineer</p>
                <div className="mt-2 space-y-1 text-xs text-[#505050]">
                  <p>sarah.mitchell@company.com</p>
                  <p>+44 7700 900456</p>
                  <p className="text-[#989898]">Preferred Regions: London, South England</p>
                </div>
              </div>
            </div>
            <Button className="h-9 mt-4 px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-xs font-semibold">
              <User size={14} className="mr-1.5" /> Change Engineer
            </Button>
          </div>

          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
            <h2 className="font-display text-sm font-semibold text-[#242424] mb-4 flex items-center gap-2"><Clock size={16} /> Schedule</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs text-[#989898]">Scheduled Date & Time</p>
                <p className="font-medium text-[#242424]">July 23, 2025 - 13:00 PM to 14:30 PM</p>
              </div>
              <div>
                <p className="text-xs text-[#989898]">Duration</p>
                <p className="font-medium text-[#242424]">1.5 hours (estimated)</p>
              </div>
              <div>
                <p className="text-xs text-[#989898]">Buffer Time</p>
                <p className="font-medium text-[#242424]">30 minutes</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#E0E0E0]">
                <AlertTriangle size={16} className="text-[#EF4444]" />
                <span className="text-xs font-medium text-[#EF4444]">Revisit Needed</span>
              </div>
            </div>
            <Button className="h-9 mt-4 px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-xs font-semibold">
              <Clock size={14} className="mr-1.5" /> Reschedule Job
            </Button>
          </div>

          <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
            <h2 className="font-display text-sm font-semibold text-[#242424] mb-4 flex items-center gap-2"><FileText size={16} /> Survey Information</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-xs text-[#989898]">Asset Type</p><p className="font-medium text-[#242424]">Solar Farm</p></div>
              <div><p className="text-xs text-[#989898]">System Size</p><p className="font-medium text-[#242424]">3.8 MW</p></div>
              <div><p className="text-xs text-[#989898]">Purpose</p><p className="font-medium text-[#242424]">Maintenance Inspection</p></div>
              <div><p className="text-xs text-[#989898]">Job Source</p><p className="font-medium text-[#242424]">Chatbot Booking</p></div>
              <div><p className="text-xs text-[#989898]">Linked Lead</p><p className="font-medium text-[#0A3D3A]">View Lead #2087</p></div>
              <div><p className="text-xs text-[#989898]">Special Requirements</p><p className="font-medium text-[#242424]">High priority - compliance deadline approaching</p></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
          <h2 className="font-display text-sm font-semibold text-[#242424] mb-4 flex items-center gap-2"><Upload size={16} /> Upload Status & Files</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Thermal Imagery", "RGB Photos", "Video", "Field Notes"].map((file, i) => (
              <div key={file} className="border border-[#E0E0E0] rounded-lg p-4">
                <p className="font-medium text-[#242424] text-sm">{file}</p>
                <p className={`text-xs mt-1 flex items-center gap-1 ${i === 2 ? "text-[#92400E]" : "text-[#EF4444]"}`}>
                  {i === 2 ? <Clock size={12} /> : <span>×</span>}
                  {i === 2 ? "Pending" : "Missing"}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <Button className="h-9 px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-xs font-semibold"><Download size={14} className="mr-1.5" /> Download All Files</Button>
            <Button variant="outline" className="h-9 px-4 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-xs font-semibold"><Upload size={14} className="mr-1.5" /> Request Upload</Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
          <h2 className="font-display text-sm font-semibold text-[#242424] mb-4 flex items-center gap-2"><Settings size={16} /> Status Management</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-medium text-[#242424]">Current Status</Label>
              <Select value="scheduled">
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
    </AdminLayout>
  );
};

export default AdminJobDetails;
