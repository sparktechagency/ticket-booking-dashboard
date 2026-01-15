import { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { FaUser, FaLock, FaCamera, FaSave } from "react-icons/fa";

import profileImg from "../../../../public/Images/profile.png";
import { toast } from "sonner";
import {
  useGetUserProfileQuery,
  useEditProfileMutation,
} from "../../../Redux/api/profileApi";
// import { useChangePasswordMutation } from "../../../Redux/api/authApi";

export default function Profile() {
  // Fetch profile data from API
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    isError: isProfileError,
    error: profileError,
  } = useGetUserProfileQuery();

  // Edit profile mutation
  const [editProfile, { isLoading: isUpdating }] = useEditProfileMutation();

  // Change password mutation
  // const [changePassword, { isLoading: isChangingPassword }] =
  //   useChangePasswordMutation();

  const [adminProfile, setAdminProfile] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: profileImg,
  });

  // Update local state when API data is loaded
  useEffect(() => {
    if (profileData?.data) {
      setAdminProfile({
        name: profileData.data.name || "",
        email: profileData.data.email || "",
        phone: profileData.data.phone || "",
        avatar: profileData.data.image || profileData.data.avatar || profileImg,
      });
    }
  }, [profileData]);

  // const [currentPassword, setCurrentPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  // const [showNewPassword, setShowNewPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAdminProfile((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      // Prepare data for API
      const updateData = {
        name: adminProfile.name,
        phone: adminProfile.phone,
      };

      // Include avatar if it's a base64 string (newly uploaded)
      if (adminProfile.avatar && adminProfile.avatar.startsWith("data:")) {
        updateData.image = adminProfile.avatar;
      }

      const response = await editProfile(updateData).unwrap();
      toast.success("Profile updated successfully!");
      console.log("Profile Updated:", response);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  // const handleUpdatePassword = async () => {
  //   // Validation
  //   if (!currentPassword || !newPassword || !confirmPassword) {
  //     toast.error("Please fill in all password fields");
  //     return;
  //   }

  //   if (newPassword !== confirmPassword) {
  //     toast.error("New passwords do not match!");
  //     return;
  //   }

  //   if (newPassword.length < 6) {
  //     toast.error("Password must be at least 6 characters long");
  //     return;
  //   }

  //   try {
  //     const passwordData = {
  //       currentPassword: currentPassword,
  //       newPassword: newPassword,
  //       confirmPassword: confirmPassword,
  //     };

  //     const response = await changePassword(passwordData).unwrap();
  //     toast.success("Password updated successfully!");
  //     console.log("Password Updated:", response);

  //     // Clear password fields on success
  //     setCurrentPassword("");
  //     setNewPassword("");
  //     setConfirmPassword("");
  //   } catch (error) {
  //     console.error("Failed to update password:", error);
  //     toast.error(error?.data?.message || "Failed to update password");
  //   }
  // };

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#030a1d",
      borderRadius: "12px",
      color: "white",
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.1)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(189,133,241,0.5)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#bd85f1",
      },
      "&.Mui-disabled": {
        "& fieldset": {
          borderColor: "rgba(255,255,255,0.1)",
        },
      },
    },
    "& .MuiInputLabel-root": {
      color: "#99a1af",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#bd85f1",
    },
    "& .MuiInputLabel-root.Mui-disabled": {
      color: "#99a1af",
    },
    "& .MuiOutlinedInput-input.Mui-disabled": {
      WebkitTextFillColor: "#99a1af",
    },
  };

  return (
    <div className="space-y-4 h-screen bg-[#0a0d27] p-6 overflow-y-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-white font-display font-krona">
          Admin Settings
        </h2>
        <p className="text-[#99a1af] font-sans">
          Manage your admin profile and security settings
        </p>
      </div>

      {/* Loading State */}
      {isLoadingProfile && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <CircularProgress
              sx={{
                color: "#bd85f1",
                marginBottom: 2,
              }}
            />
            <p className="text-[#99a1af] font-sans">Loading profile...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {isProfileError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-6">
          <p className="text-red-400 font-sans">
            Failed to load profile data. Please try again later.
          </p>
          {profileError?.data?.message && (
            <p className="text-red-300 text-sm mt-2">
              {profileError.data.message}
            </p>
          )}
        </div>
      )}

      {/* Profile Content - Only show when data is loaded */}
      {!isLoadingProfile && !isProfileError && (
        <>
          {/* Profile Information */}
          <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 border border-white/10 rounded-3xl p-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#bd85f1]/20 rounded-xl flex items-center justify-center">
                <FaUser className="text-[#bd85f1]" />
              </div>
              <h3 className="text-xl text-white font-krona">
                Profile Information
              </h3>
            </div>
            {/* Avatar */}
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <Avatar
                  src={adminProfile.avatar}
                  alt="Avatar"
                  sx={{
                    width: 80,
                    height: 80,
                    border: "4px solid rgba(189, 133, 241, 0.2)",
                  }}
                />
                <label className="absolute bottom-0 right-0 w-8 h-8 cursor-pointer bg-gradient-to-br from-[#6d1db9] to-[#bd85f1] rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <FaCamera className="text-white text-sm" />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <div>
                <p className="text-white font-display mb-1">Profile Picture</p>
                <p className="text-sm text-[#99a1af] font-sans">
                  Upload a new avatar for your admin account
                </p>
              </div>
            </div>
            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                fullWidth
                label="Full Name"
                value={adminProfile.name}
                onChange={(e) =>
                  setAdminProfile({
                    ...adminProfile,
                    name: e.target.value,
                  })
                }
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                label="Email Address"
                value={adminProfile.email}
                disabled
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                label="Phone Number"
                value={adminProfile.phone}
                onChange={(e) =>
                  setAdminProfile({
                    ...adminProfile,
                    phone: e.target.value,
                  })
                }
                sx={textFieldStyles}
              />
            </div>{" "}
            {/* Save */}
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                variant="contained"
                startIcon={
                  isUpdating ? <CircularProgress size={16} /> : <FaSave />
                }
                disabled={isUpdating}
                sx={{
                  px: 3,
                  py: 1,
                  background: "linear-gradient(to right, #6d1db9, #bd85f1)",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: "14px",
                  boxShadow: "0 10px 40px rgba(109, 29, 185, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(to right, #5b189b, #a66fd9)",
                    transform: "scale(1.05)",
                  },
                  "&:disabled": {
                    background: "rgba(109, 29, 185, 0.5)",
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                  transition: "all 0.3s",
                }}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          {/* Security Settings */}
          {/* <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 border border-white/10 rounded-3xl p-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#bd85f1]/20 rounded-xl flex items-center justify-center">
            <FaLock className="text-[#bd85f1]" />
          </div>
          <h3 className="text-xl text-white font-krona">Security Settings</h3>
        </div>

        <div className="flex flex-col gap-2">
          <TextField
            fullWidth
            type={showCurrentPassword ? "text" : "password"}
            label="Current Password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowCurrentPassword((p) => !p)}
                    edge="end"
                    sx={{ color: "white" }}
                  >
                    {showCurrentPassword ? (
                      <IoIosEyeOff className="text-white" />
                    ) : (
                      <IoMdEye className="text-white" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />

          <TextField
            fullWidth
            type={showNewPassword ? "text" : "password"}
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword((p) => !p)}
                    edge="end"
                    sx={{ color: "white" }}
                  >
                    {showNewPassword ? (
                      <IoIosEyeOff className="text-white" />
                    ) : (
                      <IoMdEye className="text-white" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />

          <TextField
            fullWidth
            type={showConfirmPassword ? "text" : "password"}
            label="Confirm New Password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword((p) => !p)}
                    edge="end"
                    sx={{ color: "white" }}
                  >
                    {showConfirmPassword ? (
                      <IoIosEyeOff className="text-white" />
                    ) : (
                      <IoMdEye className="text-white" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />

          <Button
            onClick={handleUpdatePassword}
            variant="outlined"
            disabled={isChangingPassword}
            startIcon={
              isChangingPassword ? <CircularProgress size={16} /> : null
            }
            sx={{
              px: 3,
              py: 1.5,
              backgroundColor: "rgba(255,255,255,0.05)",
              borderColor: "rgba(255,255,255,0.1)",
              color: "white",
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.1)",
              },
              "&:disabled": {
                backgroundColor: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.3)",
              },
            }}
          >
            {isChangingPassword ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </div> */}
        </>
      )}
    </div>
  );
}
