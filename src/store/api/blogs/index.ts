import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BlogsFormData } from "./blogs-types";

const api_url = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.DEV_API_URL;

export const BlogApi = createApi({
    reducerPath: "blog",
    baseQuery: fetchBaseQuery({ baseUrl: `/v1` }),
    tagTypes: ["Blog"],
    endpoints: (builder) => ({
        getBlogs: builder.query<any, { page: number; limit: number }>({
            query: ({ page, limit }) => `blog?page=${page}&limit=${limit}`,
        }),
        getSingleBlog: builder.query<any, { id: string }>({
            query: ({ id }) => `blog/${id}`,
        }),
        createBlog: builder.mutation<any, BlogsFormData>({
            query: (data) => ({
                url: `/blog`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Blog"],
        }),
        updateBlog: builder.mutation<any, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `blog/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Blog"],
        }),
        deleteBlog: builder.mutation<any, string>({
            query: (id) => ({
                url: `blog/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Blog"],
        }),
    }),
});

export const {
    useGetBlogsQuery,
    useGetSingleBlogQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} = BlogApi;
export const { getBlogs } = BlogApi.endpoints;
