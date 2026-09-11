export interface JobDetail {
  id: string;
  site: string;
  region: string;
  engineer: string;
  engineerRole: string;
  engineerInitials: string;
  engineerEmail: string;
  engineerPhone: string;
  preferredRegions: string;
  address: string;
  customer: string;
  scheduledDate: string;
  duration: string;
  bufferTime: string;
  assetType: string;
  systemSize: string;
  purpose: string;
  jobSource: string;
  linkedLead: string;
  specialRequirements: string;
  upload: string;
  status: string;
  files: { name: string; status: "Missing" | "Pending" | "Uploaded" }[];
}

export const jobs: JobDetail[] = [
  {
    id: "#1052",
    site: "Greenfield Solar Farm",
    region: "North England",
    engineer: "Alex Khan",
    engineerRole: "Senior Drone Engineer",
    engineerInitials: "AK",
    engineerEmail: "alex.khan@company.com",
    engineerPhone: "+44 7700 900123",
    preferredRegions: "North England, East Midlands",
    address: "1 Greenfield Lane, York YO30 7GH",
    customer: "Greenfield Co",
    scheduledDate: "July 25, 2025 - 10:00 AM to 11:30 AM",
    duration: "1.5 hours (estimated)",
    bufferTime: "30 minutes",
    assetType: "Solar Farm",
    systemSize: "5.2 MW",
    purpose: "Maintenance Inspection",
    jobSource: "Chatbot Booking",
    linkedLead: "View Lead #2091",
    specialRequirements: "Standard inspection protocol",
    upload: "Pending",
    status: "Scheduled",
    files: [
      { name: "Thermal Imagery", status: "Missing" },
      { name: "RGB Photos", status: "Missing" },
      { name: "Video", status: "Missing" },
      { name: "Field Notes", status: "Missing" },
    ],
  },
  {
    id: "#1051",
    site: "WindTech Industrial",
    region: "West Midlands",
    engineer: "Fatima Ahmed",
    engineerRole: "Senior Drone Engineer",
    engineerInitials: "FA",
    engineerEmail: "fatima.ahmed@company.com",
    engineerPhone: "+44 7700 900456",
    preferredRegions: "West Midlands, East Midlands",
    address: "42 Industrial Park, Birmingham B1 1AA",
    customer: "WindTech Ltd",
    scheduledDate: "July 24, 2025 - 14:00 PM to 15:30 PM",
    duration: "1.5 hours (estimated)",
    bufferTime: "30 minutes",
    assetType: "Wind Turbine",
    systemSize: "2.4 MW",
    purpose: "Maintenance Inspection",
    jobSource: "Form",
    linkedLead: "View Lead #2089",
    specialRequirements: "High wind safety checklist required",
    upload: "Pending",
    status: "In Progress",
    files: [
      { name: "Thermal Imagery", status: "Pending" },
      { name: "RGB Photos", status: "Missing" },
      { name: "Video", status: "Missing" },
      { name: "Field Notes", status: "Missing" },
    ],
  },
  {
    id: "#1050",
    site: "SolarMax Distribution",
    region: "East Midlands",
    engineer: "Owen Williams",
    engineerRole: "Senior Drone Engineer",
    engineerInitials: "OW",
    engineerEmail: "owen.williams@company.com",
    engineerPhone: "+44 7700 900789",
    preferredRegions: "East Midlands, South England",
    address: "8 Distribution Way, Leicester LE1 1AA",
    customer: "SolarMax",
    scheduledDate: "July 23, 2025 - 09:00 AM to 10:30 AM",
    duration: "1.5 hours (estimated)",
    bufferTime: "30 minutes",
    assetType: "Solar Farm",
    systemSize: "4.1 MW",
    purpose: "Maintenance Inspection",
    jobSource: "Chatbot Booking",
    linkedLead: "View Lead #2085",
    specialRequirements: "None",
    upload: "Uploaded",
    status: "Completed",
    files: [
      { name: "Thermal Imagery", status: "Uploaded" },
      { name: "RGB Photos", status: "Uploaded" },
      { name: "Video", status: "Pending" },
      { name: "Field Notes", status: "Uploaded" },
    ],
  },
  {
    id: "#1049",
    site: "EcoEnergy Plant",
    region: "London",
    engineer: "Sarah Mitchell",
    engineerRole: "Senior Drone Engineer",
    engineerInitials: "SM",
    engineerEmail: "sarah.mitchell@company.com",
    engineerPhone: "+44 7700 900456",
    preferredRegions: "London, South England",
    address: "142 Industrial Way, London E14 9SJ",
    customer: "Lisa Chen",
    scheduledDate: "July 23, 2025 - 13:00 PM to 14:30 PM",
    duration: "1.5 hours (estimated)",
    bufferTime: "30 minutes",
    assetType: "Solar Farm",
    systemSize: "3.8 MW",
    purpose: "Maintenance Inspection",
    jobSource: "Chatbot Booking",
    linkedLead: "View Lead #2087",
    specialRequirements: "High priority - compliance deadline approaching",
    upload: "Missing",
    status: "Revisit Needed",
    files: [
      { name: "Thermal Imagery", status: "Missing" },
      { name: "RGB Photos", status: "Missing" },
      { name: "Video", status: "Pending" },
      { name: "Field Notes", status: "Missing" },
    ],
  },
  {
    id: "#1048",
    site: "GreenTech Solutions",
    region: "South England",
    engineer: "Alex Khan",
    engineerRole: "Senior Drone Engineer",
    engineerInitials: "AK",
    engineerEmail: "alex.khan@company.com",
    engineerPhone: "+44 7700 900123",
    preferredRegions: "South England, London",
    address: "22 Greenway, Portsmouth PO1 1AA",
    customer: "GreenTech",
    scheduledDate: "July 22, 2025 - 10:00 AM to 11:30 AM",
    duration: "1.5 hours (estimated)",
    bufferTime: "30 minutes",
    assetType: "Solar Farm",
    systemSize: "2.9 MW",
    purpose: "Maintenance Inspection",
    jobSource: "Form",
    linkedLead: "View Lead #2082",
    specialRequirements: "Standard inspection protocol",
    upload: "Pending",
    status: "Scheduled",
    files: [
      { name: "Thermal Imagery", status: "Missing" },
      { name: "RGB Photos", status: "Missing" },
      { name: "Video", status: "Missing" },
      { name: "Field Notes", status: "Missing" },
    ],
  },
];
