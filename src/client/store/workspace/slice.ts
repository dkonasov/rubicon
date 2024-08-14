import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkspaceDirectory, WorkspaceEntry } from "../../types/workspace";

export interface WorkspaceState {
  workspaceUrl: string | null;
  workspaceTree: WorkspaceDirectory;
}

export interface UpdateWorkspaceTreeNodePayload {
  path: string;
  children: WorkspaceEntry[];
}

const initialState: WorkspaceState = {
  workspaceUrl: null,
  workspaceTree: {
    name: "/",
    children: [],
  },
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaceUrl: (state, action: PayloadAction<string>) => {
      state.workspaceUrl = action.payload;
    },
    updateWorkspaceTreeNode: (
      state,
      action: PayloadAction<UpdateWorkspaceTreeNodePayload>
    ) => {
      const { path, children } = action.payload;

      if (path === "/") {
        state.workspaceTree.children = children;
        return;
      }
    },
  },
});
