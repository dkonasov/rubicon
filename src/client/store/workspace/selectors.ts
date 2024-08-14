import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

const selectWorkspaceTree = (state: RootState) => state.workspace.workspaceTree;

export const workspaceTreeSelector = createSelector(
  selectWorkspaceTree,
  (tree) => tree
);
