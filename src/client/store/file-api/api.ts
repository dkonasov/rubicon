import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isBinaryMimeType } from "../../utils/is-binary-mime-type";
import { EditorBuffer } from "../../types/editor-buffer";

export const fileApi = createApi({
  reducerPath: "fileApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/files" }),
  endpoints: (builder) => ({
    getFile: builder.query<EditorBuffer, string>({
      query: (path) => ({
        url: `/file?path=${path}`,
        responseHandler: (response) => response.blob(),
      }),
      transformResponse: async (data: Blob, meta) => {
        const parsedRequestUrl = new URL(meta.request.url);
        const result: EditorBuffer = {
          url: parsedRequestUrl.searchParams.get("path"),
          content: "",
          encoding: "utf-8",
        };
        if (isBinaryMimeType(data.type)) {
          result.encoding = "binary"; // TODO: Handle binary files
        } else {
          result.content = new TextDecoder().decode(await data.arrayBuffer());
        }

        return result;
      },
    }),
  }),
});

export const { useGetFileQuery } = fileApi;
