import { configureStore } from "@reduxjs/toolkit";
import { filesystemSlice } from "./filesystem";
import { folderApi } from "./folder-api";
import { workspaceSlice } from "./workspace";
import { editorSlice } from "./editor";
import { fileApi } from "./file-api";

const store = configureStore({
  reducer: {
    filesystem: filesystemSlice.reducer,
    [folderApi.reducerPath]: folderApi.reducer,
    workspace: workspaceSlice.reducer,
    editor: editorSlice.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(folderApi.middleware, fileApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
