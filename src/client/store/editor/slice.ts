import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorBuffer } from "../../types/editor-buffer";
import { getFileBufferThunk } from "./thunks";

export interface EditorState {
  buffers: EditorBuffer[];
  activeBufferIndex: number;
}

const initialState: EditorState = {
  buffers: [],
  activeBufferIndex: -1,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateBuffer: (state, action: PayloadAction<string>) => {
      const buffer = state.buffers[state.activeBufferIndex];
      if (buffer) {
        buffer.content = action.payload;
        buffer.isDirty = true;
      }
    },
    // setActiveBufferIndex: (state, action) => {
    //   state.activeBufferIndex = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getFileBufferThunk.fulfilled, (state, action) => {
      if (!state.buffers.some((b) => b.url === action.payload.url)) {
        state.buffers.push(action.payload);
        state.activeBufferIndex = state.buffers.length - 1;
      }
    });
  },
});
