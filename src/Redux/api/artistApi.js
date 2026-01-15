import { baseApi } from "../baseApi";

const artistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllArtists: builder.query({
      query: () => {
        return {
          url: "/artists",
          method: "GET",
        };
      },
      providesTags: ["artist"],
    }),
    getArtistById: builder.query({
      query: (id) => {
        return {
          url: `/artists/${id}`,
          method: "GET",
        };
      },
      providesTags: ["artist"],
    }),
    createArtist: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/artists",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["artist"],
    }),
    updateArtist: builder.mutation({
      query: ({ id, data }) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/artists/${id}`,
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["artist"],
    }),
    deleteArtist: builder.mutation({
      query: (id) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/artists/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["artist"],
    }),
  }),
});

export const {
  useGetAllArtistsQuery,
  useGetArtistByIdQuery,
  useCreateArtistMutation,
  useUpdateArtistMutation,
  useDeleteArtistMutation,
} = artistApi;
