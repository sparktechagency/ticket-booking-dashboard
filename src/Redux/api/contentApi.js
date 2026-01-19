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
    getPrivacyPolicy: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log(accessToken);
        return {
          url: "/privacy",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["privacy"],
    }),
    addPrivacyPolicy: builder.mutation({
      query: (payload) => {
        const accessToken = sessionStorage.getItem("accessToken");
        // console.log(accessToken);
        // console.log("PrivacyPolicy", payload);
        return {
          url: "/privacy",
          method: "patch",
          body: payload,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["privacy"],
    }),
    getTermsAndConditions: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log(accessToken);
        return {
          url: "/terms",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["terms"],
    }),
    addTermsAndConditions: builder.mutation({
      query: (payload) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log(accessToken);
        console.log("TermsAndConditions", payload);
        return {
          url: "/terms",
          method: "patch",
          body: payload,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["terms"],
    }),
    getRefundPolicy: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log(accessToken);
        return {
          url: "/refund-policies",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["terms"],
    }),
    addRefundPolicy: builder.mutation({
      query: (payload) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log(accessToken);
        console.log("TermsAndConditions", payload);
        return {
          url: "/refund-policies",
          method: "patch",
          body: payload,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["terms"],
    }),
  }),
});

export const {
  useGetFaqDataQuery,
  useCreateFAQMutation,
  useGetPrivacyPolicyQuery,
  useAddPrivacyPolicyMutation,
  useGetTermsAndConditionsQuery,
  useAddTermsAndConditionsMutation,
  useGetRefundPolicyQuery,
  useAddRefundPolicyMutation,
} = contentApi;
