import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import {
  MdAccessTime,
  MdCalendarToday,
  MdImage,
  MdLocationOn,
  MdMap,
} from "react-icons/md";

const outlinedFieldSx = {
  bgcolor: "#030a1d",
  color: "white",
  borderRadius: "10px",

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(189,133,241,0.35)", // soft purple
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(189,133,241,0.3)",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(189,133,241,0.3) ",
    borderWidth: "2px",
  },

  "& .MuiInputBase-input": {
    color: "white",
  },
};

const outlinedLabelSx = {
  color: "#99a1af",
  "&.Mui-focused": {
    color: "#bd85f1",
  },
  backgroundColor: "#030a1d",
  px: 0.5,
};

export default function EventDetailsForm({
  imagePreview,
  handleImageUpload,
  seatingPreview,
  handleSeatingUpload,
  formData,
  setFormData,
  handleArtistChange,
  handleTeamChange,
  artists,
}) {
  return (
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
                <span style={{ marginTop: "12px" }}>Upload Thumbnail</span>
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
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
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
                <span style={{ marginTop: "12px" }}>Upload Seating Chart</span>
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
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
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
          sx={outlinedFieldSx}
          InputLabelProps={{ sx: outlinedLabelSx }}
        />

        <div style={{ display: "flex", gap: "16px" }}>
          <FormControl fullWidth>
            <InputLabel id="category-label" sx={outlinedLabelSx}>
              Category
            </InputLabel>

            <Select
              labelId="category-label"
              label="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
              sx={outlinedFieldSx}
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
                  <MdCalendarToday className="text-[#efc6ff]" />
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
                  <MdAccessTime className="text-[#efc6ff]" />
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

        {/* Concert */}
        {formData.category === "concert" && (
          <FormControl fullWidth>
            <InputLabel sx={{ color: "#99a1af" }}>
              Artist / Performer *
            </InputLabel>
            <Select
              value={formData.artistId}
              onChange={(e) => handleArtistChange(e.target.value)}
              sx={outlinedFieldSx}
            >
              <MenuItem value="">Select an artist...</MenuItem>
              {artists?.map((artist) => (
                <MenuItem key={artist.id} value={artist.id}>
                  {artist.name} - {artist.genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Sports */}
        {formData.category === "sports" && (
          <div style={{ display: "flex", gap: "16px" }}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: "#99a1af" }}>Team A *</InputLabel>
              <Select
                value={formData.teams?.[0] || ""}
                onChange={(e) => handleTeamChange(0, e.target.value)}
                sx={outlinedFieldSx}
              >
                <MenuItem value="">Select Team A</MenuItem>
                {artists?.map((team) => (
                  <MenuItem key={team.id} value={team.name}>
                    {team.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel sx={{ color: "#99a1af" }}>Team B *</InputLabel>
              <Select
                value={formData.teams?.[1] || ""}
                onChange={(e) => handleTeamChange(1, e.target.value)}
                sx={outlinedFieldSx}
              >
                <MenuItem value="">Select Team B</MenuItem>
                {artists?.map((team) => (
                  <MenuItem key={team.id} value={team.name}>
                    {team.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}

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
                <MdLocationOn className="text-[#efc6ff]" />
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
  );
}
