import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api_url = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.DEV_API_URL;
export const DemoRequestApi = createApi({
    reducerPath: "demoRequestApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
    tagTypes: ["DemoRequest"],
    endpoints: (builder) => ({
        getDemoRequests: builder.query<any, { page: number, limit: number }>({
            query: ({ page, limit }) => `/demoRequest?page=${page}&limit=${limit}`,
            providesTags: ["DemoRequest"],
        }),

    }),
})


export const { useGetDemoRequestsQuery, } = DemoRequestApi;