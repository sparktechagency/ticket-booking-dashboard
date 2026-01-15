import { baseApi } from "../baseApi";

const teamsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all teams
    getAllTeams: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken });

        return {
          url: "/teams",
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["teams"],
    }),

    // Get single team by ID
    getTeamById: builder.query({
      query: (id) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken, teamId: id });

        return {
          url: `/teams/${id}`,
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["teams"],
    }),

    // Create new team
    createTeam: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken });
        console.log(data);

        return {
          url: "/teams",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["teams"],
    }),

    // Update existing team
    updateTeam: builder.mutation({
      query: ({ id, data }) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken, teamId: id, teamData: data });

        return {
          url: `/teams/${id}`,
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["teams"],
    }),

    // Delete team
    deleteTeam: builder.mutation({
      query: (id) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken, teamId: id });

        return {
          url: `/teams/${id}`,
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["teams"],
    }),
  }),
});

export const {
  useGetAllTeamsQuery,
  useGetTeamByIdQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamsApi;
