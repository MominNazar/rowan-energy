import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { CalendarDays, ChevronDown, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SurveyProLayout } from "@/components/layout/SurveyProLayout";
import { showSuccess } from "@/utils/toast";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 5;

const bookings = [
  {
    id: "1",
    siteName: "Downtown Office Complex",
    siteType: "Building Survey",
    date: "March 15, 2025",
    time: "10:00 AM",
    status: "Scheduled",
    statusType: "scheduled",
  },
  {
    id: "2",
    siteName: "Riverside Commercial Center",
    siteType: "Structural Survey",
    date: "March 8, 2025",
    time: "2:00 PM",
    status: "In Progress",
    statusType: "in-progress",
  },
  {
    id: "3",
    siteName: "Tech Park Building A",
    siteType: "Condition Survey",
    date: "February 28, 2025",
    time: "9:30 AM",
    status: "Completed",
    statusType: "completed",
  },
  {
    id: "4",
    siteName: "Westfield Shopping Mall",
    siteType: "Building Survey",
    date: "March 22, 2025",
    time: "11:00 AM",
    status: "Scheduled",
    statusType: "scheduled",
  },
  {
    id: "5",
    siteName: "Industrial Complex B",
    siteType: "Safety Survey",
    date: "February 15, 2025",
    time: "1:30 PM",
    status: "Completed",
    statusType: "completed",
  },
  {
    id: "6",
    siteName: "Harbor View Residences",
    siteType: "Condition Survey",
    date: "March 5, 2025",
    time: "9:00 AM",
    status: "Scheduled",
    statusType: "scheduled",
  },
  {
    id: "7",
    siteName: "Central Medical Plaza",
    siteType: "Building Survey",
    date: "January 20, 2025",
    time: "10:30 AM",
    status: "Completed",
    statusType: "completed",
  },
  {
    id: "8",
    siteName: "Northgate Logistics Hub",
    siteType: "Structural Survey",
    date: "March 12, 2025",
    time: "1:00 PM",
    status: "In Progress",
    statusType: "in-progress",
  },
  {
    id: "9",
    siteName: "Lakeside Retail Park",
    siteType: "Safety Survey",
    date: "February 5, 2025",
    time: "3:00 PM",
    status: "Completed",
    statusType: "completed",
  },
  {
    id: "10",
    siteName: "Summit Corporate Tower",
    siteType: "Building Survey",
    date: "April 2, 2025",
    time: "8:30 AM",
    status: "Scheduled",
    statusType: "scheduled",
  },
  {
    id: "11",
    siteName: "Eastside Data Center",
    siteType: "Condition Survey",
    date: "January 10, 2025",
    time: "11:30 AM",
    status: "Completed",
    statusType: "completed",
  },
  {
    id: "12",
    siteName: "Greenfield Campus Block C",
    siteType: "Structural Survey",
    date: "March 28, 2025",
    time: "2:30 PM",
    status: "Scheduled",
    statusType: "scheduled",
  },
];

const statusColors: Record<string, string> = {
  scheduled: "bg-[#E8F6F3] text-[#083F3C]",
  "in-progress": "bg-[#FEF3C7] text-[#B45309]",
  completed: "bg-[#D1FAE5] text-[#065F46]",
};

const formatDate = (value: string) => {
  try {
    return format(parseISO(value), "MM/dd/yyyy");
  } catch {
    const [year, month, day] = value.split("-");
    if (!year || !month || !day) return value;
    return `${month}/${day}/${year}`;
  }
};

const toIsoDate = (date: Date) => format(date, "yyyy-MM-dd");

