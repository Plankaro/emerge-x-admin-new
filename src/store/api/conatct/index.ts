import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ContactResponse } from "./types/contact.types";

export const ContactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://emerge-x-backend-c2kvq.ondigitalocean.app/v1/" }),
    tagTypes: ["Contact"],
    endpoints: (builder) => ({
        getContacts: builder.query<ContactResponse, { page: number, limit: number }>({
            query: ({ page, limit }) => `/contact?page=${page}&limit=${limit}`,
            providesTags: ["Contact"],
        }),

    }),
})


export const { useGetContactsQuery, } = ContactApi;