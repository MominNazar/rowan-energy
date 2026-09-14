import { Link, useNavigate, useParams } from "react-router-dom";
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
import { showError, showSuccess } from "@/utils/toast";

type BookingDetail = {
  id: string;
  siteName: string;
  location: string;
  surveyType: string;
  date: string;
  time: string;
  duration: string;
  status: string;
  statusType: "scheduled" | "in-progress" | "completed";
  reportReady: boolean;
  engineer: {
    initials: string;
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  contact: {
    name: string;
    position: string;
    phone: string;
    email: string;
  };
  accessInstructions: string;
  purpose: string;
  notes: string;
};

const mockBookings: BookingDetail[] = [
  {
    id: "1",
    siteName: "Downtown Office Complex",
    location: "123 Business Street, Downtown District, City 12345",
    surveyType: "Building Survey",
    date: "March 15, 2025",
    time: "10:00 AM - 2:00 PM",
    duration: "Approximately 4 hours",
    status: "Scheduled",
    statusType: "scheduled",
    reportReady: false,
    engineer: {
      initials: "JM",
      name: "John Mitchell",
      title: "Senior Building Surveyor",
      email: "john.mitchell@surveypro.com",
      phone: "+1 (555) 123-4567",
    },
    contact: {
      name: "Sarah Williams",
      position: "Facilities Manager",
      phone: "+1 (555) 987-6543",
      email: "s.williams@downtownoffice.com",
    },
    accessInstructions:
      "Please report to the main reception on the ground floor. Ask for Sarah Williams or mention the building survey appointment. Security will provide access cards and escort to all required areas. Parking is available in the underground garage - use visitor spaces 1-5.",
    purpose:
      "Comprehensive building condition assessment for insurance renewal purposes. Focus on structural integrity, HVAC systems, electrical installations, and general building maintenance requirements.",
    notes:
      "Please pay special attention to the roof area as there have been minor leak reports. Access to server room on 3rd floor required - will need IT escort for security protocols.",
  },
  {
    id: "2",
    siteName: "Riverside Commercial Center",
    location: "88 River Road, Riverside District, City 12346",
    surveyType: "Structural Survey",
    date: "March 8, 2025",
    time: "2:00 PM - 5:00 PM",
    duration: "Approximately 3 hours",
    status: "In Progress",
    statusType: "in-progress",
    reportReady: false,
    engineer: {
      initials: "AK",
      name: "Aisha Khan",
      title: "Structural Engineer",
      email: "aisha.khan@surveypro.com",
      phone: "+1 (555) 234-5678",
    },
    contact: {
      name: "Tom Bradley",
      position: "Site Supervisor",
      phone: "+1 (555) 876-5432",
      email: "t.bradley@riverside.com",
    },
    accessInstructions:
      "Enter via the service gate on River Road. Check in with security and request Tom Bradley. Hard hats required in warehouse zones.",
    purpose:
      "Structural integrity review of load-bearing walls and roof trusses ahead of planned expansion.",
    notes: "Scaffolding may be present on the east elevation — coordinate with site team.",
  },
  {
    id: "3",
    siteName: "Tech Park Building A",
    location: "1 Innovation Drive, Tech Park, City 12347",
    surveyType: "Condition Survey",
    date: "February 28, 2025",
    time: "9:30 AM - 1:30 PM",
    duration: "Approximately 4 hours",
    status: "Completed",
    statusType: "completed",
    reportReady: true,
    engineer: {
      initials: "RL",
      name: "Ryan Lopez",
      title: "Condition Surveyor",
      email: "ryan.lopez@surveypro.com",
      phone: "+1 (555) 345-6789",
    },
    contact: {
      name: "Emily Chen",
      position: "Operations Lead",
      phone: "+1 (555) 765-4321",
      email: "e.chen@techpark.com",
    },
    accessInstructions:
      "Visitor parking in Lot B. Sign in at Building A lobby and collect a visitor badge from Emily Chen.",
    purpose:
      "Full condition survey covering HVAC, fire safety systems, and façade cladding.",
    notes: "Report finalized and available for download.",
  },
  {
    id: "4",
    siteName: "Westfield Shopping Mall",
    location: "500 Westfield Avenue, Retail Quarter, City 12348",
    surveyType: "Building Survey",
    date: "March 22, 2025",
    time: "11:00 AM - 3:00 PM",
    duration: "Approximately 4 hours",
    status: "Scheduled",
    statusType: "scheduled",
    reportReady: false,
    engineer: {
      initials: "JM",
      name: "John Mitchell",
      title: "Senior Building Surveyor",
      email: "john.mitchell@surveypro.com",
      phone: "+1 (555) 123-4567",
    },
    contact: {
      name: "Priya Patel",
      position: "Mall Manager",
      phone: "+1 (555) 654-3210",
      email: "p.patel@westfieldmall.com",
    },
    accessInstructions:
      "Meet at the management office near Entrance 2. After-hours access will be arranged for roof inspection.",
    purpose: "Routine building survey for lease renewal documentation.",
    notes: "Avoid peak shopping hours in food court areas if possible.",
  },
  {
    id: "5",
    siteName: "Industrial Complex B",
    location: "42 Industry Lane, Industrial Park, City 12349",
    surveyType: "Safety Survey",
    date: "February 15, 2025",
    time: "1:30 PM - 4:30 PM",
    duration: "Approximately 3 hours",
    status: "Completed",
    statusType: "completed",
    reportReady: true,
    engineer: {
      initials: "NS",
      name: "Nora Singh",
      title: "Safety Surveyor",
      email: "nora.singh@surveypro.com",
      phone: "+1 (555) 456-7890",
    },
    contact: {
      name: "Carlos Mendez",
      position: "HSE Officer",
      phone: "+1 (555) 543-2109",
      email: "c.mendez@industrialb.com",
    },
    accessInstructions:
      "PPE required. Check in at Gate 3 and wait for HSE escort before entering production floors.",
    purpose: "Safety compliance survey covering fire exits, signage, and equipment guarding.",
    notes: "Report ready for customer download.",
  },
  {
    id: "6",
    siteName: "Harbor View Residences",
    location: "15 Harbor Lane, Waterfront, City 12350",
    surveyType: "Condition Survey",
    date: "March 5, 2025",
    time: "9:00 AM - 12:00 PM",
    duration: "Approximately 3 hours",
    status: "Scheduled",
    statusType: "scheduled",
    reportReady: false,
    engineer: {
      initials: "RL",
      name: "Ryan Lopez",
      title: "Condition Surveyor",
      email: "ryan.lopez@surveypro.com",
      phone: "+1 (555) 345-6789",
    },
    contact: {
      name: "Lisa Park",
      position: "Property Manager",
      phone: "+1 (555) 111-2222",
      email: "l.park@harborview.com",
    },
    accessInstructions: "Check in at the concierge desk. Visitor parking in Level P1.",
    purpose: "Condition survey of residential common areas and roof membrane.",
    notes: "Quiet hours apply after 10 AM in residential wings.",
  },
  {
    id: "7",
    siteName: "Central Medical Plaza",
    location: "200 Health Blvd, Medical District, City 12351",
    surveyType: "Building Survey",
    date: "January 20, 2025",
    time: "10:30 AM - 2:30 PM",
    duration: "Approximately 4 hours",
    status: "Completed",
    statusType: "completed",
    reportReady: true,
    engineer: {
      initials: "JM",
      name: "John Mitchell",
      title: "Senior Building Surveyor",
      email: "john.mitchell@surveypro.com",
      phone: "+1 (555) 123-4567",
    },
    contact: {
      name: "Dr. Helen Cho",
      position: "Facilities Director",
      phone: "+1 (555) 222-3333",
      email: "h.cho@centralmedical.com",
    },
    accessInstructions: "Enter via Staff Entrance B. Infection-control badge required.",
    purpose: "Building survey for compliance and maintenance planning.",
    notes: "Report available in the Reports section.",
  },
  {
    id: "8",
    siteName: "Northgate Logistics Hub",
    location: "77 Freight Way, Northgate, City 12352",
    surveyType: "Structural Survey",
    date: "March 12, 2025",
    time: "1:00 PM - 4:00 PM",
    duration: "Approximately 3 hours",
    status: "In Progress",
    statusType: "in-progress",
    reportReady: false,
    engineer: {
      initials: "AK",
      name: "Aisha Khan",
      title: "Structural Engineer",
      email: "aisha.khan@surveypro.com",
      phone: "+1 (555) 234-5678",
    },
    contact: {
      name: "Mike Ortega",
      position: "Warehouse Lead",
      phone: "+1 (555) 333-4444",
      email: "m.ortega@northgate.com",
    },
    accessInstructions: "Report to Gate A security. Hi-vis vest mandatory on site.",
    purpose: "Structural review of mezzanine flooring and racking anchors.",
    notes: "Forklift traffic will be paused in Zone C during inspection.",
  },
  {
    id: "9",
    siteName: "Lakeside Retail Park",
    location: "9 Lakeside Drive, Retail Park, City 12353",
    surveyType: "Safety Survey",
    date: "February 5, 2025",
    time: "3:00 PM - 6:00 PM",
    duration: "Approximately 3 hours",
    status: "Completed",
    statusType: "completed",
    reportReady: true,
    engineer: {
      initials: "NS",
      name: "Nora Singh",
      title: "Safety Surveyor",
      email: "nora.singh@surveypro.com",
      phone: "+1 (555) 456-7890",
    },
    contact: {
      name: "Amy Brooks",
      position: "Centre Manager",
      phone: "+1 (555) 444-5555",
      email: "a.brooks@lakesideretail.com",
    },
    accessInstructions: "Meet at the management suite above Unit 12.",
    purpose: "Fire safety and egress compliance survey.",
    notes: "Report ready for download.",
  },
  {
    id: "10",
    siteName: "Summit Corporate Tower",
    location: "100 Summit Ave, Business District, City 12354",
    surveyType: "Building Survey",
    date: "April 2, 2025",
    time: "8:30 AM - 12:30 PM",
    duration: "Approximately 4 hours",
    status: "Scheduled",
    statusType: "scheduled",
    reportReady: false,
    engineer: {
      initials: "JM",
      name: "John Mitchell",
      title: "Senior Building Surveyor",
      email: "john.mitchell@surveypro.com",
      phone: "+1 (555) 123-4567",
    },
    contact: {
      name: "Daniel Reed",
      position: "Building Engineer",
      phone: "+1 (555) 555-6666",
      email: "d.reed@summittower.com",
    },
    accessInstructions: "Lobby check-in; elevator access to mechanical floors via escort.",
    purpose: "Full building survey prior to refinance appraisal.",
    notes: "Roof access requires prior notice to security.",
  },
  {
    id: "11",
    siteName: "Eastside Data Center",
    location: "3 Server Court, Eastside, City 12355",
    surveyType: "Condition Survey",
    date: "January 10, 2025",
    time: "11:30 AM - 3:30 PM",
    duration: "Approximately 4 hours",
    status: "Completed",
    statusType: "completed",
    reportReady: true,
    engineer: {
      initials: "RL",
      name: "Ryan Lopez",
      title: "Condition Surveyor",
      email: "ryan.lopez@surveypro.com",
      phone: "+1 (555) 345-6789",
    },
    contact: {
      name: "Jordan Lee",
      position: "Facilities Engineer",
      phone: "+1 (555) 666-7777",
      email: "j.lee@eastsidedc.com",
    },
    accessInstructions: "Two-factor visitor clearance required 24h in advance.",
    purpose: "Condition survey of cooling plant and UPS rooms.",
    notes: "Photos restricted in white-space areas.",
  },
  {
    id: "12",
    siteName: "Greenfield Campus Block C",
    location: "45 Campus Green, Greenfield, City 12356",
    surveyType: "Structural Survey",
    date: "March 28, 2025",
    time: "2:30 PM - 5:30 PM",
    duration: "Approximately 3 hours",
    status: "Scheduled",
    statusType: "scheduled",
    reportReady: false,
    engineer: {
      initials: "AK",
      name: "Aisha Khan",
      title: "Structural Engineer",
      email: "aisha.khan@surveypro.com",
      phone: "+1 (555) 234-5678",
    },
    contact: {
      name: "Olivia Grant",
      position: "Campus Operations",
      phone: "+1 (555) 777-8888",
      email: "o.grant@greenfield.edu",
    },
    accessInstructions: "Park in Visitor Lot C and collect keys from Block C reception.",
    purpose: "Structural survey of Block C lecture halls and plant room.",
    notes: "Avoid exam week corridors between 3–4 PM if possible.",
  },
];

const statusStyles: Record<string, string> = {
  scheduled: "bg-[#E8F6F3] text-[#083F3C]",
  "in-progress": "bg-[#FEF3C7] text-[#B45309]",
  completed: "bg-[#D1FAE5] text-[#065F46]",
};

const StatusIcon = ({ statusType }: { statusType: string }) => {
  if (statusType === "completed") return <CheckCircle2 size={14} />;
  if (statusType === "in-progress") return <Clock size={14} />;
  return <CheckCircle2 size={14} />;
};

const BookingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const booking = mockBookings.find((b) => b.id === id);

  if (!booking) {
    return (
      <SurveyProLayout
        title="Booking Details"
        subtitle="Booking not found"
        backTo="/customer/bookings"
      >
        <div className="bg-white rounded-xl border border-[#D3D3D3] p-8 text-center">
          <p className="text-sm text-[#505050] mb-4">
            No booking found{id ? ` for ID “${id}”` : ""}.
          </p>
          <Link
            to="/customer/bookings"
            className="text-[#083F3C] font-medium text-sm hover:underline"
          >
            ← Back to My Bookings
          </Link>
        </div>
      </SurveyProLayout>
    );
  }

  const handleViewReport = () => {
    if (booking.reportReady) {
      navigate("/customer/reports");
      showSuccess("Opening reports");
    } else {
      showError("Report not available yet");
    }
  };

  return (
    <SurveyProLayout
      title="Booking Details"
      subtitle={booking.siteName}
      backTo="/customer/bookings"
    >
      {/* Status pill */}
      <div className="mb-6">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
            statusStyles[booking.statusType]
          }`}
        >
          <StatusIcon statusType={booking.statusType} />
          {booking.status}
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
              <p className="font-medium text-[#242424]">{booking.siteName}</p>
            </div>
            <div>
              <p className="text-xs text-[#989898] mb-1">Location</p>
              <p className="font-medium text-[#242424]">{booking.location}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs text-[#989898] mb-1">Survey Type</p>
              <p className="font-medium text-[#242424]">{booking.surveyType}</p>
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
              <p className="font-medium text-[#242424]">{booking.date}</p>
            </div>
            <div>
              <p className="text-xs text-[#989898] mb-1">Time</p>
              <p className="font-medium text-[#242424]">{booking.time}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs text-[#989898] mb-1">Duration</p>
              <p className="font-medium text-[#242424]">{booking.duration}</p>
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
              {booking.engineer.initials}
            </div>
            <div className="min-w-0 text-sm">
              <p className="font-medium text-[#242424]">{booking.engineer.name}</p>
              <p className="text-[#505050] text-xs mt-0.5">{booking.engineer.title}</p>
              <p className="text-[#989898] text-xs mt-1">{booking.engineer.email}</p>
              <p className="text-[#989898] text-xs">{booking.engineer.phone}</p>
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
              <p className="font-medium text-[#242424]">{booking.contact.name}</p>
            </div>
            <div>
              <p className="text-xs text-[#989898] mb-1">Position</p>
              <p className="font-medium text-[#242424]">{booking.contact.position}</p>
            </div>
            <div>
              <p className="text-xs text-[#989898] mb-1">Phone</p>
              <p className="font-medium text-[#242424]">{booking.contact.phone}</p>
            </div>
            <div>
              <p className="text-xs text-[#989898] mb-1">Email</p>
              <p className="font-medium text-[#242424] truncate">{booking.contact.email}</p>
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
          {booking.accessInstructions}
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
          <p className="text-sm text-[#505050] leading-relaxed">{booking.purpose}</p>
        </div>
        <div className="bg-white rounded-xl border border-[#D3D3D3] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <MessageSquare size={18} className="text-[#083F3C]" />
            <h2 className="font-display text-base sm:text-lg font-semibold text-[#242424]">
              Notes &amp; Special Requests
            </h2>
          </div>
          <p className="text-sm text-[#505050] leading-relaxed">{booking.notes}</p>
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
              {booking.reportReady ? (
                <>
                  <p className="text-sm font-medium text-[#242424]">Report available</p>
                  <p className="text-xs text-[#989898] mt-0.5">
                    Ready to view and download
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-[#242424]">
                    Report not yet available
                  </p>
                  <p className="text-xs text-[#989898] mt-0.5">
                    Will be available after survey completion
                  </p>
                </>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-xs sm:text-sm whitespace-nowrap"
            onClick={handleViewReport}
          >
            View Report
          </Button>
        </div>
      </div>
    </SurveyProLayout>
  );
};

export default BookingDetails;
