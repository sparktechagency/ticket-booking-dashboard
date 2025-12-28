import { useState, useMemo } from "react";
import {
  FaSearch,
  FaPlus,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaEdit,
  FaBan,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";
import { Select, MenuItem, FormControl, Button } from "@mui/material";
import { eventsData } from "../../../public/data/eventsData";
import { FaX } from "react-icons/fa6";
import { EventManagementModal } from "../UI/EventManagementModal";

export default function Events() {
  const [events, setEvents] = useState(eventsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [eventStatusFilter, setEventStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventsPage, setEventsPage] = useState(1);
  const itemsPerPage = 5;

  // Delete event
  const onDeleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((e) => e.id !== id));
    }
  };

  // Filtered & searched events
  const filteredEvents = useMemo(() => {
    return events
      .filter((e) => e.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter((e) =>
        eventStatusFilter === "all"
          ? true
          : eventStatusFilter === "upcoming"
          ? new Date(e.date) > new Date() && !e.cancelled
          : eventStatusFilter === "completed"
          ? new Date(e.date) <= new Date() && !e.cancelled
          : e.cancelled
      )
      .filter((e) => (dateFilter ? e.date === dateFilter : true));
  }, [events, searchQuery, eventStatusFilter, dateFilter]);

  // Pagination
  const paginatedEvents = useMemo(() => {
    const start = (eventsPage - 1) * itemsPerPage;
    return filteredEvents.slice(start, start + itemsPerPage);
  }, [filteredEvents, eventsPage]);

  // Reset page when filters/search change
  useMemo(() => setEventsPage(1), []);

  // Pagination Component
  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return (
      <div className="flex gap-2">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded-lg ${
              p === currentPage
                ? "bg-[#bd85f1] text-white"
                : "bg-white/5 text-[#99a1af]"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 h-screen bg-[#0a0d27] p-6 overflow-y-auto">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#99a1af]" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 h-12 bg-[#030a1d] border border-white/10 rounded-xl text-white placeholder:text-[#99a1af] focus:border-[#bd85f1] focus:ring-2 focus:ring-[#bd85f1]/20 transition-all font-sans"
          />
        </div>

        <Button
          onClick={() => {
            setEditingEvent(null);
            setEventModalOpen(true);
          }}
          className="bg-gradient-to-r from-[#6d1db9] to-[#bd85f1] hover:from-[#5b189b] hover:to-[#a66fd9] text-white rounded-xl font-display transition-all hover:scale-105 shadow-lg shadow-[#6d1db9]/30"
          startIcon={<FaPlus fontSize={12} />}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            px: "20px",
            py: "12px",
            textTransform: "none",
            color: "white",
            borderRadius: "12px",
          }}
        >
          Add Event
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <FormControl size="small">
          <Select
            value={eventStatusFilter}
            onChange={(e) => setEventStatusFilter(e.target.value)}
            displayEmpty
            sx={{
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "#fff",
              borderRadius: "12px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.1)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.2)",
              },
            }}
          >
            <MenuItem value="all">All Events</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        <div className="relative flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl">
          <FaCalendarAlt className="w-4 h-4 text-[#99a1af]" />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-transparent text-white font-sans text-sm focus:outline-none cursor-pointer"
          />
        </div>

        {(eventStatusFilter !== "all" || dateFilter) && (
          <Button
            onClick={() => {
              setEventStatusFilter("all");
              setDateFilter("");
            }}
            sx={{
              px: 2,
              py: 1.5,
              backgroundColor: "rgba(239,68,68,0.1)",
              color: "#f87171",
              "&:hover": { backgroundColor: "rgba(239,68,68,0.2)" },
              borderRadius: "12px",
            }}
            startIcon={<FaX size={16} />}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {paginatedEvents.map((event) => (
          <div
            key={event.id}
            className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-[#bd85f1]/30 transition-all"
          >
            <div className="flex flex-col lg:flex-row items-start gap-6">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full lg:w-32 h-48 lg:h-32 rounded-2xl object-cover"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl text-white font-display mb-1">
                      {event.title}
                    </h3>
                    <p className="text-[#bd85f1] font-sans mb-2">
                      {event.artist}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-sans flex items-center gap-1 ${
                      event.cancelled
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : new Date(event.date) > new Date()
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                    }`}
                  >
                    {event.cancelled ? (
                      <>
                        <FaBan size={12} /> Cancelled
                      </>
                    ) : new Date(event.date) > new Date() ? (
                      <>
                        <FaCheckCircle size={12} /> Upcoming
                      </>
                    ) : (
                      <>
                        <FaClock size={12} /> Completed
                      </>
                    )}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-[#99a1af] font-sans">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    {event.venue}, {event.city}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {event.ticketCategories.map((cat) => (
                    <div
                      key={cat.id}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg"
                    >
                      <span className="text-xs text-white font-sans">
                        {cat.name}:{" "}
                        <span className="text-[#bd85f1]">
                          {cat.availableQuantity}/{cat.totalQuantity}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex lg:flex-col gap-2">
                <Button
                  onClick={() => {
                    setEditingEvent(event);
                    setEventModalOpen(true);
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 4,
                    py: 1.5,
                    backgroundColor: "rgba(189,133,241,0.1)",
                    color: "#bd85f1",
                    borderRadius: "12px",
                    "&:hover": { backgroundColor: "rgba(189,133,241,0.2)" },
                  }}
                  startIcon={<FaEdit size={16} />}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDeleteEvent(event.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 4,
                    py: 1.5,
                    backgroundColor: "rgba(239,68,68,0.1)",
                    color: "#f87171",
                    borderRadius: "12px",
                    "&:hover": { backgroundColor: "rgba(239,68,68,0.2)" },
                  }}
                  startIcon={<FaTrash size={16} />}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredEvents.length > itemsPerPage && (
        <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden p-4 flex justify-center">
          <Pagination
            currentPage={eventsPage}
            totalPages={Math.ceil(filteredEvents.length / itemsPerPage)}
            onPageChange={setEventsPage}
          />
        </div>
      )}

      <EventManagementModal
        event={editingEvent}
        artists={eventsData.artist}
        isOpen={eventModalOpen}
        onClose={() => {
          setEventModalOpen(false);
          setEditingEvent(null);
        }}
        onSave={(eventData) => {
          console.log("Event saved:", eventData);
          // Here you would typically update your events state
          setEventModalOpen(false);
          setEditingEvent(null);
        }}
      />
    </div>
  );
}
