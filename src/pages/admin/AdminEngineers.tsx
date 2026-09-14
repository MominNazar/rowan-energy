import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Pause,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showError, showSuccess } from "@/utils/toast";

type Engineer = {
  name: string;
  role: string;
  email: string;
  phone: string;
  regions: string[];
  jobs: number;
  load: string;
  status: "Active" | "Inactive";
  initials: string;
  avatarClass: string;
};

const INITIAL_ENGINEERS: Engineer[] = [
  {
    name: "Alex Khan",
    role: "Senior Engineer",
    email: "alex@hoverlens.co.uk",
    phone: "+44 7712 123456",
    regions: ["North", "East"],
    jobs: 3,
    load: "Normal load",
    status: "Active",
    initials: "AK",
    avatarClass: "bg-[#D1FAE5] text-[#0A3D3A]",
  },
  {
    name: "Fatima Ali",
    role: "Lead Engineer",
    email: "fatima@hoverlens.co.uk",
    phone: "+44 7712 345678",
    regions: ["South", "Wales"],
    jobs: 5,
    load: "High load",
    status: "Active",
    initials: "FA",
    avatarClass: "bg-[#DBEAFE] text-[#1D4ED8]",
  },
  {
    name: "Owen Williams",
    role: "Engineer",
    email: "owen@hoverlens.co.uk",
    phone: "+44 7712 567890",
    regions: ["West", "Wales"],
    jobs: 1,
    load: "Light load",
    status: "Active",
    initials: "OW",
    avatarClass: "bg-[#EDE9FE] text-[#6D28D9]",
  },
  {
    name: "Sarah Mitchell",
    role: "Junior Engineer",
    email: "sarah@hoverlens.co.uk",
    phone: "+44 7712 789012",
    regions: ["North"],
    jobs: 0,
    load: "Available",
    status: "Inactive",
    initials: "SM",
    avatarClass: "bg-[#FEF3C7] text-[#92400E]",
  },
];

const selectTrigger =
  "h-10 w-full min-w-0 border-[#D3D3D3] rounded-lg text-sm focus:ring-[#0A3D3A] focus:ring-offset-0 bg-white";
const actionBtn =
  "h-8 px-2.5 sm:px-3 border border-[#D3D3D3] bg-white text-[#242424] hover:bg-[#F5F5F5] rounded-md text-xs font-medium shrink-0";

