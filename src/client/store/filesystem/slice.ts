import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInitialFolderThunk } from "./thunks";

export interface FilesystemState {
  currentPath: string;
}

const initialState: FilesystemState = {
  currentPath: "/",
};

const filesystemSlice = createSlice({
  name: "filesystem",
  initialState,
  reducers: {
    appendCurrentPath: (state, action: PayloadAction<string>) => {
      state.currentPath = `${state.currentPath}${action.payload}/`;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInitialFolderThunk.fulfilled, (state, action) => {
      state.currentPath = action.payload;
    });
  },
});

export default filesystemSlice;
