import { baseApi } from "../baseApi";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/orders",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["orders"],
    }),
    getSingleOrder: builder.query({
      query: (id) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/orders/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["orders"],
    }),
  }),
});

export const { useGetAllOrdersQuery, useGetSingleOrderQuery } = ordersApi;
