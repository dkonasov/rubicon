import { useDispatch, useSelector } from "react-redux";
import {
  activeBufferSelector,
  buffersSelector,
  editorSlice,
} from "../store/editor";
import { EditorTabs } from "./editor-tabs";
import { TextEditor } from "./combox/text-editor";
import { getExtFromPath } from "../utils/get-ext-from-path";
import { useCallback, useMemo } from "react";

export const Editor = () => {
  const buffers = useSelector(buffersSelector);
  const activeBuffer = useSelector(activeBufferSelector);
  const ext = useMemo(
    () => (activeBuffer ? getExtFromPath(activeBuffer.url) : ""),
    [activeBuffer]
  );
  const dispatch = useDispatch();

  const handleEditorChange = useCallback((value: string) => {
    dispatch(editorSlice.actions.updateBuffer(value));
  }, []);

  return (
    <div className="pl-8">
      {buffers.length === 0 && (
        <div className="text-center">
          To start coding open or create some file
        </div>
      )}
      {buffers.length > 0 && (
        <div>
          <EditorTabs />
          {/* TODO: add binary editor */}
          {activeBuffer.encoding === "utf-8" && (
            <TextEditor
              value={activeBuffer?.content || ""}
              onChange={handleEditorChange}
              ext={ext}
            />
          )}
        </div>
      )}
    </div>
  );
};
