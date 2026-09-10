import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ChevronDown, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SurveyProLayout } from "@/components/layout/SurveyProLayout";

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
];

const statusColors = {
  scheduled: "bg-[#E8F6F3] text-[#083F3C]",
  "in-progress": "bg-[#FEF3C7] text-[#B45309]",
  completed: "bg-[#D1FAE5] text-[#065F46]",
};

const formatDate = (value: string) => {
  const [year, month, day] = value.split("-");
  return `${month}/${day}/${year}`;
};

const CustomerBookings = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      status === "all" || booking.status.toLowerCase() === status.toLowerCase();
    const matchesSearch = booking.siteName
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <SurveyProLayout
      title="My Bookings"
      subtitle="Manage your survey bookings"
    >
      {/* Filters Card */}
      <div className="bg-white rounded-xl border border-[#D3D3D3] p-4 sm:p-5 lg:p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          {/* Date Range */}
          <div className="flex-1 min-w-0 xl:w-[480px]">
            <label className="block text-xs sm:text-sm font-semibold text-[#242424] mb-2">
              Date Range
            </label>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <div className="relative flex h-14 flex-1 min-w-0 cursor-pointer items-center rounded-xl border border-[#D3D3D3] bg-white focus-within:ring-2 focus-within:ring-[#083F3C]">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  aria-label="Start date"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0 focus:outline-none"
                />
                <span className="pointer-events-none w-full text-center text-base text-[#242424]">
                  {dateFrom ? formatDate(dateFrom) : "mm/dd/yyyy"}
                </span>
              </div>
              <span className="hidden sm:block text-[#989898] text-sm px-1">to</span>
              <div className="relative flex h-14 flex-1 min-w-0 cursor-pointer items-center rounded-xl border border-[#D3D3D3] bg-white focus-within:ring-2 focus-within:ring-[#083F3C]">
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  aria-label="End date"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0 focus:outline-none"
                />
                <span className="pointer-events-none w-full text-center text-base text-[#242424]">
                  {dateTo ? formatDate(dateTo) : "mm/dd/yyyy"}
                </span>
              </div>
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
            onClick={() => {}}
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
              {filteredBookings.map((booking) => (
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
          {filteredBookings.map((booking) => (
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
          Showing 1 to {filteredBookings.length} of 12 results
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
          {[1, 2, 3].map((page) => (
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
            onClick={() => setCurrentPage((prev) => Math.min(3, prev + 1))}
            disabled={currentPage === 3}
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