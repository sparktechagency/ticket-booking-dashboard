import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FaTimes, FaSave, FaUpload, FaCheckCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "sonner";

const GENRE_OPTIONS = [
  "Football",
  "Basketball",
  "Baseball",
  "Soccer",
  "Hockey",
  "Cricket",
  "Rugby",
  "Tennis",
  "Volleyball",
  "American Football",
  "Other",
];

export function TeamManagementModal({ team, isOpen, onClose, onSave, isLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    bio: "",
    image: "",
    imageFile: null,
    thumbnail: "",
    thumbnailFile: null,
  });

  const [imagePreview, setImagePreview] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name || "",
        genre: team.genre || "",
        bio: team.bio || "",
        image: team.image || "",
        imageFile: null,
        thumbnail: team.thumbnail || "",
        thumbnailFile: null,
      });
      setImagePreview(team.image || "");
      setThumbnailPreview(team.thumbnail || "");
    } else {
      setFormData({
        name: "",
        genre: "",
        bio: "",
        image: "",
        imageFile: null,
        thumbnail: "",
        thumbnailFile: null,
      });
      setImagePreview("");
      setThumbnailPreview("");
    }
  }, [team, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
        imageFile: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
      setFormData((prev) => ({
        ...prev,
        thumbnail: reader.result,
        thumbnailFile: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!formData.name || !formData.genre) {
      toast.warning("Team name and genre are required");
      return;
    }
    
    // Image is only required for new teams
    if (!team && !formData.image) {
      toast.warning("Please upload a team logo");
      return;
    }

    console.log(formData);

    // Create FormData for file upload
    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("genre", formData.genre);
    dataToSend.append("bio", formData.bio);
    dataToSend.append("image", formData.image);
    dataToSend.append("thumbnail", formData.thumbnail);
    
    // Only append image if a new file was uploaded
    if (formData.imageFile) {
      dataToSend.append("image", formData.imageFile);
    }
    
    // Only append thumbnail if a new file was uploaded
    if (formData.thumbnailFile) {
      dataToSend.append("thumbnail", formData.thumbnailFile);
    }

    onSave(dataToSend);
  };

  const purpleFieldClass =
    "w-full px-4 py-3 bg-[#030a1d] text-white rounded-xl border border-purple-500/30 " +
    "focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 " +
    "hover:border-purple-400/60 transition";

  // ... (existing helper functions)

  // ...

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-3xl max-h-[90vh] bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/90 border border-white/10 rounded-3xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl text-white font-display">
              {team ? "Edit Team" : "Add New Team"}
            </h2>
            <p className="text-sm text-[#99a1af] mt-1">
              {team
                ? "Update team information"
                : "Create a new team profile"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#99a1af] hover:text-white cursor-pointer"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Image Upload */}
          <div className="flex gap-6 flex-wrap">
            {/* Main Image */}
            <div className="flex-1 min-w-[300px]">
              <label className="block text-sm text-[#99a1af] mb-2">
                Team Image *
              </label>

              <div className="flex gap-4 flex-wrap">
                <div className="w-48 h-48 bg-[#030a1d] border-2 border-dashed border-purple-500/30 rounded-2xl overflow-hidden relative group group-hover:border-purple-400/60 transition">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      <FaUpload className="text-[#99a1af] text-3xl mb-2" />
                      <span className="text-sm text-[#99a1af]">Upload Image</span>
                    </div>
                  )}

                  {/* Hidden input for upload/edit */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  {imagePreview && (
                    <div className="absolute bottom-2 right-2 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview("");
                          setFormData((prev) => ({
                            ...prev,
                            image: "",
                            imageFile: null,
                          }));
                        }}
                        className="bg-red-500/20 hover:bg-red-500/40 text-white rounded-full p-1 flex items-center gap-1 cursor-pointer"
                      >
                        <MdDeleteForever className="text-xl" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center gap-2 text-sm text-[#99a1af]">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-400" /> Square image
                    recommended
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-400" /> Minimum 400×400
                    px
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-400" /> Max size 3MB
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div className="flex-1 min-w-[300px]">
              <label className="block text-sm text-[#99a1af] mb-2">
                Thumbnail
              </label>

              <div className="flex gap-4 flex-wrap">
                <div className="w-48 h-48 bg-[#030a1d] border-2 border-dashed border-purple-500/30 rounded-2xl overflow-hidden relative group group-hover:border-purple-400/60 transition">
                  {formData.thumbnail ? (
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      <FaUpload className="text-[#99a1af] text-3xl mb-2" />
                      <span className="text-sm text-[#99a1af]">Upload Thumbnail</span>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  {formData.thumbnail && (
                    <div className="absolute bottom-2 right-2 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setThumbnailPreview("");
                          setFormData((prev) => ({
                            ...prev,
                            thumbnail: "",
                            thumbnailFile: null,
                          }));
                        }}
                        className="bg-red-500/20 hover:bg-red-500/40 text-white rounded-full p-1 flex items-center gap-1 cursor-pointer"
                      >
                        <MdDeleteForever className="text-xl" />
                      </button>
                    </div>
                  )}
                </div>
                 <div className="flex flex-col justify-center gap-2 text-sm text-[#99a1af]">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-400" /> Optional
                  </div>
                   <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-400" /> Used for small previews
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm text-[#99a1af] mb-2">
              Team Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter team name"
              className={purpleFieldClass}
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm text-[#99a1af] mb-2">
              Genre *
            </label>
            <select
              value={formData.genre}
              onChange={(e) =>
                setFormData({ ...formData, genre: e.target.value })
              }
              className={purpleFieldClass}
            >
              <option value="">Select genre</option>
              {GENRE_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm text-[#99a1af] mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              placeholder="Team bio or description"
              className={`${purpleFieldClass} resize-none`}
            />
          </div>
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
            disabled={isLoading}
          >
            <FaSave />
            {team ? "Update Team" : "Create Team"}
          </Button>
        </div>
      </div>
    </div>
  );
}
