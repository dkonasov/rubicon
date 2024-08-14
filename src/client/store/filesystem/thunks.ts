import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";

export const getInitialFolderThunk = createAsyncThunk<
  string,
  void,
  { state: RootState }
>("filesystem/getInitialFolder", async () => {
  const response = await fetch("/api/initial-dir");
  return await response.text();
});
