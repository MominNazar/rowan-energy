import { useState } from "react";
import {
  User,
  Lock,
  CalendarDays,
  Info,
  X,
  MapPin,
  Phone,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SurveyProLayout } from "@/components/layout/SurveyProLayout";

const CustomerProfile = () => {
  const [fullName, setFullName] = useState("John Smith");
  const [email, setEmail] = useState("john.smith@company.com");
  const [phone, setPhone] = useState("+44 123 456 7890");
  const [company, setCompany] = useState("Renewable Energy Solutions Ltd");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [googleConnected, setGoogleConnected] = useState(false);

  return (
    <SurveyProLayout
      title="My Profile"
      subtitle="Manage your account settings and preferences"
    >
      {/* Personal Information */}
      <div className="bg-white rounded-xl border border-[#D3D3D3] p-5 sm:p-6 lg:p-8 mb-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#D3D3D3]">
          <div className="w-10 h-10 rounded-lg bg-[#EAEAEA] flex items-center justify-center">
            <User size={20} className="text-[#083F3C]" />
          </div>
          <div>
            <h2 className="font-display text-base sm:text-lg font-semibold text-[#242424]">
              Personal Information
            </h2>
            <p className="text-xs sm:text-sm text-[#989898]">
              Update your basic account details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="space-y-2">
            <Label className="text-xs sm:text-sm font-medium text-[#242424]">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-11 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs sm:text-sm font-medium text-[#242424]">
              Email Address
            </Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
              className="h-11 border-[#D3D3D3] rounded-lg text-sm bg-[#F5F5F5] text-[#505050] focus-visible:ring-0 cursor-not-allowed"
            />
            <p className="text-xs text-[#989898]">
              Email cannot be changed as it's used for login
            </p>
          </div>
          <div className="space-y-2">
            <Label className="text-xs sm:text-sm font-medium text-[#242424]">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs sm:text-sm font-medium text-[#242424]">
              Company
            </Label>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="h-11 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C]"
            />
          </div>
        </div>

        <div className="flex justify-center sm:justify-end mt-6">
          <Button className="h-10 px-5 bg-[#083F3C] hover:bg-[#083F3C]/90 text-white rounded-lg text-sm font-semibold">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl border border-[#D3D3D3] p-5 sm:p-6 lg:p-8 mb-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#D3D3D3]">
          <div className="w-10 h-10 rounded-lg bg-[#EAEAEA] flex items-center justify-center">
            <Lock size={20} className="text-[#083F3C]" />
          </div>
          <div>
            <h2 className="font-display text-base sm:text-lg font-semibold text-[#242424]">
              Change Password
            </h2>
            <p className="text-xs sm:text-sm text-[#989898]">
              Update your account password for security
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs sm:text-sm font-medium text-[#242424]">
              Current Password <span className="text-red-500">*</span>
            </Label>
            <Input
              type="password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="h-11 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C]"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-medium text-[#242424]">
                New Password <span className="text-red-500">*</span>
              </Label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-11 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-medium text-[#242424]">
                Confirm Password <span className="text-red-500">*</span>
              </Label>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C]"
              />
            </div>
          </div>
          <div className="flex justify-center sm:justify-end">
            <Button className="h-10 px-5 bg-[#083F3C] hover:bg-[#083F3C]/90 text-white rounded-lg text-sm font-semibold">
              <Lock size={15} className="mr-2" />
              Update Password
            </Button>
          </div>
        </div>
      </div>

      {/* Google Calendar Integration */}
      <div className="bg-white rounded-xl border border-[#D3D3D3] p-5 sm:p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#D3D3D3]">
          <div className="w-10 h-10 rounded-lg bg-[#EAEAEA] flex items-center justify-center">
            <CalendarDays size={20} className="text-[#083F3C]" />
          </div>
          <div>
            <h2 className="font-display text-base sm:text-lg font-semibold text-[#242424]">
              Google Calendar Integration
            </h2>
            <p className="text-xs sm:text-sm text-[#989898]">
              Automatically receive calendar invites for your scheduled surveys
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-[#E8F6F3] rounded-lg p-4 mb-5 flex gap-3">
          <Info size={18} className="text-[#083F3C] shrink-0 mt-0.5" />
          <p className="text-sm text-[#242424] leading-relaxed">
            <span className="font-semibold">
              Want to receive calendar invites for your scheduled surveys?
            </span>{" "}
            When you connect your Google Calendar, we'll automatically create
            events for your bookings with all relevant details including location,
            time, and contact information.
          </p>
        </div>

        {/* Connection Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#D3D3D3] rounded-lg p-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#EAEAEA] flex items-center justify-center">
              {googleConnected ? (
                <CalendarDays size={16} className="text-[#083F3C]" />
              ) : (
                <X size={14} className="text-[#989898]" />
              )}
            </div>
            <div>
              <p className="font-semibold text-[#242424] text-sm">
                {googleConnected ? "Connected" : "Not Connected"}
              </p>
              <p className="text-xs text-[#989898] mt-0.5">
                {googleConnected
                  ? "Google Calendar is connected"
                  : "Connect your Google Calendar to receive automatic event invites."}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setGoogleConnected(!googleConnected)}
            className={`h-10 px-4 rounded-lg text-sm font-semibold whitespace-nowrap ${
              googleConnected
                ? "bg-[#EAEAEA] text-[#242424] hover:bg-[#D3D3D3]"
                : "bg-[#083F3C] hover:bg-[#083F3C]/90 text-white"
            }`}
          >
            {googleConnected ? "Disconnect" : "Connect Google Calendar"}
          </Button>
        </div>

        {/* Integration Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <CalendarDays size={18} className="text-[#083F3C] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#242424] text-sm">Automatic Events</p>
              <p className="text-xs text-[#989898] mt-0.5">
                Survey details added to your calendar
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-[#083F3C] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#242424] text-sm">Location Details</p>
              <p className="text-xs text-[#989898] mt-0.5">
                Site address and access instructions
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <User size={18} className="text-[#083F3C] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#242424] text-sm">Contact Information</p>
              <p className="text-xs text-[#989898] mt-0.5">
                Engineer and site contact details
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Link2 size={18} className="text-[#083F3C] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#242424] text-sm">Quick Access</p>
              <p className="text-xs text-[#989898] mt-0.5">
                Direct link to booking details
              </p>
            </div>
          </div>
        </div>
      </div>
    </SurveyProLayout>
  );
};

export default CustomerProfile;