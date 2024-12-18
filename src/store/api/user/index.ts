import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    Certification,
    CreateUserDto,
    Education,
    Experience,
    Project,
    ResponseType,
    User,
} from "./types/user-types";


const api_url = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.DEV_API_URL;

export const UserApi = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        signup: builder.mutation<ResponseType, CreateUserDto>({
            query: (data) => ({
                url: `/?role=CANDIDATE`,
                method: "POST",
                body: data,
            }),
        }),
        sendOtp: builder.mutation<
            ResponseType,
            { email: string; reqired_for: string }
        >({
            query: (body) => ({
                url: `/sendotp`,
                method: "POST",
                body: { email: body.email, reqired_for: body.reqired_for },
            }),
        }),
        verifyOtp: builder.mutation<ResponseType, { email: string; otp: number }>({
            query: ({ email, otp }) => ({
                url: `/verifyotp`,
                method: "POST",
                body: { email, otp },
            }),
        }),
        getUserData: builder.query<ResponseType, User>({
            query: () => `/`,
        }),
        updateUser: builder.mutation<ResponseType, User>({
            query: (data) => ({
                url: `/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        addExerience: builder.mutation<ResponseType, Experience>({
            query: (data) => ({
                url: `/experience`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        updateExperience: builder.mutation<ResponseType, { id: string; data: Experience }>({
            query: ({ id, data }) => ({
                url: `/experience/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        deleteExperience: builder.mutation<ResponseType, string>({
            query: (id) => ({
                url: `/experience/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
        addProject: builder.mutation<ResponseType, Project>({
            query: (data) => ({
                url: `/project`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        updateProject: builder.mutation<ResponseType, { id: string; data: Project }>({
            query: ({ id, data }) => ({
                url: `/project/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        deleteProject: builder.mutation<ResponseType, string>({
            query: (id) => ({
                url: `/project/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
        addEducation: builder.mutation<ResponseType, Education>({
            query: (data) => ({
                url: `/education`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        updateEducation: builder.mutation<ResponseType, { id: string; data: Education }>({
            query: ({ id, data }) => ({
                url: `/education/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        deleteEducation: builder.mutation<ResponseType, string>({
            query: (id) => ({
                url: `/education/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
        addCertification: builder.mutation<ResponseType, Certification>({
            query: (data) => ({
                url: `/certification`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        updateCertification: builder.mutation<ResponseType, { id: string; data: Certification }>({
            query: ({ id, data }) => ({
                url: `/certification/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        deleteCertification: builder.mutation<ResponseType, string>({
            query: (id) => ({
                url: `/certification/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useSendOtpMutation,
    useVerifyOtpMutation,
    useSignupMutation,
    useGetUserDataQuery,
    useUpdateUserMutation,
    useAddExerienceMutation,
    useUpdateExperienceMutation,
    useDeleteExperienceMutation,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useAddEducationMutation,
    useUpdateEducationMutation,
    useDeleteEducationMutation,
    useAddCertificationMutation,
    useUpdateCertificationMutation,
    useDeleteCertificationMutation

} = UserApi;
export const { getUserData } = UserApi.endpoints;
