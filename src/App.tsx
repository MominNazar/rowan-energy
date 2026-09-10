import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerBookings from "./pages/customer/CustomerBookings";
import BookingDetails from "./pages/customer/BookingDetails";
import CustomerReports from "./pages/customer/CustomerReports";
import CustomerBook from "./pages/customer/CustomerBook";
import CustomerProfile from "./pages/customer/CustomerProfile";
import EngineerLogin from "./pages/engineer/EngineerLogin";
import EngineerDashboard from "./pages/engineer/EngineerDashboard";
import EngineerSchedule from "./pages/engineer/EngineerSchedule";
import EngineerRoutePlanner from "./pages/engineer/EngineerRoutePlanner";
import EngineerJobDetails from "./pages/engineer/EngineerJobDetails";
import EngineerChecklist from "./pages/engineer/EngineerChecklist";
import EngineerUploadSurvey from "./pages/engineer/EngineerUploadSurvey";
import EngineerAvailability from "./pages/engineer/EngineerAvailability";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/bookings" element={<CustomerBookings />} />
          <Route path="/customer/bookings/:id" element={<BookingDetails />} />
          <Route path="/customer/reports" element={<CustomerReports />} />
          <Route path="/customer/book" element={<CustomerBook />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          <Route path="/engineer/login" element={<EngineerLogin />} />
          <Route path="/engineer/dashboard" element={<EngineerDashboard />} />
          <Route path="/engineer/schedule" element={<EngineerSchedule />} />
          <Route path="/engineer/route-planner" element={<EngineerRoutePlanner />} />
          <Route path="/engineer/job-details" element={<EngineerJobDetails />} />
          <Route path="/engineer/job-details/:id" element={<EngineerJobDetails />} />
          <Route path="/engineer/checklist" element={<EngineerChecklist />} />
          <Route path="/engineer/checklist/:id" element={<EngineerChecklist />} />
          <Route path="/engineer/upload" element={<EngineerUploadSurvey />} />
          <Route path="/engineer/upload/:id" element={<EngineerUploadSurvey />} />
          <Route path="/engineer/availability" element={<EngineerAvailability />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
