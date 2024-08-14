import { createSelector } from "@reduxjs/toolkit";
import { selectRoot } from "../selectors";

export const buffersSelector = createSelector(
  selectRoot,
  (root) => root.editor.buffers
);

export const activeBufferSelector = createSelector(
  selectRoot,
  (root) => root.editor.buffers[root.editor.activeBufferIndex]
);
