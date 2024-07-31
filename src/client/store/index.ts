import { configureStore } from "@reduxjs/toolkit";
import { filesystemSlice } from "./filesystem";
import { folderApi } from "./folder-api";

const store = configureStore({
  reducer: {
    filesystem: filesystemSlice.reducer,
    [folderApi.reducerPath]: folderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(folderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
