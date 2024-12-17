import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewsFormData } from "./news-type";


export const NewsApi = createApi({
    reducerPath: "news",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8081/v1/" }),
    tagTypes: ["News"],
    endpoints: (builder) => ({
        getNews: builder.query<ResponseType, { page: number; limit: number }>({
            query: ({ page, limit }) => `news?page=${page}&limit=${limit}`,
        }),
        getSingleNews: builder.query<ResponseType, { id: string }>({
            query: ({ id }) => `news/${id}`,
        }),
        createNews: builder.mutation<ResponseType, NewsFormData>({
            query: (data) => ({
                url: `/news`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["News"],
        }),
        updateNews: builder.mutation<ResponseType, { id: string; data: NewsFormData }>({
            query: ({ id, data }) => ({
                url: `news/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["News"],
        }),
        deleteNews: builder.mutation<ResponseType, string>({
            query: (id) => ({
                url: `news/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["News"],
        }),
    }),
});

export const {
useGetNewsQuery,
useGetSingleNewsQuery,
useDeleteNewsMutation,
useUpdateNewsMutation,
useCreateNewsMutation
} = NewsApi;
export const { getNews } = NewsApi.endpoints;
