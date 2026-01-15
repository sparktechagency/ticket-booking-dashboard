import { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { HiOutlineMailOpen } from "react-icons/hi";
import { MdOutlineLock } from "react-icons/md";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

import { useLogInMutation } from "../Redux/api/authApi";
import { toast } from "sonner";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLogInMutation();

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const onFinish = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const data = {
      email: form.get("email"),
      password: form.get("password"),
    };

    console.log("signIn Data", data);
    // navigate("/", { replace: true });
    try {
      const res = await login(data).unwrap();
      console.log(res);
      sessionStorage.setItem("accessToken", res?.data?.token);
      // sessionStorage.setItem("refreshToken", res?.data?.refreshToken);

      if (res.success) {
        toast.success("Login Successfully!");
        navigate("/");
      } else {
        toast.error("Login Error.");
      }
    } catch (error) {
      console.error("Error user login:", error);
      if (error.data.message === "User doesn't exist!") {
        toast.error("User doesn't exist!");
      }
      if (error.data.message === "Password is incorrect!") {
        toast.error("Password is incorrect!");
      } else {
        toast.error("Something went wrong. Please reload the page & try again");
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
            <p className="text-3xl text-center font-semibold mb-7 text-white">
              Sign in to continue!
            </p>

            <form onSubmit={onFinish}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                margin="normal"
                variant="outlined"
                placeholder="Enter your email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HiOutlineMailOpen size={20} color="#ddaef8" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "50px",
                    color: "#fff",

                    "& fieldset": {
                      borderColor: "#cc9fe6",
                    },

                    "&:hover fieldset": {
                      borderColor: "#cc9fe6",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#cc9fe6",
                    },
                  },

                  "& .MuiInputLabel-root": {
                    color: "#cc9fe6",
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#cc9fe6",
                  },

                  "& input::placeholder": {
                    color: "#cc9fe6",
                    opacity: 0.99,
                  },
                }}
              />
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: (
                    <MdOutlineLock className="text-[#ddaef8] text-xl mr-2" />
                  ),
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={handleShowPassword}
                          edge="end"
                          sx={{
                            color: "#c4b5fd",
                            "&:hover": {
                              color: "#a78bfa",
                              backgroundColor: "rgba(168, 85, 247, 0.1)",
                            },
                          }}
                        >
                          {showPassword ? <IoIosEyeOff /> : <IoMdEye />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "50px",
                    color: "#fff",

                    "& fieldset": {
                      borderColor: "#cc9fe6",
                    },

                    "&:hover fieldset": {
                      borderColor: "#cc9fe6",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#cc9fe6",
                    },
                  },

                  "& .MuiInputLabel-root": {
                    color: "#cc9fe6",
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#cc9fe6",
                  },

                  "& input::placeholder": {
                    color: "#cc9fe6",
                    opacity: 0.99,
                  },
                }}
              />
              <div className="flex items-center justify-between mt-2">
                <div className="text-[#cc9fe6] font-semibold">
                  <FormControlLabel
                    control={<Checkbox name="rememberMe" color="primary" />}
                    label="Remember Me"
                  />
                </div>
                <div>
                  <Link
                    to="/forgot-password"
                    style={{
                      fontWeight: "600",
                      textDecoration: "underline",
                      color: "#cc9fe6",
                    }}
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
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
                Sign In
              </Button>
            </form>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default SignIn;
