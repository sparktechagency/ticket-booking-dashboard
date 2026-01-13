import { baseApi } from "../baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        // console.log(accessToken);
        return {
          url: "/faqs",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["faq"],
    }),
    createFAQ: builder.mutation({
      query: (payload) => {
        const accessToken = sessionStorage.getItem("accessToken");
        // console.log(accessToken);
        // console.log("faq", payload);
        return {
          url: "/faqs",
          method: "post",
          body: payload,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["faq"],
    }),
  }),
});

export const { useGetFaqDataQuery, useCreateFAQMutation } = contentApi;
