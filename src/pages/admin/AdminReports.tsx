import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileText,
  Filter,
  MoreHorizontal,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const reports = [
  { id: "1051", site: "Greenfield Solar Farm", region: "North England", engineer: "Fatima Ali", upload: "Uploaded", report: "Attached", date: "Jul 25, 2025" },
  { id: "1052", site: "Nova Wind Farm", region: "South England", engineer: "Alex Khan", upload: "Partial", report: "-", date: "Jul 24, 2025" },
  { id: "1053", site: "SolarGrid Central", region: "Wales", engineer: "Owen Williams", upload: "Missing", report: "-", date: "Jul 23, 2025" },
  { id: "1054", site: "BlueGrid Energy", region: "East Midlands", engineer: "Sarah Mitchell", upload: "Uploaded", report: "-", date: "Jul 22, 2025" },
];

const AdminReports = () => {
  const [query, setQuery] = useState("");

  const filtered = reports.filter((r) => {
    const hay = `${r.id} ${r.site} ${r.region} ${r.engineer}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  return (
    <AdminLayout title="Survey Reports Management" subtitle="View, verify, and manage engineer survey uploads">
      <div className="space-y-5">
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#989898]" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by Job ID, Site Name..."
                className="h-10 pl-9 pr-3 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]"
              />
            </div>
            <Select value="all">
              <SelectTrigger className="h-10 flex-1 lg:w-44">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="uploaded">Uploaded</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="missing">Missing</SelectItem>
              </SelectContent>
            </Select>
            <Select value="all">
              <SelectTrigger className="h-10 flex-1 lg:w-44">
                <SelectValue placeholder="All Engineers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Engineers</SelectItem>
                <SelectItem value="alex">Alex Khan</SelectItem>
                <SelectItem value="fatima">Fatima Ali</SelectItem>
              </SelectContent>
            </Select>
            <Select value="week">
              <SelectTrigger className="h-10 flex-1 lg:w-40">
                <SelectValue placeholder="This Week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
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
                <SelectValue placeholder="All Asset Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Asset Types</SelectItem>
                <SelectItem value="solar">Solar</SelectItem>
                <SelectItem value="wind">Wind</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-10 px-3 gap-2 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold">
              <Filter size={14} /> More Filters
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[960px]">
              <div className="grid grid-cols-[0.6fr_1.2fr_1fr_1fr_0.8fr_0.8fr_1fr_1.2fr] items-center gap-3 px-4 py-3 border-b border-[#E0E0E0] text-[10px] font-medium text-[#989898]">
                <span>JOB ID</span><span>SITE NAME</span><span>ENGINEER</span><span>UPLOAD STATUS</span><span>FINAL REPORT</span><span>DATE</span><span>ACTIONS</span>
              </div>
              <div className="divide-y divide-[#E0E0E0]">
                {filtered.map((report) => (
                  <div key={report.id} className="grid grid-cols-[0.6fr_1.2fr_1fr_1fr_0.8fr_0.8fr_1fr_1.2fr] items-center gap-3 px-4 py-3 text-sm">
                    <span className="font-medium text-[#242424]">{report.id}</span>
                    <div className="min-w-0">
                      <p className="font-medium text-[#242424] truncate">{report.site}</p>
                      <p className="text-xs text-[#989898]">{report.region}</p>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-[#D1FAE5] text-[#0A3D3A] text-[10px] font-semibold flex items-center justify-center shrink-0">{report.engineer.split(" ").map((p) => p[0]).join("").slice(0, 2)}</div>
                      <span className="text-[#505050] text-xs truncate">{report.engineer}</span>
                    </div>
                    <Badge className={`text-[10px] w-fit ${
                      report.upload === "Uploaded" ? "bg-[#E8F6F3] text-[#0A3D3A]" :
                      report.upload === "Partial" ? "bg-[#FEF3C7] text-[#92400E]" :
                      "bg-[#FEE2E2] text-[#DC2626]"
                    }`}>
                      {report.upload === "Uploaded" ? "✓ Uploaded" : report.upload === "Partial" ? "⚠ Partial" : "× Missing"}
                    </Badge>
                    <span className="text-[#505050] text-xs">{report.report}</span>
                    <span className="text-[#505050] text-xs">{report.date}</span>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-[#505050] hover:text-[#0A3D3A]">View</Button>
                      {report.upload === "Uploaded" ? (
                        <>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-[#505050] hover:text-[#0A3D3A]">Approve</Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-[#505050] hover:text-[#EF4444]">Reject</Button>
                        </>
                      ) : report.upload === "Partial" ? (
                        <>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-[#505050] hover:text-[#0A3D3A]">Re-upload</Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-[#505050] hover:text-[#EF4444]">Reject</Button>
                        </>
                      ) : (
                        <>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-[#505050] hover:text-[#0A3D3A]">Request Upload</Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-[#505050] hover:text-[#EF4444]">Reject</Button>
                        </>
                      )}
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

export default AdminReports;
