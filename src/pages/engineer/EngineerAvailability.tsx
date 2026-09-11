import { useState } from "react";
import { Clock, MapPin, Save, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EngineerLayout } from "@/components/engineer/EngineerLayout";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeSlots = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00"];

const EngineerAvailability = () => {
  const [availability, setAvailability] = useState<Record<string, Record<string, boolean>>>({});
  const [maxJobsInput, setMaxJobsInput] = useState("2");
  const [notificationMethod, setNotificationMethod] = useState("both");

  const toggleSlot = (day: string, slot: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: !prev[day]?.[slot],
      },
    }));
  };

  const selectedCount = Object.values(availability).reduce(
    (acc, day) => acc + Object.values(day).filter(Boolean).length,
    0
  );

  return (
    <EngineerLayout
      title="My Availability"
      subtitle="Set your working hours and preferred regions for scheduling"
      backTo="/engineer/dashboard"
    >
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <Clock size={18} className="text-[#0A3D3A]" />
            <div>
              <h2 className="font-display text-base font-semibold text-[#242424]">
                Weekly Availability
              </h2>
              <p className="text-xs text-[#989898] mt-0.5">
                Select the hours you are available for survey work each day.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="grid grid-cols-8 gap-2 min-w-[720px]">
              <div className="text-xs font-medium text-[#505050] p-2">Time</div>
              {days.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-[#505050] p-2">
                  {day.substring(0, 3)}
                </div>
              ))}
              {timeSlots.map((slot) => (
                <>
                  <div key={`label-${slot}`} className="text-xs text-[#989898] p-2 text-right pr-3">
                    {slot.split("-")[0]}
                  </div>
                  {days.map((day) => {
                    const isSelected = availability[day]?.[slot] ?? false;
                    const isWeekend = day === "Saturday" || day === "Sunday";
                    return (
                      <button
                        key={`${day}-${slot}`}
                        type="button"
                        onClick={() => toggleSlot(day, slot)}
                        disabled={isWeekend}
                        className={`h-10 rounded-lg border text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                          isSelected
                            ? "bg-[#0A3D3A] text-white border-[#0A3D3A]"
                            : isWeekend
                            ? "bg-[#F5F5F5] border-[#E0E0E0] text-[#989898]"
                            : "bg-white border-[#D3D3D3] text-[#505050] hover:border-[#0A3D3A] hover:bg-[#E8F6F3]"
                        }`}
                      >
                        {isSelected ? "✓" : ""}
                      </button>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <MapPin size={18} className="text-[#0A3D3A]" />
            <h2 className="font-display text-base font-semibold text-[#242424]">
              Region Preferences
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "North England",
              "South England",
              "East England",
              "West England",
              "Wales",
              "Scotland",
            ].map((region) => (
              <label key={region} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded border-[#D3D3D3] accent-[#0A3D3A] cursor-pointer"
                />
                <span className="text-sm text-[#242424]">{region}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <Zap size={18} className="text-[#0A3D3A]" />
            <h2 className="font-display text-base font-semibold text-[#242424]">
              Workload Preferences
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
                          <label className="block text-sm font-medium text-[#242424] mb-2">
                            Maximum jobs per day
                          </label>
                          <Select
                            value={maxJobsInput}
                            onValueChange={setMaxJobsInput}
                          >
                            <SelectTrigger className="w-full h-11 rounded-lg border border-[#D3D3D3] bg-white pl-3 pr-10 text-sm text-[#242424] focus:ring-2 focus:ring-[#0A3D3A] cursor-pointer">
                              <SelectValue placeholder="Select max jobs" />
                            </SelectTrigger>
                            <SelectContent className="w-[calc(100%-2rem)] max-w-[280px]">
                              <SelectItem value="1">1 job per day</SelectItem>
                              <SelectItem value="2">2 jobs per day</SelectItem>
                              <SelectItem value="3">3 jobs per day</SelectItem>
                              <SelectItem value="4">4 jobs per day</SelectItem>
                              <SelectItem value="5">5 jobs per day</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-[#989898] mt-1">
                            This helps balance your workload and prevents over-scheduling.
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#242424] mb-2">
                            Notification Method
                          </label>
                          <Select
                            value={notificationMethod}
                            onValueChange={setNotificationMethod}
                          >
                            <SelectTrigger className="w-full h-11 rounded-lg border border-[#D3D3D3] bg-white pl-3 pr-10 text-sm text-[#242424] focus:ring-2 focus:ring-[#0A3D3A] cursor-pointer">
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent className="w-[calc(100%-2rem)] max-w-[280px]">
                              <SelectItem value="both">Both Email &amp; SMS</SelectItem>
                              <SelectItem value="email">Email Only</SelectItem>
                              <SelectItem value="sms">SMS Only</SelectItem>
                              <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-[#989898] mt-1">
                            How you receive new job assignments.
                          </p>
                        </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="h-11 px-5 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold w-full"
                  >
                    <X size={15} className="mr-2" />
                    Cancel
                  </Button>
                  <Button className="h-11 px-5 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold w-full">
                    <Save size={15} className="mr-2" />
                    Save Availability
                  </Button>
                </div>
      </div>
    </EngineerLayout>
  );
};

export default EngineerAvailability;