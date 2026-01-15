import { baseApi } from "../baseApi";

const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all events
    getAllEvents: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken });

        return {
          url: "/events",
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["events"],
    }),

    // Get single event by ID
    getEventById: builder.query({
      query: (id) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken, eventId: id });

        return {
          url: `/events/${id}`,
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["events"],
    }),

    // Create new event
    createEvent: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken });
        console.log("data", data);

        return {
          url: "/events",
          method: "POST",
          body: data,
          headers: {
            // "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["events"],
    }),

    // Update existing event
    updateEvent: builder.mutation({
      query: ({ id, data }) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken });
        console.log("data", data);

        return {
          url: `/events/${id}`,
          method: "PATCH",
          body: data,
          headers: {
            // "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["events"],
    }),

    // Delete event
    deleteEvent: builder.mutation({
      query: (id) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken, eventId: id });

        return {
          url: `/events/${id}`,
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["events"],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
