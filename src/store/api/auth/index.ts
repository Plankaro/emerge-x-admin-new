import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SessionType, SignInAPI } from "./types/auth-types";

export const AuthApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8081/v1" }),
  tagTypes: ["Session"],
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInAPI, { email: string; password: string }>({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),
    SignInWithOtp: builder.mutation<SignInAPI, { email: string; otp: number }>({
      query: (data) => ({
        url: "/sign-in-otp?role=CANDIDATE",
        method: "POST",
        body: { ...data },
      }),
    }),
    getSession: builder.query<SessionType, void>({
      query: () => "session?role=CANDIDATE",
      providesTags: ["Session"],
    }),
    signOut: builder.mutation<SessionType, void>({
      query: () => ({ url: "/sign-out", method: "POST" }),
      invalidatesTags: ["Session"],
    }),
  }),
});

export const {
  useSignInMutation,
  useGetSessionQuery,
  useSignInWithOtpMutation,
  useSignOutMutation,
} = AuthApi;
export const { getSession } = AuthApi.endpoints;
