import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ContactResponse } from "./types/contact.types";

const api_url = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.DEV_API_URL;
export const ContactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
    tagTypes: ["Contact"],
    endpoints: (builder) => ({
        getContacts: builder.query<ContactResponse, { page: number, limit: number }>({
            query: ({ page, limit }) => `/contact?page=${page}&limit=${limit}`,
            providesTags: ["Contact"],
        }),

    }),
})


export const { useGetContactsQuery, } = ContactApi;