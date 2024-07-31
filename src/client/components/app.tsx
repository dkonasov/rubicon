import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useGetFolderContentsQuery } from "../store/folder-api";
import { ComboBoxElem, ComboBox } from "./combox/";
import { useCallback } from "react";
import { filesystemSlice } from "../store/filesystem";

export const App = () => {
  const dispatch = useDispatch();
  const currentPath = useSelector(
    (state: RootState) => state.filesystem.currentPath
  );

  const { data, isLoading } = useGetFolderContentsQuery(currentPath);
  const handleItemSelect = useCallback((item: string) => {
    dispatch(filesystemSlice.actions.appendCurrentPath(item));
  }, []);

  return (
    <div>
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
    </div>
  );
};
