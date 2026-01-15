import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    logIn: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["admin"],
    }),
    forgotPassword: build.mutation({
      query: (email) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["user"],
    }),
    verifyOtp: build.mutation({
      query: (otpData) => {
        console.log(otpData);
        return {
          url: "/auth/verify-email",
          method: "POST",
          body: otpData,
        };
      },
      invalidatesTags: ["user"],
    }),
    updatePassword: build.mutation({
      query: (passwordData) => {
        const resettoken = localStorage.getItem("verifiedOtpToken");
        console.log("Reset Password data:", passwordData);
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: passwordData,
          headers: {
            Authorization: resettoken,
          },
        };
      },
      invalidatesTags: ["user"],
    }), 
      // Change Password
    changePassword: build.mutation({
      query: (data) => {
        console.log(data);
        const token = sessionStorage.getItem("accessToken");
        console.log("accessToken", token);
        return {
          url: "/auth/change-password",
          method: "POST",
          body: data,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLogInMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useUpdatePasswordMutation,
  useChangePasswordMutation,
} = authApi;
