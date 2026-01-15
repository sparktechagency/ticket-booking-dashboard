import { useState, useEffect } from "react";
import {
  Modal,
  Fade,
  Backdrop,
  Tabs,
  Tab,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import { MdClose, MdSave } from "react-icons/md";
import { toast } from "sonner";
import TicketsAndPricing from "./TicketsAndPricing";
import EventDetailsForm from "./EventDetailsForm";

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
  isOpen,
  onClose,
  onSave,
}) {
  console.log(artists);
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
    imageUrl: event?.imageUrl || "",
    teams: [],
    imageFile: undefined,
    seatingChartUrl: event?.seatingChartUrl || "",
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
  const [imagePreview, setImagePreview] = useState(event?.imageUrl || "");
  const [seatingPreview, setSeatingPreview] = useState(
    event?.seatingChartUrl || ""
  );

  useEffect(() => {
    if (event) {
      setImagePreview(event.imageUrl || "");
      setSeatingPreview(event.seatingChartUrl || "");
    }
  }, [event]);

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
    const selected = artists.find((a) => a.id === artistId);
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
    // Basic required field validation
    if (
      !formData.title ||
      !formData.date ||
      !formData.venue ||
      !formData.city
    ) {
      toast.warning("Please fill in all required fields.");
      return;
    }
    
    // Image is only required for new events, not for updates
    if (!event && !formData.imageUrl) {
      toast.warning("Please upload an event thumbnail.");
      return;
    }
    
    if (formData.ticketsAvailable) {
      const invalid = formData.ticketCategories.some(
        (c) => !c.name || c.basePrice <= 0 || c.totalQuantity <= 0
      );
      if (invalid) {
        toast.warning("Please complete all ticket category information.");
        return;
      }
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

    // For updates, only send fields that have changed or files that were uploaded
    const dataToSend = new FormData();
    
    // Always include basic fields
    dataToSend.append("title", formData.title);
    dataToSend.append("date", formData.date);
    dataToSend.append("time", formData.time);
    dataToSend.append("venue", formData.venue);
    dataToSend.append("city", formData.city);
    dataToSend.append("category", formData.category);
    dataToSend.append("description", formData.description);
    
    // Add optional fields
    if (formData.location) dataToSend.append("location", formData.location);
    if (formData.artistId) dataToSend.append("artistId", formData.artistId);
    if (formData.teams && formData.teams.length > 0) {
      dataToSend.append("teams", JSON.stringify(formData.teams));
    }
    
    // Only append image if a new file was uploaded
    if (formData.imageFile) {
      dataToSend.append("thumbnail", formData.imageFile);
    }
    
    // Only append seating chart if a new file was uploaded
    if (formData.seatingChartFile) {
      dataToSend.append("seatingChart", formData.seatingChartFile);
    }
    
    // Add ticket categories
    if (formData.ticketsAvailable && formData.ticketCategories.length > 0) {
      dataToSend.append("ticketCategories", JSON.stringify(formData.ticketCategories));
    }

    onSave(dataToSend);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Fade in={isOpen}>
        <Paper
          sx={{
            width: "90%",
            maxWidth: "900px",
            maxHeight: "90vh",
            bgcolor: "#080014",
            color: "white",
            borderRadius: "16px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              bgcolor: "",
              padding: "15px",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold" }}>
                {event ? "Edit Event" : "Create New Event"}
              </h2>
              <IconButton onClick={onClose} sx={{ color: "white" }}>
                <MdClose size={28} />
              </IconButton>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            sx={{
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              height: "40px",
              backgroundColor: "#160e22",
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
                backgroundColor:
                  activeTab === 0
                    ? "linear-gradient(to right, #6d1db9, #bd85f1)"
                    : "transparent",
                // bg-gradient-to-r from-[#6d1db9] to-[#bd85f1] text-white shadow-lg shadow-[#6d1db9]/30
                borderRadius: "12px",
                margin: "8px 4px",
                textTransform: "none",
                "&.Mui-selected": {
                  color: "#fff",
                  backgroundColor:
                    "linear-gradient(to right, #6d1db9, #bd85f1)",
                },
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
            />
            <Tab
              label="Tickets & Pricing"
              sx={{
                color: activeTab === 1 ? "#fff" : "#99a1af",
                backgroundColor:
                  activeTab === 1
                    ? "linear-gradient(to right, #6d1db9, #bd85f1)"
                    : "transparent",
                borderRadius: "12px",
                margin: "8px 4px",
                textTransform: "none",
                "&.Mui-selected": {
                  color: "#fff",
                },
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
            />
          </Tabs>
          {/* Content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
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
          <div
            style={{
              bgcolor: "#1a0033",
              padding: "20px 24px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "16px",
            }}
          >
            <Button
              onClick={onClose}
              sx={{
                bgcolor: "#111cc",
                border: "1px solid #6d1db9aa",
                "&:hover": { bgcolor: "#5b189baa" },
                minWidth: "150px",
                textTransform: "none",
                color: "white",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<MdSave />}
              onClick={handleSave}
              sx={{
                bgcolor: "#6d1db9",
                "&:hover": { bgcolor: "#5b189b" },
                minWidth: "160px",
                textTransform: "none",
              }}
            >
              {event ? "Update Event" : "Create Event"}
            </Button>
          </div>
        </Paper>
      </Fade>
    </Modal>
  );
}
