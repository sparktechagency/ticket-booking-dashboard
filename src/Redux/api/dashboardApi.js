import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("events at", accessToken);
        return {
          url: "/dashboard/overview",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["events"],
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
