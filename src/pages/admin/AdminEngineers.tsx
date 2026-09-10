import { useState } from "react";
import {
  CheckCircle2,
  Edit2,
  Plus,
  Search,
  SlidersHorizontal,
  User,
  X,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const engineers = [
  { name: "Alex Khan", role: "Senior Engineer", email: "alex@hoverlens.co.uk", phone: "+44 7712 123456", regions: ["North", "East"], jobs: 3, load: "Normal load", status: "Active", initials: "AK" },
  { name: "Fatima Ali", role: "Lead Engineer", email: "fatima@hoverlens.co.uk", phone: "+44 7712 345678", regions: ["South", "Wales"], jobs: 5, load: "High load", status: "Active", initials: "FA" },
  { name: "Owen Williams", role: "Engineer", email: "owen@hoverlens.co.uk", phone: "+44 7712 567890", regions: ["West", "Wales"], jobs: 1, load: "Light load", status: "Active", initials: "OW" },
  { name: "Sarah Mitchell", role: "Junior Engineer", email: "sarah@hoverlens.co.uk", phone: "+44 7712 789012", regions: ["North"], jobs: 0, load: "Available", status: "Inactive", initials: "SM" },
];

const AdminEngineers = () => {
  const [query, setQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const filtered = engineers.filter((eng) => {
    const hay = `${eng.name} ${eng.role} ${eng.email}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  return (
    <AdminLayout title="Engineer Directory" subtitle="Manage drone engineers, assignments, and availability">
      <div className="space-y-5">
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#989898]" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search engineers..."
                className="h-10 pl-9 pr-3 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]"
              />
            </div>
            <Select value="all">
              <SelectTrigger className="h-10 flex-1 lg:w-44">
                <SelectValue placeholder="All Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Availability</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value="all">
              <SelectTrigger className="h-10 flex-1 lg:w-44">
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">North England</SelectItem>
                <SelectItem value="south">South England</SelectItem>
              </SelectContent>
            </Select>
            <Select value="all">
              <SelectTrigger className="h-10 flex-1 lg:w-44">
                <SelectValue placeholder="All Workloads" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Workloads</SelectItem>
                <SelectItem value="light">Light Load</SelectItem>
                <SelectItem value="normal">Normal Load</SelectItem>
                <SelectItem value="high">High Load</SelectItem>
              </SelectContent>
            </Select>
            <Button className="h-10 px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold gap-2 shrink-0">
              <Plus size={15} /> Add New Engineer
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[960px]">
              <div className="grid grid-cols-[0.6fr_1.2fr_1.4fr_1.4fr_1fr_0.8fr_0.8fr_1.4fr] items-center gap-3 px-4 py-3 border-b border-[#E0E0E0] text-[10px] font-medium text-[#989898]">
                <span>ENGINEER</span><span>CONTACT</span><span>REGIONS</span><span>JOBS THIS WEEK</span><span>STATUS</span><span>ACTIONS</span>
              </div>
              <div className="divide-y divide-[#E0E0E0]">
                {filtered.map((eng) => (
                  <div key={eng.name} className="grid grid-cols-[0.6fr_1.2fr_1.4fr_1.4fr_1fr_0.8fr_0.8fr_1.4fr] items-center gap-3 px-4 py-3 text-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-[#D1FAE5] text-[#0A3D3A] text-xs font-semibold flex items-center justify-center shrink-0">{eng.initials}</div>
                      <div className="min-w-0">
                        <p className="font-medium text-[#242424] truncate">{eng.name}</p>
                        <p className="text-xs text-[#989898] truncate">{eng.role}</p>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[#505050] text-xs truncate">{eng.email}</p>
                      <p className="text-[#505050] text-xs truncate">{eng.phone}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {eng.regions.map((r) => (
                        <span key={r} className="text-[10px] bg-[#F5F5F5] text-[#505050] px-2 py-0.5 rounded-full">{r}</span>
                      ))}
                    </div>
                    <div>
                      <p className="font-medium text-[#242424] text-sm">{eng.jobs}</p>
                      <p className="text-[10px] text-[#989898]">{eng.load}</p>
                    </div>
                    <Badge className={`text-[10px] w-fit ${eng.status === "Active" ? "bg-[#E8F6F3] text-[#0A3D3A]" : "bg-[#F3F4F6] text-[#505050]"}`}>
                      {eng.status === "Active" ? "✓ Active" : "Inactive"}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-[#505050] hover:text-[#0A3D3A]">View</Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-[#505050] hover:text-[#0A3D3A]"><Edit2 size={12} /></Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-[#505050] hover:text-[#EF4444]">{eng.status === "Active" ? "Disable" : "Enable"}</Button>
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

export default AdminEngineers;