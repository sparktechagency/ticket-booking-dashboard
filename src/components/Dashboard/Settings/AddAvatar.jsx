import { useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Avatar,
  Stack,
} from "@mui/material";
import {
  AiOutlineCamera,
  AiOutlineDelete,
  AiOutlineUpload,
} from "react-icons/ai";

export default function AddAvatar() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection (click or drop)
  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setAvatarUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Click to upload
  const handleClick = () => fileInputRef.current?.click();

  // File input change
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  // Drag & Drop Events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setAvatarUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8faff] to-[#f0f4ff] px-6 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h3" fontWeight="bold" color="#1A1A1A">
            Profile Avatar
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Upload a photo to personalize your account
          </Typography>
        </Box>

        {/* Avatar Preview */}
        <Box position="relative" sx={{ width: 180, height: 180, mx: "auto" }}>
          <Avatar
            src={avatarUrl}
            sx={{
              width: 180,
              height: 180,
              border: "6px solid white",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              fontSize: "4rem",
              bgcolor: avatarUrl ? "transparent" : "#e5e7eb",
            }}
          >
            {!avatarUrl && <AiOutlineCamera size={48} color="#9ca3af" />}
          </Avatar>

          {/* Edit Button */}
          {avatarUrl && (
            <IconButton
              onClick={handleClick}
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                width: 40,
                height: 40,
                bgcolor: "#3B82F6",
                color: "white",
                boxShadow: 3,
                "&:hover": { bgcolor: "#2563EB" },
              }}
            >
              <AiOutlineCamera size={18} />
            </IconButton>
          )}
        </Box>

        {/* Upload Area */}
        <Box
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          sx={{
            mt: 4,
            width: "100%",
            maxWidth: 420,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
            border: "2px dashed",
            borderColor: isDragging ? "#3B82F6" : "#d1d5db",
            borderRadius: 3,
            p: 4,
            textAlign: "center",
            bgcolor: isDragging ? "#eff6ff" : "#f9fafb",
            transition: "all 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              borderColor: "#3B82F6",
              bgcolor: "#f0f9ff",
            },
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
          />

          <AiOutlineUpload
            size={40}
            color="#94a3b8"
            style={{ marginBottom: 12 }}
          />
          <Typography variant="h6" fontWeight="medium" color="#374151">
            {isDragging ? "Drop your image here" : "Drag & drop your image"}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            or click to browse
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            mt={1}
          >
            PNG, JPG, GIF up to 5MB
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
          {avatarUrl && (
            <Button
              variant="outlined"
              startIcon={<AiOutlineDelete />}
              onClick={handleRemove}
              sx={{
                borderColor: "#ef4444",
                color: "#ef4444",
                borderRadius: "10px",
                textTransform: "none",
                px: 3,
                "&:hover": {
                  bgcolor: "#fef2f2",
                  borderColor: "#dc2626",
                },
              }}
            >
              Remove
            </Button>
          )}
          <Button
            variant="contained"
            disabled={!avatarUrl}
            sx={{
              bgcolor: "#3B82F6",
              color: "white",
              borderRadius: "10px",
              textTransform: "none",
              px: 4,
              fontWeight: 600,
              "&:hover": { bgcolor: "#2563EB" },
              "&.Mui-disabled": {
                bgcolor: "#e5e7eb",
                color: "#9ca3af",
              },
            }}
          >
            Save Avatar
          </Button>
        </Stack>
      </div>
    </div>
  );
}
