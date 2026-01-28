import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
} from "@mui/material";
import { MdOutlineLock } from "react-icons/md";
import { HiArrowLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useUpdatePasswordMutation } from "../Redux/api/authApi";
import { toast } from "sonner";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [resetPassword] = useUpdatePasswordMutation();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowNewPassword = () => setShowNewPassword((prev) => !prev);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const values = {
      password: form.get("password"),
      confirmPassword: form.get("confirmPassword"),
    };

    console.log("Update Password Values", values);

    try {
      const data = {
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
      };

      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      const response = await resetPassword(data).unwrap();
      if (response.success) {
        toast.success("Password updated successfully!");
        navigate("/sign-in");
      }
    } catch (error) {
      console.log("update password error", error);
      if (error.response) {
        toast.error(
          error.response.data.message ||
            "Failed to update password. Please try again.",
        );
      }
      if (
        error.data?.message ===
        "You don't have authorization to reset your password, please verify your account first."
      ) {
        toast.error("Please Verify Your Account First");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-[#0a0d27] min-h-[100vh]">
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "80vh" }}
        >
          <div className="bg-[#140f36] rounded-lg p-5 border border-[#6639a1] w-1/2">
            <div className="mb-8 text-white">
              <div className="flex items-center gap-1 mb-4">
                <Link to="/verify-otp" style={{ textDecoration: "none" }}>
                  <HiArrowLeft style={{ fontSize: "24px" }} />
                </Link>
                <Typography variant="h5" style={{ fontWeight: 500 }}>
                  Set a new password
                </Typography>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-5 w-full"
            >
              {/* New Password Field */}
              <div className="w-full">
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  sx={{
                    color: "#cfc3ff",
                    mb: 0.5,
                    "&.Mui-focused": {
                      color: "#e0d7ff",
                    },
                  }}
                >
                  New Password
                </InputLabel>

                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    height: "50px",
                    color: "#ffffff",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderRadius: "12px",

                    "& fieldset": {
                      borderColor: "#6639a1",
                    },

                    "&:hover fieldset": {
                      borderColor: "#6639a1",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#6639a1",
                      borderWidth: "1.5px",
                    },

                    "& input::placeholder": {
                      color: "rgba(255,255,255,0.6)",
                      opacity: 1,
                    },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleShowNewPassword}
                        edge="end"
                        sx={{
                          color: "#cfc3ff",
                          "&:hover": {
                            backgroundColor: "rgba(207,195,255,0.1)",
                          },
                        }}
                      >
                        {showNewPassword ? <IoIosEyeOff /> : <IoMdEye />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>

              {/* Confirm New Password Field */}
              <div className="w-full">
                <InputLabel
                  htmlFor="confirm-password"
                  sx={{
                    color: "#cfc3ff",
                    mb: 0.5,
                    "&.Mui-focused": {
                      color: "#e0d7ff",
                    },
                  }}
                >
                  Confirm New Password
                </InputLabel>

                <OutlinedInput
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    height: "50px",
                    color: "#ffffff",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderRadius: "12px",

                    "& fieldset": {
                      borderColor: "#fff",
                    },

                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                      borderWidth: "1.5px",
                    },

                    "& input::placeholder": {
                      color: "rgba(255,255,255,0.6)",
                      opacity: 1,
                    },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleShowConfirmPassword}
                        edge="end"
                        sx={{
                          color: "#cfc3ff",
                          "&:hover": {
                            backgroundColor: "rgba(207,195,255,0.1)",
                          },
                        }}
                      >
                        {showConfirmPassword ? <IoIosEyeOff /> : <IoMdEye />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>

              {/* Submit Button */}
              <div className="w-full">
                <Button
                  variant="contained"
                  fullWidth
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
                    transition: "all 0.3s",
                  }}
                  type="submit"
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default UpdatePassword;
