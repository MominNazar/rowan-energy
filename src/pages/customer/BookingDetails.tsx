import { Link } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  KeyRound,
  MapPin,
  MessageSquare,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SurveyProLayout } from "@/components/layout/SurveyProLayout";

const BookingDetails = () => {
  return (
    <SurveyProLayout
      title="Booking Details"
      subtitle="Downtown Office Complex"
      backTo="/customer/bookings"
    >
      {/* Status pill */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#E8F6F3] text-[#083F3C]">
          <CheckCircle2 size={14} />
          Scheduled
        </span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-6">
        {/* Site Information */}
        <div className="bg-white rounded-xl border border-[#D3D3D3] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <MapPin size={18} className="text-[#083F3C]" />
            <h2 className="font-display text-base sm:text-lg font-semibold text-[#242424]">
              Site Information
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div>
              <p className="text-xs text-[#989898] mb-1">Site Name</p>
              <p className="font-medium text-[#242424]">Downtown Office Complex</p>
            </div>
            <div>
              <p className="text-xs text-[#989898] mb-1">Location</p>
              <p className="font-medium text-[#242424]">123 Business Street, Downtown District, City 12345</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs text-[#989898] mb-1">Survey Type</p>
              <p className="font-medium text-[#242424]">Building Survey</p>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-xl border border-[#D3D3D3] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <CalendarDays size={18} className="text-[#083F3C]" />
            <h2 className="font-display text-base sm:text-lg font-semibold text-[#242424]">
              Schedule
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div>
              <p className="text-xs text-[#989898] mb-1">Survey Date</p>
              <p className="font-medium text-[#242424]">March 15, 2025</p>
            </div>
            <div>
              <p className="text-xs text-[#989898] mb-1">Time</p>
              <p className="font-medium text-[#242424]">10:00 AM - 2:00 PM</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs text-[#989898] mb-1">Duration</p>
              <p className="font-medium text-[#242424]">Approximately 4 hours</p>
            </div>
          </div>
        </div>

        {/* Assigned Engineer */}
        <div className="bg-white rounded-xl border border-[#D3D3D3] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <User size={18} className="text-[#083F3C]" />
            <h2 className="font-display text-base sm:text-lg font-semibold text-[#242424]">
              Assigned Engineer
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#D1FAE5] text-[#083F3C] font-semibold flex items-center justify-center shrink-0">
              JM
            </div>
            <div className="min-w-0 text-sm">
              <p className="font-medium text-[#242424]">John Mitchell</p>
              <p className="text-[#505050] text-xs mt-0.5">Senior Building Surveyor</p>
              <p className="text-[#989898] text-xs mt-1">john.mitchell@surveypro.com</p>
              <p className="text-[#989898] text-xs">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Site Contact */}
        <div className="bg-white rounded-xl border border-[#D3D3D3] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <Users size={18} className="text-[#083F3C]" />
            <h2 className="font-display text-base sm:text-lg font-semibold text-[#242424]">
              Site Contact
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div>
              <p className="text-xs text-[#989898] mb-1">Name</p>
              <p className="font-medium text-[#242424]">Sarah Williams</p>
            </div>
            <div>
              <p className="text-xs text-[#989898] mb-1">Position</p>
              <p className="font-medium text-[#242424]">Facilities Manager</p>
            </div>
            <div>
              <p className="text-xs text-[#989898] mb-1">Phone</p>
              <p className="font-medium text-[#242424]">+1 (555) 987-6543</p>
            </div>
            <div>
              <p className="text-xs text-[#989898] mb-1">Email</p>
              <p className="font-medium text-[#242424] truncate">s.williams@downtownoffice.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Access Instructions */}
      <div className="bg-white rounded-xl border border-[#D3D3D3] p-5 sm:p-6 mb-6">
        <div className="flex items-center gap-2.5 mb-4">
          <KeyRound size={18} className="text-[#083F3C]" />
          <h2 className="font-display text-base sm:text-lg font-semibold text-[#242424]">
            Access Instructions
          </h2>
        </div>
        <p className="text-sm text-[#505050] leading-relaxed bg-[#EAEAEA] rounded-lg p-4">
          Please report to the main reception on the ground floor. Ask for Sarah
          Williams or mention the building survey appointment. Security will
          provide access cards and escort to all required areas. Parking is
          available in the underground garage - use visitor spaces 1-5.
        </p>
      </div>

      {/* Purpose & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-6">
        <div className="bg-white rounded-xl border border-[#D3D3D3] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <MessageSquare size={18} className="text-[#083F3C]" />
            <h2 className="font-display text-base sm:text-lg font-semibold text-[#242424]">
              Purpose of Survey
            </h2>
          </div>
          <p className="text-sm text-[#505050] leading-relaxed">
            Comprehensive building condition assessment for insurance renewal
            purposes. Focus on structural integrity, HVAC systems, electrical
            installations, and general building maintenance requirements.
          </p>
        </div>
        <div className="bg-white rounded-xl border border-[#D3D3D3] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <MessageSquare size={18} className="text-[#083F3C]" />
            <h2 className="font-display text-base sm:text-lg font-semibold text-[#242424]">
              Notes &amp; Special Requests
            </h2>
          </div>
          <p className="text-sm text-[#505050] leading-relaxed">
            Please pay special attention to the roof area as there have been
            minor leak reports. Access to server room on 3rd floor required -
            will need IT escort for security protocols.
          </p>
        </div>
      </div>

      {/* Survey Report */}
      <div className="bg-white rounded-xl border border-[#D3D3D3] p-5 sm:p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <FileText size={18} className="text-[#083F3C]" />
          <h2 className="font-display text-base sm:text-lg font-semibold text-[#242424]">
            Survey Report
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#EAEAEA] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <FileText size={18} className="text-[#989898]" />
            <div>
              <p className="text-sm font-medium text-[#242424]">Report not yet available</p>
              <p className="text-xs text-[#989898] mt-0.5">Will be available after survey completion</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-xs sm:text-sm whitespace-nowrap"
          >
            View Report
          </Button>
        </div>
      </div>
    </SurveyProLayout>
  );
};

export default BookingDetails;