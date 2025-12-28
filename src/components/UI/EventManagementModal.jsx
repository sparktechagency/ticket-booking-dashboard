import { useState, useEffect } from "react";
import {
  Modal,
  Fade,
  Backdrop,
  Tabs,
  Tab,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Button,
  IconButton,
  Alert,
  InputAdornment,
  Avatar,
  Paper,
} from "@mui/material";
import {
  MdClose,
  MdAdd,
  MdDelete,
  MdSave,
  MdCalendarToday,
  MdLocationOn,
  MdAccessTime,
  MdImage,
  MdMap,
  MdPalette,
} from "react-icons/md";

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
      !formData.artistId ||
      !formData.date ||
      !formData.venue ||
      !formData.city
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    if (!formData.imageUrl) {
      alert("Please upload an event thumbnail.");
      return;
    }
    if (formData.ticketsAvailable) {
      const invalid = formData.ticketCategories.some(
        (c) => !c.name || c.basePrice <= 0 || c.totalQuantity <= 0
      );
      if (invalid) {
        alert("Please complete all ticket category information.");
        return;
      }
    }
    onSave(formData);
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
            background:
              "linear-gradient(to bottom right, rgba(109, 29, 185), #080014, rgba(3, 10, 29))",
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
              bgcolor: "#1a0033",
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
              <>
                {/* Image Uploads */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "24px",
                    marginBottom: "32px",
                  }}
                >
                  <div style={{ flex: "1 1 300px" }}>
                    <label
                      style={{
                        display: "block",
                        color: "#99a1af",
                        fontSize: "0.875rem",
                        marginBottom: "8px",
                      }}
                    >
                      Event Thumbnail *
                    </label>
                    <div
                      style={{
                        height: "260px",
                        border: "2px dashed #444",
                        borderRadius: "12px",
                        overflow: "hidden",
                        position: "relative",
                        backgroundColor: "#030a1d",
                        cursor: "pointer",
                      }}
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Thumbnail"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <label
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            color: "#99a1af",
                          }}
                        >
                          <MdImage size={48} />
                          <span style={{ marginTop: "12px" }}>
                            Upload Thumbnail
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: "none" }}
                          />
                        </label>
                      )}
                      {imagePreview && (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0,0,0,0.6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            transition: "opacity 0.3s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.opacity = 1)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.opacity = 0)
                          }
                        >
                          <label style={{ cursor: "pointer" }}>
                            <span
                              style={{
                                background: "rgba(255,255,255,0.15)",
                                padding: "12px 24px",
                                borderRadius: "12px",
                                backdropFilter: "blur(8px)",
                                fontSize: "0.95rem",
                              }}
                            >
                              Change Image
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              style={{ display: "none" }}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ flex: "1 1 300px" }}>
                    <label
                      style={{
                        display: "block",
                        color: "#99a1af",
                        fontSize: "0.875rem",
                        marginBottom: "8px",
                      }}
                    >
                      Stadium / Seating Chart
                    </label>
                    <div
                      style={{
                        height: "260px",
                        border: "2px dashed #444",
                        borderRadius: "12px",
                        overflow: "hidden",
                        position: "relative",
                        backgroundColor: "#030a1d",
                        cursor: "pointer",
                      }}
                    >
                      {seatingPreview ? (
                        <img
                          src={seatingPreview}
                          alt="Seating"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <label
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            color: "#99a1af",
                          }}
                        >
                          <MdMap size={48} />
                          <span style={{ marginTop: "12px" }}>
                            Upload Seating Chart
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleSeatingUpload}
                            style={{ display: "none" }}
                          />
                        </label>
                      )}
                      {seatingPreview && (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0,0,0,0.6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            transition: "opacity 0.3s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.opacity = 1)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.opacity = 0)
                          }
                        >
                          <label style={{ cursor: "pointer" }}>
                            <span
                              style={{
                                background: "rgba(255,255,255,0.15)",
                                padding: "12px 24px",
                                borderRadius: "12px",
                                backdropFilter: "blur(8px)",
                                fontSize: "0.95rem",
                              }}
                            >
                              Change Image
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleSeatingUpload}
                              style={{ display: "none" }}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Event Title *"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    variant="outlined"
                    InputProps={{ sx: { bgcolor: "#030a1d", color: "white" } }}
                    InputLabelProps={{ sx: { color: "#99a1af" } }}
                  />

                  <FormControl fullWidth>
                    <InputLabel sx={{ color: "#99a1af" }}>
                      Artist/Performer *
                    </InputLabel>
                    <Select
                      value={formData.artistId}
                      onChange={(e) => handleArtistChange(e.target.value)}
                      sx={{ bgcolor: "#030a1d", color: "white" }}
                    >
                      <MenuItem value="">Select an artist...</MenuItem>
                      {artists?.map((artist) => (
                        <MenuItem key={artist.id} value={artist.id}>
                          {artist.name} - {artist.genre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <div style={{ display: "flex", gap: "16px" }}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ color: "#99a1af" }}>
                        Category
                      </InputLabel>
                      <Select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        sx={{ bgcolor: "#030a1d", color: "white" }}
                      >
                        <MenuItem value="concert">Concert</MenuItem>
                        <MenuItem value="sports">Sports</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      fullWidth
                      label="Date *"
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MdCalendarToday />
                          </InputAdornment>
                        ),
                        sx: { bgcolor: "#030a1d", color: "white" },
                      }}
                      InputLabelProps={{
                        shrink: true,
                        sx: { color: "#99a1af" },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Time *"
                      type="time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          time: e.target.value,
                        }))
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MdAccessTime />
                          </InputAdornment>
                        ),
                        sx: { bgcolor: "#030a1d", color: "white" },
                      }}
                      InputLabelProps={{
                        shrink: true,
                        sx: { color: "#99a1af" },
                      }}
                    />
                  </div>

                  <TextField
                    fullWidth
                    label="City *"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, city: e.target.value }))
                    }
                    InputProps={{ sx: { bgcolor: "#030a1d", color: "white" } }}
                    InputLabelProps={{ sx: { color: "#99a1af" } }}
                  />

                  <TextField
                    fullWidth
                    label="Venue Name *"
                    value={formData.venue}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        venue: e.target.value,
                      }))
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MdLocationOn />
                        </InputAdornment>
                      ),
                      sx: { bgcolor: "#030a1d", color: "white" },
                    }}
                    InputLabelProps={{ sx: { color: "#99a1af" } }}
                  />

                  <TextField
                    fullWidth
                    label="Full Address (Optional)"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    InputProps={{ sx: { bgcolor: "#030a1d", color: "white" } }}
                    InputLabelProps={{ sx: { color: "#99a1af" } }}
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Event Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    InputProps={{ sx: { bgcolor: "#030a1d", color: "white" } }}
                    InputLabelProps={{ sx: { color: "#99a1af" } }}
                  />
                </div>
              </>
            )}

            {activeTab === 1 && (
              <>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.ticketsAvailable}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          ticketsAvailable: e.target.checked,
                        }))
                      }
                      color="primary"
                    />
                  }
                  label="Tickets available for sale"
                  sx={{ color: "white", mb: 4 }}
                />

                {formData.ticketsAvailable && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "24px",
                      }}
                    >
                      <h3 style={{ margin: 0, fontSize: "1.4rem" }}>
                        Ticket Categories
                      </h3>
                      <Button
                        variant="contained"
                        startIcon={<MdAdd />}
                        onClick={addTicketCategory}
                      >
                        Add Category
                      </Button>
                    </div>

                    {formData.ticketCategories.length === 0 && (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "48px",
                          background: "rgba(255,255,255,0.05)",
                          borderRadius: "16px",
                        }}
                      >
                        <p style={{ color: "#99a1af", fontSize: "1.1rem" }}>
                          No ticket categories yet
                        </p>
                        <Button variant="contained" onClick={addTicketCategory}>
                          Create First Category
                        </Button>
                      </div>
                    )}

                    {formData.ticketCategories.map((cat, index) => (
                      <Paper
                        key={cat.id}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.05)",
                          p: 3,
                          mb: 3,
                          borderRadius: "12px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <Avatar sx={{ bgcolor: cat.color }}>
                              <MdPalette />
                            </Avatar>
                            <h4 style={{ margin: 0 }}>
                              {cat.name || `Category ${index + 1}`}
                            </h4>
                          </div>
                          <IconButton
                            onClick={() => removeTicketCategory(cat.id)}
                            color="error"
                          >
                            <MdDelete size={22} />
                          </IconButton>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                          }}
                        >
                          <TextField
                            fullWidth
                            label="Ticket Name *"
                            value={cat.name}
                            onChange={(e) =>
                              updateTicketCategory(cat.id, {
                                name: e.target.value,
                              })
                            }
                            InputProps={{ sx: { bgcolor: "#030a1d" } }}
                          />

                          <FormControl fullWidth>
                            <InputLabel>Color</InputLabel>
                            <Select
                              value={cat.color}
                              onChange={(e) =>
                                updateTicketCategory(cat.id, {
                                  color: e.target.value,
                                })
                              }
                              sx={{ bgcolor: "#030a1d" }}
                            >
                              {DEFAULT_COLORS.map((color) => (
                                <MenuItem key={color} value={color}>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "10px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "24px",
                                        height: "24px",
                                        backgroundColor: color,
                                        borderRadius: "6px",
                                      }}
                                    />
                                    {COLOR_NAMES[color]}
                                  </div>
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <div style={{ display: "flex", gap: "16px" }}>
                            <TextField
                              fullWidth
                              label="Price per Ticket ($)"
                              type="number"
                              value={cat.basePrice}
                              onChange={(e) =>
                                updateTicketCategory(cat.id, {
                                  basePrice: Number(e.target.value) || 0,
                                })
                              }
                              InputProps={{ sx: { bgcolor: "#030a1d" } }}
                            />
                            <TextField
                              fullWidth
                              label="Total Quantity"
                              type="number"
                              value={cat.totalQuantity}
                              onChange={(e) => {
                                const qty = Number(e.target.value) || 0;
                                updateTicketCategory(cat.id, {
                                  totalQuantity: qty,
                                  availableQuantity: qty,
                                });
                              }}
                              InputProps={{ sx: { bgcolor: "#030a1d" } }}
                            />
                          </div>

                          <TextField
                            fullWidth
                            multiline
                            rows={2}
                            label="Notes (optional)"
                            value={cat.notes}
                            onChange={(e) =>
                              updateTicketCategory(cat.id, {
                                notes: e.target.value,
                              })
                            }
                            InputProps={{ sx: { bgcolor: "#030a1d" } }}
                          />
                        </div>
                      </Paper>
                    ))}
                  </>
                )}

                {!formData.ticketsAvailable && (
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    Tickets are not available. The event will be published
                    without ticket sales.
                  </Alert>
                )}
              </>
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
              sx={{ color: "white", minWidth: "120px" }}
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
