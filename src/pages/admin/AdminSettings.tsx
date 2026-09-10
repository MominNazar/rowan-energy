import { useState } from "react";
import {
  Check,
  ChevronDown,
  RotateCcw,
  Save,
  Settings,
  TestTube,
  Volume2,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AdminSettings = () => {
  const [aiActive, setAiActive] = useState(true);

  return (
    <AdminLayout title="Settings" subtitle="Configure system behavior, integrations, and AI settings">
      <div className="space-y-5">
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <Settings size={18} className="text-[#0A3D3A]" />
            <h2 className="font-display text-base font-semibold text-[#242424]">Inbound Campaign Settings</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-medium text-[#242424]">Campaign Name</Label>
              <Input defaultValue="Solar Summer Outreach" className="h-10 mt-1 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]" />
            </div>
            <div>
              <Label className="text-xs font-medium text-[#242424]">Campaign Phone Number</Label>
              <Input defaultValue="+44 7700 900123" className="h-10 mt-1 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <Settings size={18} className="text-[#0A3D3A]" />
            <h2 className="font-display text-base font-semibold text-[#242424]">Outbound Campaign Settings</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="text-xs font-medium text-[#242424]">Campaign Name</Label>
              <Input defaultValue="July Follow-Up - Solar North" className="h-10 mt-1 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]" />
            </div>
            <div>
              <Label className="text-xs font-medium text-[#242424]">Outbound Phone Number</Label>
              <Input defaultValue="+44 7700 900456" className="h-10 mt-1 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]" />
              <p className="text-[10px] text-[#989898] mt-1">Used as caller ID for this campaign</p>
            </div>
          </div>
          <div className="mb-4">
            <Label className="text-xs font-medium text-[#242424]">Upload Contact List (CSV)</Label>
            <div className="mt-1 border-2 border-dashed border-[#D3D3D3] rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:border-[#0A3D3A] transition-colors cursor-pointer">
              <Input type="file" className="hidden" id="csv-upload" />
              <label htmlFor="csv-upload" className="cursor-pointer text-sm text-[#505050]">Drop CSV file here or click to browse</label>
              <p className="text-[10px] text-[#989898]">CSV format: one column titled "Phone Number"</p>
              <Button variant="outline" size="sm" className="mt-1 border-[#D3D3D3] text-[#505050] rounded-md text-xs">Choose File</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="text-xs font-medium text-[#242424]">Voice Flow Template</Label>
              <Select defaultValue="solar-quote">
                <SelectTrigger className="h-10 mt-1 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solar-quote">Solar Quote Reminder</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-medium text-[#242424]">Start Date</Label>
              <Input type="date" className="h-10 mt-1 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button className="h-10 px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold">Start Campaign</Button>
            <Button variant="outline" className="h-10 px-4 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold">Pause Campaign</Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <Settings size={18} className="text-[#0A3D3A]" />
            <h2 className="font-display text-base font-semibold text-[#242424]">AI Behavior & Voice Agent Settings</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-medium text-[#242424]">Interrupt Sensitivity</Label>
              <Select defaultValue="low">
                <SelectTrigger className="h-10 mt-1 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-medium text-[#242424]">Response Speed</Label>
              <Select defaultValue="auto">
                <SelectTrigger className="h-10 mt-1 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="fast">Fast</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-medium text-[#242424]">Initial Message Delay</Label>
              <Select defaultValue="0">
                <SelectTrigger className="h-10 mt-1 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0 sec</SelectItem>
                  <SelectItem value="5">5 sec</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-medium text-[#242424]">AI Creativity</Label>
              <div className="mt-1 h-10 flex items-center gap-2">
                <input type="range" min="0" max="100" defaultValue="50" className="flex-1 accent-[#0A3D3A]" />
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium text-[#242424]">Caller ID Name</Label>
              <Input defaultValue="Bespoke Ins" className="h-10 mt-1 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A]" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-[#0A3D3A] cursor-pointer" />
              <span className="text-sm text-[#242424]">Double Call (retry if missed)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#0A3D3A] cursor-pointer" />
              <span className="text-sm text-[#242424]">VM Detection (Beta)</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
          <Button variant="outline" className="h-10 px-5 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold gap-2">
            <RotateCcw size={15} /> Reset to Defaults
          </Button>
          <Button variant="outline" className="h-10 px-5 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold gap-2">
            <TestTube size={15} /> Test AI Voice Flow
          </Button>
          <Button className="h-10 px-5 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold gap-2">
            <Save size={15} /> Save Settings
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
