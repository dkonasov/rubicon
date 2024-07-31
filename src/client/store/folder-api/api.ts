import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DirectoryEntry } from "../../interfaces/directory-entry";

// Define a service using a base URL and expected endpoints
export const folderApi = createApi({
  reducerPath: "folderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/folder" }),
  endpoints: (builder) => ({
    getFolderContents: builder.query<DirectoryEntry[], string>({
      query: (path) => `/contents?path=${path}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetFolderContentsQuery } = folderApi;
