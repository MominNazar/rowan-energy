import {
  useRef,
  useState,
  type ChangeEvent,
  type ComponentType,
} from "react";
import {
  Bot,
  CalendarDays,
  Cpu,
  Mic,
  PhoneIncoming,
  Play,
  RotateCcw,
  Save,
  Send,
  TestTube,
  Upload,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess } from "@/utils/toast";

const fieldLabel = "text-xs font-medium text-[#242424]";
const fieldControl =
  "h-10 mt-1 w-full min-w-0 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0";
const sectionCard =
  "bg-white rounded-xl border border-[#E0E0E0] p-3.5 sm:p-5 md:p-6 shadow-sm overflow-hidden";
const checkboxClass =
  "h-4 w-4 shrink-0 rounded border-[#D3D3D3] data-[state=checked]:bg-[#0A3D3A] data-[state=checked]:border-[#0A3D3A] data-[state=checked]:text-white";
const outlineFooterBtn =
  "h-10 w-full sm:w-auto px-3 sm:px-5 border-[#0A3D3A] text-[#0A3D3A] hover:bg-[#0A3D3A]/5 hover:text-[#0A3D3A] rounded-lg text-xs sm:text-sm font-semibold gap-2 bg-white shrink-0";
const primaryFooterBtn =
  "h-10 w-full sm:w-auto px-3 sm:px-5 bg-[#0A3D3A] hover:bg-[#083F3C] text-white rounded-lg text-xs sm:text-sm font-semibold gap-2 shrink-0";

const DEFAULT_SYSTEM_PROMPT = `You are a friendly and professional AI voice agent for a solar energy company. Your goal is to follow up with leads who previously requested a solar quote.

Guidelines:
- Greet the caller warmly and confirm you are calling about their solar quote enquiry.
- Keep responses concise and conversational — suitable for spoken dialogue.
- Confirm interest, answer basic product questions, and offer to book a site survey.
- If the caller is busy, politely offer to call back at a better time.
- Never invent pricing; offer to have an engineer provide a tailored quote.
- End calls politely and summarise next steps when a booking is made.`;

const DEFAULTS = {
  inboundName: "Solar Summer Outreach",
  inboundPhone: "+44 7700 900123",
  outboundName: "",
  outboundPhone: "+44 7700 900456",
  voiceTemplate: "solar-quote",
  startDate: "",
  timeStart: "09:00",
  timeEnd: "17:00",
  callSchedule: "immediately",
  senderEmail: "bookings@hoverlens.co.uk",
  calendar: "primary",
  interrupt: "low",
  responseSpeed: "auto",
  delay: "0",
  creativity: 25,
  callerId: "Bespoke Ins",
  provider: "groq",
  model: "llama-3.3-70b",
  temperature: "0.01",
  maxTokens: "250",
  topP: "0.9",
  systemPrompt: DEFAULT_SYSTEM_PROMPT,
  speechProvider: "deepgram",
  speechModel: "nova-2",
  ttsProvider: "elevenlabs",
  ttsModel: "eleven_flash_v2",
  sendConfirmation: true,
  ccEngineer: true,
  addInvite: true,
  doubleCall: false,
  vmDetection: true,
  campaignRunning: false,
};

