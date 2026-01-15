import { baseApi } from "../baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken });

        return {
          url: "/users/profile",
          method: "get",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["profile"],
    }),
    editProfile: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken, data });

        return {
          url: "/users",
          method: "patch",
          body:data,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          
        };
      },
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useGetUserProfileQuery, useEditProfileMutation } = profileApi;
