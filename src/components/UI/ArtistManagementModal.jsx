import { useEffect, useState } from "react";
import {
  FaTimes,
  FaSave,
  FaUpload,
  FaCheckCircle,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "sonner";

const GENRE_OPTIONS = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "R&B",
  "Electronic",
  "Jazz",
  "Classical",
  "Country",
  "Reggae",
  "Latin",
  "K-Pop",
  "Indie",
  "Alternative",
  "Metal",
  "Folk",
  "Blues",
  "Other",
];

export function ArtistManagementModal({ artist, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    bio: "",
    imageUrl: "",
    socialLinks: {
      instagram: "",
      twitter: "",
      facebook: "",
      website: "",
    },
    verified: false,
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (artist) {
      setFormData({
        name: artist.name || "",
        genre: artist.genre || "",
        bio: artist.bio || "",
        imageUrl: artist.imageUrl || "",
        socialLinks: {
          instagram: artist.socialLinks?.instagram || "",
          twitter: artist.socialLinks?.twitter || "",
          facebook: artist.socialLinks?.facebook || "",
          website: artist.socialLinks?.website || "",
        },
        verified: artist.verified || false,
      });
      setImagePreview(artist.imageUrl || "");
    } else {
      setFormData({
        name: "",
        genre: "",
        bio: "",
        imageUrl: "",
        socialLinks: {
          instagram: "",
          twitter: "",
          facebook: "",
          website: "",
        },
        verified: false,
      });
      setImagePreview("");
    }
  }, [artist, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData((prev) => ({
        ...prev,
        imageUrl: reader.result,
        imageFile: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!formData.name || !formData.genre) {
      toast.warning("Artist name and genre are required");
      return;
    }
    if (!formData.imageUrl) {
      toast.warning("Please upload an artist image");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-3xl max-h-[90vh] bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/90 border border-white/10 rounded-3xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl text-white font-display">
              {artist ? "Edit Artist" : "Add New Artist"}
            </h2>
            <p className="text-sm text-[#99a1af] mt-1">
              {artist
                ? "Update artist profile information"
                : "Create a new artist profile"}
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
          {/* Image Upload / Edit */}
          <div>
            <label className="block text-sm text-[#99a1af] mb-2">
              Artist Image *
            </label>

            <div className="flex gap-4 flex-wrap">
              <div className="w-48 h-48 bg-[#030a1d] border-2 border-dashed border-white/10 rounded-2xl overflow-hidden relative group">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <FaUpload className="text-[#99a1af] text-3xl mb-2" />
                    <span className="text-sm text-[#99a1af]">Upload Photo</span>
                  </div>
                )}

                {/* Hidden input for upload/edit */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImagePreview(reader.result);
                      setFormData((prev) => ({
                        ...prev,
                        imageUrl: reader.result,
                        imageFile: file,
                      }));
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {imagePreview && (
                  <div className="absolute bottom-2 right-2 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent opening file dialog
                        setImagePreview("");
                        setFormData((prev) => ({
                          ...prev,
                          imageUrl: "",
                          imageFile: null,
                        }));
                      }}
                      className="bg-red-500/20 hover:bg-red-500/40 text-white rounded-full p-1  flex items-center gap-1 cursor-pointer"
                    >
                      <MdDeleteForever className="text-xl" />
                    </button>
                    {/* <span className="bg-white/20 text-white rounded-full p-1 text-xs flex items-center gap-1">
                      <FaUpload /> Change
                    </span> */}
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

          {/* Name */}
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Artist name"
            className="w-full px-4 py-3 bg-[#030a1d] border border-white/10 rounded-xl text-white"
          />

          {/* Genre */}
          <select
            value={formData.genre}
            onChange={(e) =>
              setFormData({ ...formData, genre: e.target.value })
            }
            className="w-full px-4 py-3 bg-[#030a1d] border border-white/10 rounded-xl text-white"
          >
            <option value="">Select genre</option>
            {GENRE_OPTIONS.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>

          {/* Bio */}
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            placeholder="Artist bio"
            className="w-full px-4 py-3 bg-[#030a1d] border border-white/10 rounded-xl text-white resize-none"
          />

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SocialInput
              icon={<FaInstagram />}
              value={formData.socialLinks.instagram}
              placeholder="@instagram"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, instagram: v },
                })
              }
            />
            <SocialInput
              icon={<FaTwitter />}
              value={formData.socialLinks.twitter}
              placeholder="@twitter"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, twitter: v },
                })
              }
            />
            <SocialInput
              icon={<FaFacebook />}
              value={formData.socialLinks.facebook}
              placeholder="facebook.com"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, facebook: v },
                })
              }
            />
            <SocialInput
              icon={<FaGlobe />}
              value={formData.socialLinks.website}
              placeholder="website"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, website: v },
                })
              }
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-between">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-[#6d1db9] to-[#bd85f1] rounded-xl text-white flex items-center gap-2 cursor-pointer"
          >
            <FaSave />
            {artist ? "Update Artist" : "Create Artist"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SocialInput({ icon, value, placeholder, onChange }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#99a1af]">
        {icon}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-[#030a1d] border border-white/10 rounded-xl text-white"
      />
    </div>
  );
}
