import { useState } from "react";
import {
  Eye,
  FileText,
  Filter,
  Grid2X2,
  List,
  Mail,
  MoreHorizontal,
  Phone,
  Search,
  Users,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const leads = [
  { name: "Sarah Daniels", email: "sarah.daniels@gmail.com", source: "Chatbot", region: "South England", status: "New", jobId: "-", followUp: "Yes", date: "Jul 23, 2025 - 10:14 AM" },
  { name: "Michael Thompson", email: "m.thompson@business.co.uk", source: "Form", region: "North England", status: "Qualified", jobId: "-", followUp: "Yes", date: "Jul 23, 2025 - 09:32 AM" },
  { name: "Emma Wilson", email: "+44 7700 900123", source: "Phone", region: "West Midlands", status: "Converted", jobId: "#1089", followUp: "No", date: "Jul 23, 2025 - 08:45 AM" },
  { name: "James Rodriguez", email: "james.j@gmail.com", source: "Chatbot", region: "East Midlands", status: "Abandoned", jobId: "-", followUp: "No", date: "Jul 22, 2025 - 16:20 PM" },
  { name: "Lisa Chen", email: "lisachen@techcorp.com", source: "Form", region: "London", status: "Qualified", jobId: "-", followUp: "Yes", date: "Jul 22, 2025 - 14:15 PM" },
];

const AdminLeads = () => {
  const [query, setQuery] = useState("");

  const filteredLeads = leads.filter((lead) => {
    const haystack = `${lead.name} ${lead.email} ${lead.source} ${lead.region}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  return (
    <AdminLayout title="Leads Management" subtitle="Track and manage all incoming leads">
      <div className="space-y-5">
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#989898]" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, email, phone, or site..."
                className="h-10 pl-9 pr-3 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]"
              />
            </div>
            <Select value="all">
              <SelectTrigger className="h-10 flex-1 lg:w-44">
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="chatbot">Chatbot</SelectItem>
                <SelectItem value="form">Form</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>
            <Select value="week">
              <SelectTrigger className="h-10 flex-1 lg:w-40">
                <SelectValue placeholder="This Week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-10 px-3 gap-2 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold">
              <Filter size={14} /> More Filters
            </Button>
          </div>
          <div className="flex flex-col items-center gap-2 mt-4 sm:flex-row sm:items-start sm:gap-2 sm:justify-start">
                      <Button className="h-9 w-full sm:w-auto px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-xs font-semibold">
                        <Phone size={13} className="mr-1.5" />
                        Call All New Leads
                      </Button>
                      <Button variant="outline" className="h-9 w-full sm:w-auto px-4 border-[#0A3D3A] text-[#0A3D3A] hover:bg-[#E8F6F3] rounded-lg text-xs font-semibold">
                        <Phone size={13} className="mr-1.5" />
                        Call All Qualified Leads
                      </Button>
                      <Button variant="outline" className="h-9 w-full sm:w-auto px-4 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-xs font-semibold">
                        <Mail size={14} className="mr-1.5" />
                        Export CSV
                      </Button>
                    </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden">
          <div className="p-4 border-b border-[#E0E0E0] flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold text-[#242424]">All Leads <span className="text-[#989898] font-normal">(127)</span></h2>
            <div className="flex items-center gap-2">
              <button className="p-2 text-[#505050] hover:text-[#242424] transition-colors" aria-label="Table view"><List size={16} /></button>
                            <button className="p-2 text-[#505050] hover:text-[#242424] transition-colors" aria-label="Card view"><Grid2X2 size={16} /></button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[880px]">
              <div className="grid grid-cols-[56px_1.7fr_0.8fr_1fr_0.9fr_0.7fr_1.2fr_0.7fr_0.9fr] items-center gap-3 px-4 py-3 border-b border-[#E0E0E0] text-[10px] font-medium text-[#989898]">
                <span></span><span>NAME</span><span>SOURCE</span><span>REGION</span><span>STATUS</span><span>JOB ID</span><span>FOLLOW-UP</span><span>DATE RECEIVED</span><span>ACTIONS</span>
              </div>
              <div className="divide-y divide-[#E0E0E0]">
                {filteredLeads.map((lead) => (
                  <div key={lead.name} className="grid grid-cols-[56px_1.7fr_0.8fr_1fr_0.9fr_0.7fr_1.2fr_0.7fr_0.9fr] items-center gap-3 px-4 py-3 text-sm">
                    <label className="flex justify-center">
                      <input type="checkbox" className="w-4 h-4 accent-[#0A3D3A] cursor-pointer" />
                    </label>
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#D1FAE5] text-[#0A3D3A] text-xs font-semibold flex items-center justify-center shrink-0">{lead.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}</div>
                      <div className="min-w-0">
                        <p className="font-medium text-[#242424] truncate">{lead.name}</p>
                        <p className="text-xs text-[#989898] truncate">{lead.email}</p>
                      </div>
                    </div>
                    <span className="text-[#505050] text-xs">{lead.source}</span>
                    <span className="text-[#505050] text-xs">{lead.region}</span>
                    <Badge className={`text-[10px] w-fit ${
                      lead.status === "New" ? "bg-[#E8F6F3] text-[#0A3D3A]" :
                      lead.status === "Qualified" ? "bg-[#E8F6F3] text-[#0A3D3A]" :
                      lead.status === "Converted" ? "bg-[#0A3D3A] text-white" :
                      "bg-[#F3F4F6] text-[#505050]"
                    }`}>{lead.status}</Badge>
                    <span className="text-[#505050] text-xs">{lead.jobId}</span>
                    <span className={`text-xs ${lead.followUp === "Yes" ? "text-[#0A3D3A] font-medium" : "text-[#989898]"}`}>{lead.followUp}</span>
                    <span className="text-[#505050] text-xs">{lead.date}</span>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-[#505050] hover:text-[#0A3D3A] transition-colors" aria-label="View"><Eye size={14} /></button>
                      <button className="p-1.5 text-[#505050] hover:text-[#0A3D3A] transition-colors" aria-label="Call"><Phone size={14} /></button>
                      <button className="p-1.5 text-[#505050] hover:text-[#0A3D3A] transition-colors" aria-label="More"><MoreHorizontal size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLeads;
