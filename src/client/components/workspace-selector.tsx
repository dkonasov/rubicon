import { FormEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filesystemSlice } from "../store/filesystem";
import { useGetFolderContentsQuery } from "../store/folder-api";
import { RootState } from "../store";
import { Button } from "./button";
import { ComboBox } from "./combox/combo-box";
import { ComboBoxElem } from "./combox/combo-box-elem";
import { workspaceSlice } from "../store/workspace";
import { useInitialFolder } from "../hooks/use-initial-folder";

export const WorkspaceSelector = () => {
  const dispatch = useDispatch();
  useInitialFolder();
  const currentPath = useSelector(
    (state: RootState) => state.filesystem.currentPath
  );

  const { data, isLoading } = useGetFolderContentsQuery(currentPath);
  const onWorkspaceSelect = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      dispatch(workspaceSlice.actions.setWorkspaceUrl(currentPath));
      dispatch(
        workspaceSlice.actions.updateWorkspaceTreeNode({
          path: "/",
          children: data.map((item) => ({
            name: item.name,
            children: item.isDirectory ? [] : undefined,
          })),
        })
      );
    },
    [currentPath, data]
  );

  const handleItemSelect = useCallback((item: string) => {
    dispatch(filesystemSlice.actions.appendCurrentPath(item));
  }, []);

  return (
    <form onSubmit={onWorkspaceSelect}>
      <ComboBox
        value={currentPath}
        isLoading={isLoading}
        onItemSelect={handleItemSelect}
      >
        {data
          ?.filter((item) => item.isDirectory)
          .map((item) => (
            <ComboBoxElem key={item.name}>{item.name}</ComboBoxElem>
          ))}
      </ComboBox>
      <Button type="submit">Open</Button>
    </form>
  );
};