const StatusCell = ({ status }: { status: Engineer["status"] }) => {
  if (status === "Active") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-[#059669]">
        <CheckCircle2 size={15} className="shrink-0" />
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-[#989898]">
      <Pause size={15} className="shrink-0" />
      Inactive
    </span>
  );
};

type EngineerActionsProps = {
  engineer: Engineer;
  onView: (eng: Engineer) => void;
  onEdit: (eng: Engineer) => void;
  onToggleStatus: (eng: Engineer) => void;
};

const EngineerActions = ({
  engineer,
  onView,
  onEdit,
  onToggleStatus,
}: EngineerActionsProps) => (
  <div className="flex flex-wrap items-center gap-1.5">
    <Button
      variant="outline"
      className={actionBtn}
      onClick={() => onView(engineer)}
    >
      View
    </Button>
    <Button
      variant="outline"
      className={actionBtn}
      onClick={() => onEdit(engineer)}
    >
      Edit
    </Button>
    <Button
      variant="outline"
      className={actionBtn}
      onClick={() => onToggleStatus(engineer)}
    >
      {engineer.status === "Active" ? "Disable" : "Enable"}
    </Button>
  </div>
);

const initialsFromName = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "NE";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

const AdminEngineers = () => {
  const [engineers, setEngineers] = useState<Engineer[]>(INITIAL_ENGINEERS);
  const [query, setQuery] = useState("");
  const [availability, setAvailability] = useState("all");
  const [region, setRegion] = useState("all");
  const [workload, setWorkload] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");

  const filtered = useMemo(() => {
    return engineers.filter((eng) => {
      const hay = `${eng.name} ${eng.role} ${eng.email} ${eng.phone}`.toLowerCase();
      if (query && !hay.includes(query.toLowerCase())) return false;
      if (availability === "active" && eng.status !== "Active") return false;
      if (availability === "inactive" && eng.status !== "Inactive") return false;
      if (region !== "all") {
        if (!eng.regions.some((r) => r.toLowerCase() === region)) return false;
      }
      if (workload !== "all") {
        if (!eng.load.toLowerCase().includes(workload)) return false;
      }
      return true;
    });
  }, [engineers, query, availability, region, workload]);

  const handleView = (eng: Engineer) => {
    showSuccess(`Viewing ${eng.name}`);
  };

  const handleEdit = (eng: Engineer) => {
    showSuccess(`Edit ${eng.name} (demo)`);
  };

  const handleToggleStatus = (eng: Engineer) => {
    const next = eng.status === "Active" ? "Inactive" : "Active";
    setEngineers((prev) =>
      prev.map((e) => (e.name === eng.name ? { ...e, status: next } : e)),
    );
    showSuccess(
      `${eng.name} ${next === "Active" ? "enabled" : "disabled"}`,
    );
  };

  const handleAddEngineer = () => {
    const name = newName.trim() || "New Engineer";
    if (engineers.some((e) => e.name.toLowerCase() === name.toLowerCase())) {
      showError("An engineer with that name already exists");
      return;
    }
    const engineer: Engineer = {
      name,
      role: "Engineer",
      email: "new@hoverlens.co.uk",
      phone: "+44 7700 000000",
      regions: ["North"],
      jobs: 0,
      load: "Available",
      status: "Active",
      initials: initialsFromName(name),
      avatarClass: "bg-[#E0F2FE] text-[#0369A1]",
    };
    setEngineers((prev) => [...prev, engineer]);
    setNewName("");
    setAddOpen(false);
    showSuccess(`${name} added`);
  };

  return (
    <AdminLayout
      title="Engineer Directory"
      subtitle="Manage drone engineers, assignments, and availability"
      header={
        <div className="flex items-start gap-2.5 min-w-0">
          <div className="mt-0.5 hidden min-[380px]:flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F5F3] text-[#0A3D3A]">
            <Users size={18} />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-lg sm:text-[20px] font-semibold text-[#242424] leading-tight">
              Engineer Directory
            </h1>
            <p className="text-[11px] sm:text-xs text-[#989898] mt-0.5 leading-relaxed">
              Manage drone engineers, assignments, and availability
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-3.5 sm:space-y-5 min-w-0 max-w-full">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-3 sm:p-4 shadow-sm min-w-0 max-w-full">
          <div className="flex flex-col xl:flex-row xl:items-center flex-wrap gap-2.5 sm:gap-3 min-w-0 max-w-full">
            <div className="relative flex-1 min-w-0 max-w-full">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#989898] pointer-events-none"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search engineers..."
                className="h-10 pl-9 pr-3 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0"
              />
            </div>
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 xl:contents gap-2.5 sm:gap-3">
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger className={`${selectTrigger} xl:w-[160px]`}>
                  <SelectValue placeholder="All Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Availability</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className={`${selectTrigger} xl:w-[140px]`}>
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">North</SelectItem>
                  <SelectItem value="east">East</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                  <SelectItem value="wales">Wales</SelectItem>
                </SelectContent>
              </Select>
              <Select value={workload} onValueChange={setWorkload}>
                <SelectTrigger className={`${selectTrigger} xl:w-[150px]`}>
                  <SelectValue placeholder="All Workloads" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Workloads</SelectItem>
                  <SelectItem value="light">Light Load</SelectItem>
                  <SelectItem value="normal">Normal Load</SelectItem>
                  <SelectItem value="high">High Load</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="h-10 w-full xl:w-auto px-4 bg-[#0A3D3A] hover:bg-[#083F3C] text-white rounded-lg text-sm font-semibold gap-2 shrink-0 min-[400px]:col-span-2 lg:col-span-3 xl:col-auto"
                onClick={() => setAddOpen(true)}
              >
                <Plus size={15} />
                Add New Engineer
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {filtered.map((eng) => (
            <article
              key={eng.name}
              className="bg-white rounded-xl border border-[#E0E0E0] p-3.5 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-full text-xs font-semibold flex items-center justify-center shrink-0 ${eng.avatarClass}`}
                  >
                    {eng.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-[#242424] truncate">
                      {eng.name}
                    </p>
                    <p className="text-xs text-[#989898]">{eng.role}</p>
                  </div>
                </div>
                <StatusCell status={eng.status} />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-[#242424] break-all">{eng.email}</p>
                <p className="text-xs text-[#989898] mt-0.5">{eng.phone}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {eng.regions.map((r) => (
                  <span
                    key={r}
                    className="text-[11px] bg-[#F3F4F6] text-[#505050] px-2.5 py-1 rounded-full"
                  >
                    {r}
                  </span>
                ))}
              </div>

              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-[#989898]">
                    Jobs this week
                  </p>
                  <p className="font-semibold text-[#242424] text-lg leading-tight">
                    {eng.jobs}
                  </p>
                  <p className="text-xs text-[#989898]">{eng.load}</p>
                </div>
              </div>

              <EngineerActions
                engineer={eng}
                onView={handleView}
                onEdit={handleEdit}
                onToggleStatus={handleToggleStatus}
              />
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-8 text-center text-sm text-[#989898]">
              No engineers found
            </div>
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block bg-white rounded-xl border border-[#E0E0E0] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-[#E0E0E0]">
                  {[
                    "ENGINEER",
                    "CONTACT",
                    "REGIONS",
                    "JOBS THIS WEEK",
                    "STATUS",
                    "ACTIONS",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wide text-[#989898] whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E0E0]">
                {filtered.map((eng) => (
                  <tr key={eng.name} className="hover:bg-[#FAFAFA]/60">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-full text-[11px] font-semibold flex items-center justify-center shrink-0 ${eng.avatarClass}`}
                        >
                          {eng.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-[#242424]">
                            {eng.name}
                          </p>
                          <p className="text-xs text-[#989898] mt-0.5">
                            {eng.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 min-w-[160px]">
                      <p className="text-sm text-[#242424]">{eng.email}</p>
                      <p className="text-xs text-[#989898] mt-0.5">
                        {eng.phone}
                      </p>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1.5">
                        {eng.regions.map((r) => (
                          <span
                            key={r}
                            className="text-[11px] bg-[#F3F4F6] text-[#505050] px-2.5 py-1 rounded-full"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <p className="font-semibold text-sm text-[#242424]">
                        {eng.jobs}
                      </p>
                      <p className="text-xs text-[#989898] mt-0.5">
                        {eng.load}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <StatusCell status={eng.status} />
                    </td>
                    <td className="px-4 py-3.5">
                      <EngineerActions
                        engineer={eng}
                        onView={handleView}
                        onEdit={handleEdit}
                        onToggleStatus={handleToggleStatus}
                      />
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-sm text-[#989898]"
                    >
                      No engineers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Engineer</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Label htmlFor="new-engineer-name" className="text-sm text-[#242424]">
              Name
            </Label>
            <Input
              id="new-engineer-name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New Engineer"
              className="h-10 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddEngineer();
              }}
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              className="border-[#D3D3D3]"
              onClick={() => setAddOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#0A3D3A] hover:bg-[#083F3C] text-white"
              onClick={handleAddEngineer}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminEngineers;