const SectionHeader = ({
  icon: Icon,
  title,
  description,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}) => (
  <div className="flex items-start gap-2.5 sm:gap-3 mb-4 sm:mb-5">
    <div className="mt-0.5 flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F5F3] text-[#0A3D3A]">
      <Icon size={18} />
    </div>
    <div className="min-w-0 flex-1">
      <h2 className="font-display text-sm sm:text-base font-semibold text-[#242424] leading-snug">
        {title}
      </h2>
      <p className="text-[11px] sm:text-xs text-[#989898] mt-0.5 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const AdminSettings = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inboundName, setInboundName] = useState(DEFAULTS.inboundName);
  const [inboundPhone, setInboundPhone] = useState(DEFAULTS.inboundPhone);
  const [outboundName, setOutboundName] = useState(DEFAULTS.outboundName);
  const [outboundPhone, setOutboundPhone] = useState(DEFAULTS.outboundPhone);
  const [voiceTemplate, setVoiceTemplate] = useState(DEFAULTS.voiceTemplate);
  const [startDate, setStartDate] = useState(DEFAULTS.startDate);
  const [timeStart, setTimeStart] = useState(DEFAULTS.timeStart);
  const [timeEnd, setTimeEnd] = useState(DEFAULTS.timeEnd);
  const [callSchedule, setCallSchedule] = useState(DEFAULTS.callSchedule);
  const [senderEmail, setSenderEmail] = useState(DEFAULTS.senderEmail);
  const [calendar, setCalendar] = useState(DEFAULTS.calendar);
  const [interrupt, setInterrupt] = useState(DEFAULTS.interrupt);
  const [responseSpeed, setResponseSpeed] = useState(DEFAULTS.responseSpeed);
  const [delay, setDelay] = useState(DEFAULTS.delay);
  const [creativity, setCreativity] = useState(DEFAULTS.creativity);
  const [callerId, setCallerId] = useState(DEFAULTS.callerId);
  const [provider, setProvider] = useState(DEFAULTS.provider);
  const [model, setModel] = useState(DEFAULTS.model);
  const [temperature, setTemperature] = useState(DEFAULTS.temperature);
  const [maxTokens, setMaxTokens] = useState(DEFAULTS.maxTokens);
  const [topP, setTopP] = useState(DEFAULTS.topP);
  const [systemPrompt, setSystemPrompt] = useState(DEFAULTS.systemPrompt);
  const [speechProvider, setSpeechProvider] = useState(DEFAULTS.speechProvider);
  const [speechModel, setSpeechModel] = useState(DEFAULTS.speechModel);
  const [ttsProvider, setTtsProvider] = useState(DEFAULTS.ttsProvider);
  const [ttsModel, setTtsModel] = useState(DEFAULTS.ttsModel);
  const [sendConfirmation, setSendConfirmation] = useState(
    DEFAULTS.sendConfirmation,
  );
  const [ccEngineer, setCcEngineer] = useState(DEFAULTS.ccEngineer);
  const [addInvite, setAddInvite] = useState(DEFAULTS.addInvite);
  const [doubleCall, setDoubleCall] = useState(DEFAULTS.doubleCall);
  const [vmDetection, setVmDetection] = useState(DEFAULTS.vmDetection);
  const [campaignRunning, setCampaignRunning] = useState(
    DEFAULTS.campaignRunning,
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      showSuccess(`Selected file: ${file.name}`);
    }
  };

  const handleReset = () => {
    setInboundName(DEFAULTS.inboundName);
    setInboundPhone(DEFAULTS.inboundPhone);
    setOutboundName(DEFAULTS.outboundName);
    setOutboundPhone(DEFAULTS.outboundPhone);
    setVoiceTemplate(DEFAULTS.voiceTemplate);
    setStartDate(DEFAULTS.startDate);
    setTimeStart(DEFAULTS.timeStart);
    setTimeEnd(DEFAULTS.timeEnd);
    setCallSchedule(DEFAULTS.callSchedule);
    setSenderEmail(DEFAULTS.senderEmail);
    setCalendar(DEFAULTS.calendar);
    setInterrupt(DEFAULTS.interrupt);
    setResponseSpeed(DEFAULTS.responseSpeed);
    setDelay(DEFAULTS.delay);
    setCreativity(DEFAULTS.creativity);
    setCallerId(DEFAULTS.callerId);
    setProvider(DEFAULTS.provider);
    setModel(DEFAULTS.model);
    setTemperature(DEFAULTS.temperature);
    setMaxTokens(DEFAULTS.maxTokens);
    setTopP(DEFAULTS.topP);
    setSystemPrompt(DEFAULTS.systemPrompt);
    setSpeechProvider(DEFAULTS.speechProvider);
    setSpeechModel(DEFAULTS.speechModel);
    setTtsProvider(DEFAULTS.ttsProvider);
    setTtsModel(DEFAULTS.ttsModel);
    setSendConfirmation(DEFAULTS.sendConfirmation);
    setCcEngineer(DEFAULTS.ccEngineer);
    setAddInvite(DEFAULTS.addInvite);
    setDoubleCall(DEFAULTS.doubleCall);
    setVmDetection(DEFAULTS.vmDetection);
    setCampaignRunning(DEFAULTS.campaignRunning);
    if (fileInputRef.current) fileInputRef.current.value = "";
    showSuccess("Settings reset to defaults");
  };

  return (
    <AdminLayout
      title="Settings"
      subtitle="Configure system behavior, integrations, and AI settings"
    >
      <div className="-m-3 sm:-m-5 md:-m-6 flex min-h-[calc(100vh-5rem)] flex-col min-w-0 w-full max-w-full overflow-x-hidden">
        <div className="flex-1 space-y-3.5 sm:space-y-5 p-3 sm:p-5 md:p-6 pb-6 min-w-0">
          {/* A. Inbound Campaign Settings */}
          <section className={sectionCard}>
            <SectionHeader
              icon={PhoneIncoming}
              title="Inbound Campaign Settings"
              description="Configure how inbound calls are labeled and routed to your team."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-w-0">
              <div>
                <Label className={fieldLabel}>Campaign Name</Label>
                <Input
                  value={inboundName}
                  onChange={(e) => setInboundName(e.target.value)}
                  className={fieldControl}
                />
              </div>
              <div>
                <Label className={fieldLabel}>Campaign Phone Number</Label>
                <Input
                  value={inboundPhone}
                  onChange={(e) => setInboundPhone(e.target.value)}
                  className={fieldControl}
                />
              </div>
            </div>
          </section>

          {/* B. Outbound Campaign Settings */}
          <section className={sectionCard}>
            <SectionHeader
              icon={Send}
              title="Outbound Campaign Settings"
              description="Set up dialing campaigns, contact lists, and call windows."
            />
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-w-0">
                <div>
                  <Label className={fieldLabel}>Campaign Name</Label>
                  <Input
                    value={outboundName}
                    onChange={(e) => setOutboundName(e.target.value)}
                    placeholder="e.g., July Follow-Up - Solar North"
                    className={fieldControl}
                  />
                </div>
                <div>
                  <Label className={fieldLabel}>Outbound Phone Number</Label>
                  <Input
                    value={outboundPhone}
                    onChange={(e) => setOutboundPhone(e.target.value)}
                    className={fieldControl}
                  />
                  <p className="text-[10px] text-[#989898] mt-1">
                    Used as caller ID for this campaign.
                  </p>
                </div>
              </div>

              <div>
                <Label className={fieldLabel}>Upload Contact List (CSV)</Label>
                <div
                  className="mt-1 border-2 border-dashed border-[#D3D3D3] rounded-xl p-4 sm:p-8 flex flex-col items-center justify-center gap-2 hover:border-[#0A3D3A] transition-colors cursor-pointer bg-[#FAFAFA] text-center"
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      fileInputRef.current?.click();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    className="hidden"
                    id="csv-upload"
                    onChange={handleFileChange}
                  />
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5F3] text-[#0A3D3A]">
                    <Upload size={18} />
                  </div>
                  <p className="text-xs sm:text-sm text-[#505050] px-1">
                    Drop CSV file here or click to browse
                  </p>
                  <p className="text-[10px] text-[#989898] px-1 leading-relaxed">
                    CSV format: one column titled &quot;Phone Number&quot;
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-1 border-[#D3D3D3] text-[#505050] rounded-md text-xs h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    Choose File
                  </Button>
                </div>
              </div>

              <div>
                <Label className={fieldLabel}>Voice Flow Template</Label>
                <Select value={voiceTemplate} onValueChange={setVoiceTemplate}>
                  <SelectTrigger className={fieldControl}>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solar-quote">
                      Solar Quote Reminder
                    </SelectItem>
                    <SelectItem value="survey-booking">
                      Survey Booking Follow-Up
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-w-0">
                <div>
                  <Label className={fieldLabel}>Start Date</Label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="mm/dd/yyyy"
                    className={fieldControl}
                  />
                </div>
                <div className="min-w-0">
                  <Label className={fieldLabel}>Time Window</Label>
                  <div className="mt-1 flex flex-col min-[380px]:flex-row min-[380px]:items-center gap-2">
                    <Input
                      type="time"
                      value={timeStart}
                      onChange={(e) => setTimeStart(e.target.value)}
                      className="h-10 w-full min-w-0 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0"
                    />
                    <span className="text-xs text-[#989898] shrink-0 text-center min-[380px]:text-left">
                      to
                    </span>
                    <Input
                      type="time"
                      value={timeEnd}
                      onChange={(e) => setTimeEnd(e.target.value)}
                      className="h-10 w-full min-w-0 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:max-w-md min-w-0">
                <Label className={fieldLabel}>Call Schedule</Label>
                <Select value={callSchedule} onValueChange={setCallSchedule}>
                  <SelectTrigger className={fieldControl}>
                    <SelectValue placeholder="Select schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="scheduled">On Start Date</SelectItem>
                    <SelectItem value="business-hours">
                      Business Hours Only
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col min-[400px]:flex-row min-[400px]:flex-wrap items-stretch min-[400px]:items-center gap-2.5 sm:gap-3 pt-1">
                <Button
                  className="h-10 w-full min-[400px]:w-auto px-4 bg-[#0A3D3A] hover:bg-[#0A3D3A]/90 text-white rounded-lg text-sm font-semibold disabled:opacity-50"
                  disabled={campaignRunning}
                  onClick={() => {
                    setCampaignRunning(true);
                    showSuccess("Campaign started");
                  }}
                >
                  Start Campaign
                </Button>
                <Button
                  variant="outline"
                  className="h-10 w-full min-[400px]:w-auto px-4 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-semibold disabled:opacity-50"
                  disabled={!campaignRunning}
                  onClick={() => {
                    setCampaignRunning(false);
                    showSuccess("Campaign paused");
                  }}
                >
                  Pause Campaign
                </Button>
              </div>
            </div>
          </section>

          {/* C. Email & Calendar Integration */}
          <section className={sectionCard}>
            <SectionHeader
              icon={CalendarDays}
              title="Email & Calendar Integration"
              description="Connect Google Workspace for booking confirmations and calendar invites."
            />
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-[#242424] mb-3">
                  Google Workspace Integration
                </p>
                <div>
                  <Label className={fieldLabel}>Connect Google Account</Label>
                  <div className="mt-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 w-full sm:w-auto px-4 border-[#D3D3D3] text-[#242424] hover:bg-[#F5F5F5] rounded-lg text-sm font-medium gap-2"
                      onClick={() =>
                        showSuccess("Google account connected (demo)")
                      }
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Connect Account
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-w-0">
                <div>
                  <Label className={fieldLabel}>Sender Email</Label>
                  <Input
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className={fieldControl}
                  />
                </div>
                <div>
                  <Label className={fieldLabel}>Calendar Used</Label>
                  <Select value={calendar} onValueChange={setCalendar}>
                    <SelectTrigger className={fieldControl}>
                      <SelectValue placeholder="Select calendar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary Calendar</SelectItem>
                      <SelectItem value="surveys">Surveys Calendar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <label className="flex items-start sm:items-center gap-2.5 cursor-pointer">
                  <Checkbox
                    checked={sendConfirmation}
                    onCheckedChange={(v) => setSendConfirmation(v === true)}
                    className={`${checkboxClass} mt-0.5 sm:mt-0`}
                  />
                  <span className="text-sm text-[#242424] leading-snug min-w-0">
                    Send confirmation email
                  </span>
                </label>
                <label className="flex items-start sm:items-center gap-2.5 cursor-pointer">
                  <Checkbox
                    checked={ccEngineer}
                    onCheckedChange={(v) => setCcEngineer(v === true)}
                    className={`${checkboxClass} mt-0.5 sm:mt-0`}
                  />
                  <span className="text-sm text-[#242424] leading-snug min-w-0">
                    CC to the engineer
                  </span>
                </label>
                <label className="flex items-start sm:items-center gap-2.5 cursor-pointer">
                  <Checkbox
                    checked={addInvite}
                    onCheckedChange={(v) => setAddInvite(v === true)}
                    className={`${checkboxClass} mt-0.5 sm:mt-0`}
                  />
                  <span className="text-sm text-[#242424] leading-snug min-w-0">
                    Add calendar invite to customer&apos;s email
                  </span>
                </label>
              </div>
            </div>
          </section>

          {/* D. AI Behavior & Voice Agent Settings */}
          <section className={sectionCard}>
            <SectionHeader
              icon={Bot}
              title="AI Behavior & Voice Agent Settings"
              description="Tune how the voice agent listens, responds, and retries missed calls."
            />
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-w-0">
                <div>
                  <Label className={fieldLabel}>Interrupt Sensitivity</Label>
                  <Select value={interrupt} onValueChange={setInterrupt}>
                    <SelectTrigger className={fieldControl}>
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
                  <Label className={fieldLabel}>Response Speed</Label>
                  <Select
                    value={responseSpeed}
                    onValueChange={setResponseSpeed}
                  >
                    <SelectTrigger className={fieldControl}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="fast">Fast</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className={fieldLabel}>Initial Message Delay</Label>
                  <Select value={delay} onValueChange={setDelay}>
                    <SelectTrigger className={fieldControl}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0 sec</SelectItem>
                      <SelectItem value="1">1 sec</SelectItem>
                      <SelectItem value="2">2 sec</SelectItem>
                      <SelectItem value="5">5 sec</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className={fieldLabel}>AI Creativity</Label>
                  <div className="mt-2">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={creativity}
                      onChange={(e) => setCreativity(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none bg-[#E0E0E0] accent-[#0A3D3A] cursor-pointer"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-[#989898]">
                        Precise
                      </span>
                      <span className="text-[10px] text-[#989898]">
                        Casual
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full sm:max-w-md min-w-0">
                <Label className={fieldLabel}>Caller ID Name</Label>
                <Input
                  value={callerId}
                  onChange={(e) => setCallerId(e.target.value)}
                  className={fieldControl}
                />
              </div>

              <div className="space-y-3 pt-1">
                <label className="flex items-start sm:items-center gap-2.5 cursor-pointer">
                  <Checkbox
                    checked={doubleCall}
                    onCheckedChange={(v) => setDoubleCall(v === true)}
                    className={`${checkboxClass} mt-0.5 sm:mt-0`}
                  />
                  <span className="text-sm text-[#242424] leading-snug min-w-0">
                    Double Call (retry if missed)
                  </span>
                </label>
                <label className="flex items-start sm:items-center gap-2.5 cursor-pointer">
                  <Checkbox
                    checked={vmDetection}
                    onCheckedChange={(v) => setVmDetection(v === true)}
                    className={`${checkboxClass} mt-0.5 sm:mt-0`}
                  />
                  <span className="text-sm text-[#242424] leading-snug min-w-0">
                    VM Detection (Beta)
                  </span>
                </label>
              </div>
            </div>
          </section>

          {/* E. LLM Configuration */}
          <section className={sectionCard}>
            <SectionHeader
              icon={Cpu}
              title="LLM (Language Model) Configuration"
              description="Choose the provider, model, and system prompt for the voice agent."
            />
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-w-0">
                <div>
                  <Label className={fieldLabel}>Provider</Label>
                  <Select value={provider} onValueChange={setProvider}>
                    <SelectTrigger className={fieldControl}>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="groq">Groq</SelectItem>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="anthropic">Anthropic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className={fieldLabel}>Model</Label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger className={fieldControl}>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="llama-3.3-70b">
                        llama-3.3-70b-versatile (Fast)
                      </SelectItem>
                      <SelectItem value="llama-3.1-8b">
                        llama-3.1-8b-instant
                      </SelectItem>
                      <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-4">
                <div className="min-w-0">
                  <Label className={fieldLabel}>Temperature</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    className={fieldControl}
                  />
                </div>
                <div className="min-w-0">
                  <Label className={fieldLabel}>Max Tokens</Label>
                  <Input
                    type="number"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(e.target.value)}
                    className={fieldControl}
                  />
                </div>
                <div className="min-w-0">
                  <Label className={fieldLabel}>Top P</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={topP}
                    onChange={(e) => setTopP(e.target.value)}
                    className={fieldControl}
                  />
                </div>
              </div>

              <div className="min-w-0">
                <Label className={fieldLabel}>System Prompt</Label>
                <Textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="mt-1 min-h-[140px] sm:min-h-[160px] w-full border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#0A3D3A] focus-visible:ring-offset-0 resize-y"
                />
              </div>
            </div>
          </section>

          {/* F. Speech & Voice Settings */}
          <section className={sectionCard}>
            <SectionHeader
              icon={Mic}
              title="Speech & Voice Settings"
              description="Configure speech recognition and text-to-speech providers."
            />
            <div className="space-y-5">
              <div>
                <p className="text-sm font-medium text-[#242424] mb-3">
                  Speech Recognition
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-w-0">
                  <div>
                    <Label className={fieldLabel}>Provider</Label>
                    <Select
                      value={speechProvider}
                      onValueChange={setSpeechProvider}
                    >
                      <SelectTrigger className={fieldControl}>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deepgram">Deepgram</SelectItem>
                        <SelectItem value="whisper">OpenAI Whisper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className={fieldLabel}>Model</Label>
                    <Select value={speechModel} onValueChange={setSpeechModel}>
                      <SelectTrigger className={fieldControl}>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nova-2">
                          nova-2 (Very Fast)
                        </SelectItem>
                        <SelectItem value="nova">nova</SelectItem>
                        <SelectItem value="enhanced">enhanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-[#242424] mb-3">
                  Text-to-Speech (TTS)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-w-0">
                  <div>
                    <Label className={fieldLabel}>Provider</Label>
                    <Select value={ttsProvider} onValueChange={setTtsProvider}>
                      <SelectTrigger className={fieldControl}>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="elevenlabs">ElevenLabs</SelectItem>
                        <SelectItem value="openai">OpenAI TTS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className={fieldLabel}>Model</Label>
                    <Select value={ttsModel} onValueChange={setTtsModel}>
                      <SelectTrigger className={fieldControl}>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eleven_flash_v2">
                          eleven_flash_v2
                        </SelectItem>
                        <SelectItem value="eleven_multilingual_v2">
                          eleven_multilingual_v2
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <Label className={fieldLabel}>Voice Preview</Label>
                <div className="mt-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 w-full sm:w-auto px-4 border-[#D3D3D3] text-[#505050] hover:bg-[#F5F5F5] rounded-lg text-sm font-medium gap-2"
                    onClick={() =>
                      showSuccess("Playing voice sample (demo)")
                    }
                  >
                    <Play size={15} />
                    Play Sample
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer — gray page bg; stacks on small screens */}
        <div className="sticky bottom-0 z-10 border-t border-[#E0E0E0] bg-[#EBEBEB] px-3 sm:px-5 md:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3 min-w-0">
          <Button
            variant="outline"
            className={outlineFooterBtn}
            onClick={handleReset}
          >
            <RotateCcw size={15} />
            <span className="truncate">Reset to Defaults</span>
          </Button>
          <div className="flex flex-col min-[400px]:flex-row items-stretch min-[400px]:items-center gap-2.5 sm:gap-3 w-full sm:w-auto min-w-0">
            <Button
              variant="outline"
              className={outlineFooterBtn}
              onClick={() =>
                showSuccess("Starting AI voice flow test (demo)")
              }
            >
              <TestTube size={15} />
              <span className="truncate">Test AI Voice Flow</span>
            </Button>
            <Button
              className={primaryFooterBtn}
              onClick={() => showSuccess("Settings saved")}
            >
              <Save size={15} />
              <span className="truncate">Save Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
