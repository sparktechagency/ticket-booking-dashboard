import { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { FaTimes, FaSave } from "react-icons/fa";
import { toast } from "sonner";
import TicketsAndPricing from "./TicketsAndPricing";
import EventDetailsForm from "./EventDetailsForm";
import { getImageUrl } from "../../utils/baseUrl";

const DEFAULT_COLORS = [
  "#FFD700",
  "#C084FC",
  "#6366F1",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
  "#8B5CF6",
  "#14B8A6",
];

const COLOR_NAMES = {
  "#FFD700": "Gold",
  "#C084FC": "Purple",
  "#6366F1": "Indigo",
  "#3B82F6": "Blue",
  "#10B981": "Green",
  "#F59E0B": "Amber",
  "#EF4444": "Red",
  "#EC4899": "Pink",
  "#8B5CF6": "Violet",
  "#14B8A6": "Teal",
};

const darkFieldSx = {
  bgcolor: "#030a1d",
  color: "white",
  borderRadius: "12px",

  "& .MuiInputBase-input": {
    color: "white",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.15)",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.3)",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#8b5cf6",
  },
};
const darkLabelSx = {
  color: "#9ca3af",
  "&.Mui-focused": {
    color: "#c4b5fd",
  },
};

export function EventManagementModal({
  event,
  artists,
  teams,
  isOpen,
  onClose,
  onSave,
}) {
  const imageUrlBase = getImageUrl();
  const [formData, setFormData] = useState({
    title: event?.title || "",
    artistId: event?.artistId || "", 
    artist: event?.artist || "", 
    date: event?.date || "",
    time: event?.time || "20:00",
    venue: event?.venue || "",
    city: event?.city || "",
    location: event?.location || "",
    category: event?.category || "concert",
    imageUrl: event?.imageUrl || event?.thumbnail || "",
    teams: event?.teams || [],
    imageFile: undefined,
    seatingChartUrl: event?.seatingChartUrl || event?.seatingChart || "",
    seatingChartFile: undefined,
    description: event?.description || "",
    ticketsAvailable: event ? event.ticketCategories.length > 0 : false,
    ticketCategories:
      event?.ticketCategories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        color: cat.color,
        basePrice: cat.basePrice,
        totalQuantity: cat.totalQuantity,
        availableQuantity: cat.availableQuantity,
        notes: cat.notes || "",
      })) || [],
  });

  const [activeTab, setActiveTab] = useState(0);
  const [imagePreview, setImagePreview] = useState("");
  const [seatingPreview, setSeatingPreview] = useState("");

  useEffect(() => {
    if (event) {
       const imgPath = event.imageUrl || event.thumbnail;
       setImagePreview(imgPath ? (imgPath.startsWith("http") ? imgPath : `${imageUrlBase}${imgPath}`) : "");

       const seatPath = event.seatingChartUrl || event.seatingChart;
       setSeatingPreview(seatPath ? (seatPath.startsWith("http") ? seatPath : `${imageUrlBase}${seatPath}`) : "");
       
       setFormData({
         title: event.title || "",
         artistId: event.artist?._id || event.artistId?._id || event.artist || event.artistId || "", 
         date: event.eventDate ? event.eventDate.split('T')[0] : (event.date ? event.date.split('T')[0] : ""),
         time: event.eventDate ? event.eventDate.split('T')[1].substring(0, 5) : (event.time || "20:00"),
         venue: event.venueName || event.venue || "", 
         city: event.city || "",
         location: event.fullAddress || event.location || "",
         category: event.category ? event.category.toLowerCase() : "concert",
         teams: (event.teamA && event.teamB) ? [event.teamA._id || event.teamA, event.teamB._id || event.teamB] : (event.teams || []),
         description: event.description || "",
         imageUrl: imgPath || "",
         seatingChartUrl: seatPath || "",
         ticketCategories: event.ticketCategories?.map((cat) => ({ 
             id: cat._id || cat.id,
             name: cat.ticketName || cat.name,
             color: cat.sectionColor || cat.color,
             basePrice: cat.pricePerTicket || cat.basePrice,
             totalQuantity: cat.totalQuantity,
             availableQuantity: cat.availableQuantity,
             notes: cat.notes || "",
         })) || [],
         ticketsAvailable: event.ticketCategories?.length > 0
       });
    } else {
       setImagePreview("");
       setSeatingPreview("");
       setFormData({
        title: "",
        artistId: "",
        artist: "",
        date: "",
        time: "20:00",
        venue: "",
        city: "",
        location: "",
        category: "concert",
        imageUrl: "",
        teams: [],
        imageFile: undefined,
        seatingChartUrl: "",
        seatingChartFile: undefined,
        description: "",
        ticketsAvailable: false,
        ticketCategories: [],
      });
    }
  }, [event, isOpen, imageUrlBase]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setImagePreview(result);
        setFormData((prev) => ({ ...prev, imageFile: file, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSeatingUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setSeatingPreview(result);
        setFormData((prev) => ({
          ...prev,
          seatingChartFile: file,
          seatingChartUrl: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArtistChange = (artistId) => {
    const selected = artists.find((a) => (a.id || a._id) === artistId);
    if (selected) {
      setFormData((prev) => ({ ...prev, artistId, artist: selected.name }));
    }
  };

  const handleTeamChange = (index, value) => {
    setFormData((prev) => {
      const updatedTeams = [...(prev.teams || [])];
      updatedTeams[index] = value;

      return {
        ...prev,
        teams: updatedTeams,
      };
    });
  };

  const addTicketCategory = () => {
    const newCat = {
      id: `cat-${Date.now()}`,
      name: "",
      color:
        DEFAULT_COLORS[
          formData.ticketCategories.length % DEFAULT_COLORS.length
        ],
      basePrice: 0,
      totalQuantity: 0,
      availableQuantity: 0,
      notes: "",
    };
    setFormData((prev) => ({
      ...prev,
      ticketCategories: [...prev.ticketCategories, newCat],
    }));
  };

  const removeTicketCategory = (id) => {
    setFormData((prev) => ({
      ...prev,
      ticketCategories: prev.ticketCategories.filter((c) => c.id !== id),
    }));
  };

  const updateTicketCategory = (id, updates) => {
    setFormData((prev) => ({
      ...prev,
      ticketCategories: prev.ticketCategories.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    }));
  };

  const handleSave = () => {
    if (
      !formData.title ||
      !formData.date ||
      !formData.venue ||
      !formData.city
    ) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    if (!event && !formData.imageFile) {
      toast.warning("Please upload an event thumbnail.");
      return;
    }

    if (formData.category === "concert" && !formData.artistId) {
      toast.warning("Please select an artist.");
      return;
    }

    if (
      formData.category === "sports" &&
      (!formData.teams || formData.teams.length !== 2)
    ) {
      toast.warning("Please select both teams.");
      return;
    }

    const dataToSend = new FormData();

    const dateTimeString = `${formData.date}T${formData.time || "00:00"}:00.000Z`;

    const mappedTickets = formData.ticketCategories.map(t => ({
      ticketName: t.name,
      sectionColor: t.color.startsWith("#") ? (COLOR_NAMES[t.color] || "Red") : t.color, 
      pricePerTicket: Number(t.basePrice),
      totalQuantity: Number(t.totalQuantity)
    }));

    const payload = {
      title: formData.title,
      category: formData.category.charAt(0).toUpperCase() + formData.category.slice(1), 
      eventDate: dateTimeString,
      city: formData.city,
      venueName: formData.venue,
      fullAddress: formData.location,
      ticketCategories: formData.ticketsAvailable ? mappedTickets : [],
    };

    if (formData.category === "sports") {
      payload.teamA = formData.teams[0];
      payload.teamB = formData.teams[1];
    } else if (formData.category === "concert") {
      payload.artistId = formData.artistId;
    }

    dataToSend.append("data", JSON.stringify(payload));

    if (formData.imageFile) {
      dataToSend.append("thumbnail", formData.imageFile);
    }

    if (formData.seatingChartFile) {
      dataToSend.append("seatingView", formData.seatingChartFile);
    }

    onSave(dataToSend);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/90 border border-white/10 rounded-3xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl text-white font-display">
              {event ? "Edit Event" : "Create New Event"}
            </h2>
            <p className="text-sm text-[#99a1af] mt-1">
              {event
                ? "Update event details, pricing and availability"
                : "Schedule a new event and set up tickets"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#99a1af] hover:text-white cursor-pointer"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4">
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            sx={{
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              height: "40px",
              "& .MuiTabs-indicator": {
                backgroundColor: "#bd85f1",
                height: "3px",
              },
            }}
          >
            <Tab
              label="Event Details"
              sx={{
                color: activeTab === 0 ? "#fff" : "#99a1af",
                textTransform: "none",
                fontSize: "1rem",
                "&.Mui-selected": {
                  color: "#fff",
                },
              }}
            />
            <Tab
              label="Tickets & Pricing"
              sx={{
                color: activeTab === 1 ? "#fff" : "#99a1af",
                textTransform: "none",
                fontSize: "1rem",
                "&.Mui-selected": {
                  color: "#fff",
                },
              }}
            />
          </Tabs>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 0 && (
            <EventDetailsForm
              imagePreview={imagePreview}
              handleImageUpload={handleImageUpload}
              seatingPreview={seatingPreview}
              handleSeatingUpload={handleSeatingUpload}
              formData={formData}
              setFormData={setFormData}
              handleArtistChange={handleArtistChange}
              handleTeamChange={handleTeamChange}
              artists={artists}
              teams={teams}
            />
          )}

          {activeTab === 1 && (
            <TicketsAndPricing
              formData={formData}
              setFormData={setFormData}
              addTicketCategory={addTicketCategory}
              removeTicketCategory={removeTicketCategory}
              updateTicketCategory={updateTicketCategory}
              darkFieldSx={darkFieldSx}
              darkLabelSx={darkLabelSx}
              DEFAULT_COLORS={DEFAULT_COLORS}
              COLOR_NAMES={COLOR_NAMES}
            />
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-between">
          <Button
            sx={{
              textTransform: "none",
              px: 3,
              py: 1,
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              borderRadius: "12px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            sx={{
              textTransform: "none",
              px: 3,
              py: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              background: "linear-gradient(to right, #6d1db9, #bd85f1)",
              color: "white",
              borderRadius: "12px",
              cursor: "pointer",
              "&:hover": {
                background: "linear-gradient(to right, #5b189b, #a66fd9)",
              },
            }}
            onClick={handleSave}
          >
            <FaSave />
            {event ? "Update Event" : "Create Event"}
          </Button>
        </div>
      </div>
    </div>
  );
}