const parseBookingDate = (dateStr: string): Date | null => {
  const parsed = new Date(dateStr);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const toStartOfDay = (isoDate: string) => {
  const d = new Date(`${isoDate}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
};

const toEndOfDay = (isoDate: string) => {
  const d = new Date(`${isoDate}T23:59:59.999`);
  return Number.isNaN(d.getTime()) ? null : d;
};

const DatePickerField = ({
  value,
  onChange,
  ariaLabel,
}: {
  value: string;
  onChange: (iso: string) => void;
  ariaLabel: string;
}) => {
  const selected = value ? toStartOfDay(value) ?? undefined : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          aria-label={ariaLabel}
          className={cn(
            "h-11 flex-1 min-w-0 justify-between rounded-xl border-[#D3D3D3] bg-white px-3 text-sm font-normal hover:bg-white",
            !value && "text-[#989898]",
          )}
        >
          <span className="truncate">
            {value ? formatDate(value) : "mm/dd/yyyy"}
          </span>
          <CalendarDays size={16} className="text-[#989898] shrink-0 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => {
            if (date) onChange(toIsoDate(date));
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

const CustomerBookings = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBookings = useMemo(() => {
    const fromDate = dateFrom ? toStartOfDay(dateFrom) : null;
    const toDate = dateTo ? toEndOfDay(dateTo) : null;

    return bookings.filter((booking) => {
      const matchesStatus =
        status === "all" ||
        booking.status.toLowerCase() === status.toLowerCase();
      const matchesSearch = booking.siteName
        .toLowerCase()
        .includes(search.toLowerCase());

      const bookingDate = parseBookingDate(booking.date);
      let matchesDate = true;
      if (bookingDate && (fromDate || toDate)) {
        if (fromDate && bookingDate < fromDate) matchesDate = false;
        if (toDate && bookingDate > toDate) matchesDate = false;
      } else if (!bookingDate && (fromDate || toDate)) {
        matchesDate = false;
      }

      return matchesStatus && matchesSearch && matchesDate;
    });
  }, [dateFrom, dateTo, status, search]);

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage(1);
  }, [dateFrom, dateTo, status, search]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const rangeStart =
    filteredBookings.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredBookings.length);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleApplyFilters = () => {
    showSuccess(
      `Filters applied — ${filteredBookings.length} booking${
        filteredBookings.length === 1 ? "" : "s"
      } found`
    );
  };

  return (
    <SurveyProLayout
      title="My Bookings"
      subtitle="Manage your survey bookings"
    >
      {/* Filters Card */}
      <div className="bg-white rounded-xl border border-[#D3D3D3] p-3 sm:p-5 lg:p-6 mb-6 min-w-0 max-w-full">
        <div className="flex flex-col lg:flex-row lg:items-center flex-wrap gap-4 min-w-0 max-w-full">
          {/* Date Range */}
          <div className="flex-1 min-w-0 max-w-full xl:w-[480px]">
            <label className="block text-xs sm:text-sm font-semibold text-[#242424] mb-2">
              Date Range
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-2 min-w-0 max-w-full">
              <DatePickerField
                value={dateFrom}
                onChange={setDateFrom}
                ariaLabel="Start date"
              />
              <span className="hidden sm:block text-[#989898] text-sm px-1">to</span>
              <DatePickerField
                value={dateTo}
                onChange={setDateTo}
                ariaLabel="End date"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full lg:w-44">
            <label className="block text-xs sm:text-sm font-semibold text-[#242424] mb-2">
              Status
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-11 appearance-none rounded-lg border border-[#D3D3D3] bg-white pl-3 pr-10 text-sm text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#083F3C] cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#989898] pointer-events-none"
              />
            </div>
          </div>

          {/* Search */}
          <div className="w-full lg:w-56">
            <label className="block text-xs sm:text-sm font-semibold text-[#242424] mb-2">
              Search
            </label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#989898] pointer-events-none"
              />
              <Input
                type="text"
                placeholder="Search site name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 pl-9 border-[#D3D3D3] rounded-lg text-sm text-[#242424] focus-visible:ring-[#083F3C] w-full"
              />
            </div>
          </div>

          {/* Apply Filters Button */}
          <Button
            className="w-full lg:w-auto h-11 px-5 bg-[#083F3C] hover:bg-[#083F3C]/90 text-white rounded-lg text-sm font-semibold whitespace-nowrap"
            onClick={handleApplyFilters}
          >
            <Filter size={16} className="mr-2" />
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-[#D3D3D3] overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#D3D3D3]">
                <th className="text-left font-semibold text-[#505050] px-5 py-3.5 whitespace-nowrap">
                  Site Name
                </th>
                <th className="text-left font-semibold text-[#505050] px-5 py-3.5 whitespace-nowrap">
                  Date
                </th>
                <th className="text-left font-semibold text-[#505050] px-5 py-3.5 whitespace-nowrap">
                  Status
                </th>
                <th className="text-left font-semibold text-[#505050] px-5 py-3.5 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-[#D3D3D3] last:border-b-0 hover:bg-[#F5F5F5] transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="font-medium text-[#242424]">{booking.siteName}</div>
                    <div className="text-[#989898] text-xs mt-0.5">{booking.siteType}</div>
                  </td>
                  <td className="px-5 py-4 text-[#242424]">
                    <div>{booking.date}</div>
                    <div className="text-[#989898] text-xs mt-0.5">{booking.time}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        statusColors[booking.statusType]
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      to={`/customer/bookings/${booking.id}`}
                      className="text-[#083F3C] font-medium text-sm hover:underline inline-flex items-center gap-1"
                    >
                      View Booking
                      <span aria-hidden="true">→</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-[#D3D3D3]">
          {paginatedBookings.map((booking) => (
            <Link
              key={booking.id}
              to={`/customer/bookings/${booking.id}`}
              className="block p-4 hover:bg-[#F5F5F5] transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-[#242424] text-sm">{booking.siteName}</div>
                  <div className="text-[#989898] text-xs mt-0.5">{booking.siteType}</div>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap shrink-0 ${
                    statusColors[booking.statusType]
                  }`}
                >
                  {booking.status}
                </span>
              </div>
              <div className="text-xs text-[#505050] space-y-1">
                <div className="flex items-center gap-1.5">
                  <CalendarDays size={13} className="text-[#989898]" />
                  {booking.date} · {booking.time}
                </div>
              </div>
              <div className="mt-3 text-[#083F3C] font-medium text-sm inline-flex items-center gap-1">
                View Booking <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="p-10 text-center text-[#989898] text-sm">
            No bookings found matching your filters.
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredBookings.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5">
          <p className="text-xs sm:text-sm text-[#989898]">
            Showing {rangeStart} to {rangeEnd} of {filteredBookings.length} results
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="h-9 px-4 border border-[#D3D3D3] bg-white text-[#242424] text-sm font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors border ${
                  page === currentPage
                    ? "bg-[#083F3C] text-white border-[#083F3C]"
                    : "bg-white text-[#242424] border-[#D3D3D3] hover:bg-[#F5F5F5]"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="h-9 px-4 border border-[#D3D3D3] bg-white text-[#242424] text-sm font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </SurveyProLayout>
  );
};

export default CustomerBookings;
