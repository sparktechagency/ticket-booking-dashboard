import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import { HiArrowLeft } from "react-icons/hi";
import { IoMailOpen } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../Redux/api/authApi";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [forgetPassword] = useForgotPasswordMutation();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onFinish = async () => {
    const data = { email };
    console.log("Success:", data);
    navigate("/verify-otp");
    try {
      const response = await forgetPassword(data).unwrap();
      console.log("response token", response);
      if (response.success === true) {
        localStorage.setItem("otpToken", response?.data?.forgetToken);
        localStorage.setItem("userEmail", email);
        toast.success("An OTP has been sent to your email!");
        navigate("/verify-otp");
      }
    } catch (error) {
      console.error("Error sending reset code:", error);
      if (error.data?.message === "User not found") {
        toast.error("Incorrect Email.");
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
          <div className="bg-[#140f36] rounded-lg p-5 border border-[#875473]">
            <div className="mb-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Link to="/sign-in" className="cursor-pointer">
                  <HiArrowLeft style={{ fontSize: "24px" }} />
                </Link>
                <p className="text-2xl  font-medium">Forget Password</p>
              </div>
              <Typography variant="body1" style={{ marginBottom: "20px" }}>
                Please enter your email address to reset your password
              </Typography>
            </div>

            <form onSubmit={onFinish}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                margin="normal"
                variant="outlined"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                InputProps={{
                  startAdornment: (
                    <IoMailOpen className="text-2xl mr-2 text-white/50" />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "50px",
                    color: "#fff",

                    "& fieldset": {
                      borderColor: "#fff",
                    },

                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                  },

                  "& .MuiInputLabel-root": {
                    color: "#fff",
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#fff",
                  },

                  "& input::placeholder": {
                    color: "#fff",
                    opacity: 0.5,
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
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
              >
                Send OTP
              </Button>
            </form>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default ForgotPassword;
