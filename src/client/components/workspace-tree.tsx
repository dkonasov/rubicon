import { useDispatch, useSelector } from "react-redux";
import { workspaceTreeSelector } from "../store/workspace";
import {
  useCallback,
  useEffect,
  useRef,
  KeyboardEvent,
  FocusEvent,
} from "react";
import { RootState } from "../store";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { getFileBufferThunk } from "../store/editor";

export const WorkspaceTree = () => {
  const workspaceTree = useSelector(workspaceTreeSelector);
  const workspaceTreeLeafElements = useRef<HTMLElement[]>([]);
  const workspaceUrl = useSelector(
    (state: RootState) => state.workspace.workspaceUrl
  );

  const thunkDispatch = useDispatch<ThunkDispatch<RootState, void, Action>>();

  useEffect(() => {
    workspaceTreeLeafElements.current = Array.from(
      document.querySelectorAll("[data-workspace-tree-leaf]")
    );
  }, [workspaceTree]);

  const onTreeFocus = useCallback((event: FocusEvent) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    workspaceTreeLeafElements.current[0]?.focus();
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => {
    event.preventDefault();
    const focusedItemIndex = workspaceTreeLeafElements.current.findIndex(
      (item) => item === document.activeElement
    );

    if (focusedItemIndex === -1) {
      return;
    }

    if (event.key === "ArrowDown") {
      const nextItem =
        workspaceTreeLeafElements.current[focusedItemIndex + 1] ??
        workspaceTreeLeafElements.current[0];
      if (nextItem) {
        nextItem.focus();
      }
    } else if (event.key === "ArrowUp") {
      const nextItem =
        workspaceTreeLeafElements.current[focusedItemIndex - 1] ??
        workspaceTreeLeafElements.current[
          workspaceTreeLeafElements.current.length - 1
        ];
      if (nextItem) {
        nextItem.focus();
      }
    } else if (event.key === "Enter") {
      thunkDispatch(getFileBufferThunk(event.currentTarget.textContent));
    }
  }, []);

  return (
    <div tabIndex={0} onFocus={onTreeFocus}>
      {workspaceTree.children.map((node) => (
        <div
          key={node.name}
          data-workspace-tree-leaf
          tabIndex={0}
          className="focus:bg-black focus:text-white"
          onKeyDown={handleKeyDown}
        >
          {node.name}
        </div>
      ))}
    </div>
  );
};
