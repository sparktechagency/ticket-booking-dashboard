import { useState, useMemo, useEffect } from "react";
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
import { FaX } from "react-icons/fa6";
import {
  Select,
  MenuItem,
  FormControl,
  Button,
  CircularProgress,
} from "@mui/material";
import { EventManagementModal } from "../UI/EventManagementModal";
import {
  useGetAllEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} from "../../Redux/api/eventsApi";
import { toast } from "sonner";
import { getImageUrl } from "../../utils/baseUrl";
import dayjs from "dayjs";

export default function Events() {
  /* -------------------- API -------------------- */
  const {
    data: eventsResponse,
    isLoading: isLoadingEvents,
    isError,
  } = useGetAllEventsQuery();

  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();

  const events = eventsResponse?.data?.data || [];
  console.log("events", events);

  /* -------------------- STATE -------------------- */
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventsPage, setEventsPage] = useState(1);

  const imageUrl = getImageUrl();

  const itemsPerPage = 5;

  /* -------------------- FILTERING -------------------- */
  const filteredEvents = useMemo(() => {
    return events
      .filter((e) => e.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter((e) =>
        categoryFilter === "all" ? true : e.category === categoryFilter
      )
      .filter((e) => {
        const eventDate = new Date(e.eventDate);
        const startDate = startDateFilter ? new Date(startDateFilter) : null;
        const endDate = endDateFilter ? new Date(endDateFilter) : null;
        
        if (startDate && endDate) {
          return eventDate >= startDate && eventDate <= endDate;
        } else if (startDate) {
          return eventDate >= startDate;
        } else if (endDate) {
          return eventDate <= endDate;
        }
        return true;
      });
  }, [events, searchQuery, categoryFilter, startDateFilter, endDateFilter]);

  /* -------------------- PAGINATION -------------------- */
  const paginatedEvents = useMemo(() => {
    const start = (eventsPage - 1) * itemsPerPage;
    return filteredEvents.slice(start, start + itemsPerPage);
  }, [filteredEvents, eventsPage]);

  useEffect(() => {
    setEventsPage(1);
  }, [searchQuery, categoryFilter, startDateFilter, endDateFilter]);

  /* -------------------- HANDLERS -------------------- */
  const handleSaveEvent = async (eventData) => {
    try {
      if (editingEvent) {
        await updateEvent({
          id: editingEvent._id,
          data: eventData,
        }).unwrap();
        toast.success("Event updated successfully!");
      } else {
        await createEvent(eventData).unwrap();
        toast.success("Event created successfully!");
      }

      setEventModalOpen(false);
      setEditingEvent(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save event");
    }
  };

  const onDeleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteEvent(id).unwrap();
      toast.success("Event deleted successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete event");
    }
  };

  /* -------------------- PAGINATION UI -------------------- */
  const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex gap-2">
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-lg cursor-pointer ${
              page === currentPage
                ? "bg-[#bd85f1] text-white"
                : "bg-white/5 text-[#99a1af]"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );

  if (isLoadingEvents) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  /* -------------------- RENDER -------------------- */
  return (
    <div className="space-y-6 h-screen bg-[#0a0d27] p-6 overflow-y-auto">
      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#99a1af]" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-10 h-12 bg-[#030a1d] border border-white/10 rounded-xl text-white"
          />
        </div>

        <Button
          onClick={() => {
            setEditingEvent(null);
            setEventModalOpen(true);
          }}
          startIcon={<FaPlus />}
          sx={{
            textTransform: "none",
            background: "linear-gradient(to right, #6d1db9, #bd85f1)",
            color: "#fff",
            borderRadius: "12px",
            px: 3,
          }}
        >
          Add Event
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <FormControl size="small">
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            sx={{
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "#fff",
              borderRadius: "12px",
              height: "56px",
              minWidth: "180px",
              "& .MuiSelect-select": {
                paddingY: "14px",
              },
            }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="Concert">Concert</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
          </Select>
        </FormControl>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
          <div className="relative flex items-center gap-3 bg-[#030a1d] border border-white/10 px-4 py-2.5 rounded-xl hover:border-purple-500/50 transition-all duration-300">
            <FaCalendarAlt className="text-purple-400 text-lg" />
            <div className="flex flex-col">
              <label className="text-[#99a1af] text-xs mb-1">Start Date</label>
              <input
                type="date"
                value={startDateFilter}
                onChange={(e) => setStartDateFilter(e.target.value)}
                className="bg-transparent text-white outline-none cursor-pointer"
                style={{
                  colorScheme: 'dark',
                }}
              />
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
          <div className="relative flex items-center gap-3 bg-[#030a1d] border border-white/10 px-4 py-2.5 rounded-xl hover:border-pink-500/50 transition-all duration-300">
            <FaCalendarAlt className="text-pink-400 text-lg" />
            <div className="flex flex-col">
              <label className="text-[#99a1af] text-xs mb-1">End Date</label>
              <input
                type="date"
                value={endDateFilter}
                onChange={(e) => setEndDateFilter(e.target.value)}
                className="bg-transparent text-white outline-none cursor-pointer"
                style={{
                  colorScheme: 'dark',
                }}
              />
            </div>
          </div>
        </div>

        {(categoryFilter !== "all" || startDateFilter || endDateFilter) && (
          <Button
            onClick={() => {
              setCategoryFilter("all");
              setStartDateFilter("");
              setEndDateFilter("");
            }}
            startIcon={<FaX />}
            sx={{ color: "#f87171" }}
          >
            Clear
          </Button>
        )}
      </div>

      {/* Loading / Error */}
      {isLoadingEvents && (
        <div className="flex justify-center py-10">
          <CircularProgress />
        </div>
      )}

      {isError && (
        <p className="text-red-400 text-center">Failed to load events</p>
      )}

      {/* Events */}
      <div className="space-y-4">
        {paginatedEvents.map((event) => (
          <div
            key={event.id}
            className="border border-white/10 rounded-3xl p-6 bg-[#030a1d]"
          >
            <div className="flex items-center gap-6">
              <img
                src={`${imageUrl}${event.thumbnail}`}
                alt={event.title}
                className="w-32 h-32 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h3 className="text-xl text-white">{event.title}</h3>
                <p className="text-[#bd85f1] mb-2">
                  {event?.category === "Concert"
                    ? event?.artistId?.name
                    : event.category === "Sports"
                    ? event?.teamId?.name
                    : "N/A"}
                </p>

                <div className="flex gap-4 text-sm text-[#99a1af]">
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt />{" "}
                    <span>
                      {dayjs(event.eventDate).format("MMM DD, YYYY  h:mm A")}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    <span>
                      {event.venueName}, {event.city}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {/* Edit Button */}
                <Button
                  onClick={() => {
                    setEditingEvent(event);
                    setEventModalOpen(true);
                  }}
                  startIcon={<FaEdit size={14} />}
                  sx={{
                    textTransform: "none",
                    px: 3,
                    py: 1,
                    borderRadius: "12px",
                    color: "#bd85f1",
                    backgroundColor: "rgba(189,133,241,0.12)",
                    border: "1px solid rgba(189,133,241,0.25)",
                    backdropFilter: "blur(6px)",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      backgroundColor: "rgba(189,133,241,0.22)",
                      borderColor: "rgba(189,133,241,0.5)",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  Edit
                </Button>

                {/* Delete Button */}
                <Button
                  color="error"
                  onClick={() => onDeleteEvent(event._id)}
                  startIcon={<FaTrash size={14} />}
                  disabled={isDeleting}
                  sx={{
                    textTransform: "none",
                    px: 3,
                    py: 1,
                    borderRadius: "12px",
                    color: "#f87171",
                    backgroundColor: "rgba(239,68,68,0.12)",
                    border: "1px solid rgba(239,68,68,0.25)",
                    backdropFilter: "blur(6px)",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      backgroundColor: "rgba(239,68,68,0.22)",
                      borderColor: "rgba(239,68,68,0.5)",
                      transform: "translateY(-1px)",
                    },
                    "&.Mui-disabled": {
                      opacity: 0.5,
                      color: "#fca5a5",
                      borderColor: "rgba(239,68,68,0.15)",
                    },
                  }}
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
        <div className="flex justify-center">
          <Pagination
            currentPage={eventsPage}
            totalPages={Math.ceil(filteredEvents.length / itemsPerPage)}
            onPageChange={setEventsPage}
          />
        </div>
      )}

      {/* Modal */}
      <EventManagementModal
        event={editingEvent}
        isOpen={eventModalOpen}
        isLoading={isCreating || isUpdating}
        onClose={() => {
          setEventModalOpen(false);
          setEditingEvent(null);
        }}
        onSave={handleSaveEvent}
      />
    </div>
  );
}
