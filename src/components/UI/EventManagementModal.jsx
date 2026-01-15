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

// ... imports
import { getImageUrl } from "../../utils/baseUrl";

// ... constants

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
    artistId: event?.artistId || "", // Assuming this is an ID
    artist: event?.artist || "", // For display if needed, but selecting via ID usually
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
       // Construct previews
       const imgPath = event.imageUrl || event.thumbnail;
       setImagePreview(imgPath ? (imgPath.startsWith("http") ? imgPath : `${imageUrlBase}${imgPath}`) : "");

       const seatPath = event.seatingChartUrl || event.seatingChart;
       setSeatingPreview(seatPath ? (seatPath.startsWith("http") ? seatPath : `${imageUrlBase}${seatPath}`) : "");
       
       setFormData({
         // ... populate form data
         title: event.title || "",
         artistId: event.artist?._id || event.artistId?._id || event.artist || event.artistId || "", 
         // Ensure artistId is the ID string if populating from populated object
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
             availableQuantity: cat.availableQuantity, // Assuming this stays same or backend handles it
             notes: cat.notes || "",
         })) || [],
         ticketsAvailable: event.ticketCategories?.length > 0
       });
    } else {
       // Reset
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
    // Basic validation
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

    // Category-specific validation
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

    // Construct eventDate combining date and time
    // Default time to 00:00:00 if not provided, though we have a time picker
    const dateTimeString = `${formData.date}T${formData.time || "00:00"}:00.000Z`;

    // Map ticket categories to backend structure
    const mappedTickets = formData.ticketCategories.map(t => ({
      ticketName: t.name,
      sectionColor: t.color.startsWith("#") ? (COLOR_NAMES[t.color] || "Red") : t.color, 
      pricePerTicket: Number(t.basePrice),
      totalQuantity: Number(t.totalQuantity)
      // Assuming 'notes' or other fields aren't needed based on the user request, 
      // or if they are, the backend ignores them. User provided generic structure.
    }));

    // Base payload
    const payload = {
      title: formData.title,
      category: formData.category.charAt(0).toUpperCase() + formData.category.slice(1), // Capitalize "Sports" / "Concert"
      eventDate: dateTimeString,
      city: formData.city,
      venueName: formData.venue,
      fullAddress: formData.location,
      ticketCategories: formData.ticketsAvailable ? mappedTickets : [],
    };

    // Add category-specific fields
    if (formData.category === "sports") {
      // teams contains IDs based on previous fixes
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
      // User specified 'seatingView' as the file key
      dataToSend.append("seatingView", formData.seatingChartFile);
    }

    onSave(dataToSend);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
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
