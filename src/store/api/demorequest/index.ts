import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DemoRequestApi = createApi({
    reducerPath: "demoRequestApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8081/v1" }),
    tagTypes: ["DemoRequest"],
    endpoints: (builder) => ({
        getDemoRequests: builder.query<any, { page: number, limit: number }>({
            query: ({ page, limit }) => `/demoRequest?page=${page}&limit=${limit}`,
            providesTags: ["DemoRequest"],
        }),

    }),
})


export const { useGetDemoRequestsQuery, } = DemoRequestApi;