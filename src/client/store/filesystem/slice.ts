import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export default filesystemSlice;
