import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  Grid,
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdOutlineLock } from "react-icons/md";
// import { useSignInMutation } from "../../Redux/api/authApi";
// import { toast } from "sonner";

const SignIn = () => {
  const navigate = useNavigate();
  // const [login] = useSignInMutation();

  const onFinish = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const values = {
      email: form.get("email"),
      password: form.get("password"),
    };

    console.log("signIn Data", values);
    navigate("/", { replace: true });
    // try {
    //   const res = await login(data).unwrap();
    //   localStorage.setItem("accessToken", res?.data?.accessToken);
    //   localStorage.setItem("refreshToken", res?.data?.refreshToken);

    //   if (res.success) {
    //     toast.success("Login Successfully!");
    //     navigate("/");
    //   } else {
    //     toast.error("Login Error.");
    //   }
    // } catch (error) {
    //   console.error("Error user login:", error);
    //   if (error.data) {
    //     toast.error("Something went wrong while logging in.");
    //   }
    // }
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
                      <HiOutlineMailOpen size={20} color="#875473" />
                    </InputAdornment>
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
                      borderColor: "#a06a8d",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#875473",
                    },
                  },

                  "& .MuiInputLabel-root": {
                    color: "#875473",
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#875473",
                  },

                  "& input::placeholder": {
                    color: "#fff",
                    opacity: 0.5,
                  },
                }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                required
                margin="normal"
                variant="outlined"
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: (
                    <MdOutlineLock className="text-[#875473] text-xl mr-2" />
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
                      borderColor: "#a06a8d",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#875473",
                    },
                  },

                  "& .MuiInputLabel-root": {
                    color: "#875473",
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#875473",
                  },

                  "& input::placeholder": {
                    color: "#fff",
                    opacity: 0.5,
                  },
                }}
              />
              <div className="flex items-center justify-between mt-2">
                <div className="text-[#875473] font-semibold">
                  <FormControlLabel
                    control={<Checkbox name="rememberMe" color="primary" />}
                    label="Remember Me"
                  />
                </div>
                <div>
                  <Link
                    to="/forgot-password"
                    style={{
                      fontWeight: "bold",
                      textDecoration: "underline",
                      color: "#875473",
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
