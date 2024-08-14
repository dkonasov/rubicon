import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { fileApi } from "../file-api";
import { EditorBuffer } from "../../types/editor-buffer";

export interface GetFileBufferThunkPayload {
  filename: string;
  buffer: string;
}

export const getFileBufferThunk = createAsyncThunk<
  EditorBuffer,
  string,
  { state: RootState }
>("editor/getFileBuffer", async (filename: string, api) => {
  const {
    workspace: { workspaceUrl },
  } = api.getState();
  const path = workspaceUrl + filename;
  const { data } = await api.dispatch(fileApi.endpoints.getFile.initiate(path));
  return data;
});
